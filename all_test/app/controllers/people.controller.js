const db = require("../models");
const people = db.people;
const setstatus = db.setstatus;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { bank } = require("../models");
const bankuser = db.bankuser;
const loanstate = db.loanstate;
const loan = db.loan;

// import multer from 'multer'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // setting destination of uploading files
    if (file.fieldname === "imageprofile") {
      // if uploading resume
      cb(null, "./app/images/profile");
    } else if (file.fieldname === "imagefront") {
      // else uploading image
      cb(null, "./app/images/idcardfront");
    } else {
      cb(null, "./app/images/idcardback");
    }
  },
  filename: (req, file, cb) => {
    // naming file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "imageprofile") {
    // if uploading resume
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "imagefront") {
    // else uploading image
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

var upload_test = multer({
  storage: fileStorage,
  limits: {
    fileSize: "1048576",
  },
  fileFilter: fileFilter,
}).fields([
  {
    name: "imageprofile",
    maxCount: 1,
  },
  {
    name: "imagefront",
    maxCount: 1,
  },
  {
    name: "imageback",
    maxCount: 1,
  },
]);

exports.deleteImageProfile = async (req, res) => {
  const filePath = req.body.imageprofileBackup;

  const id = req.body.id;

  fs.unlink(filePath, async (err) => {
    if (err) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    await people
      .update(
        { imageprofile: null },
        {
          where: { id: id },
        }
      )
      .then((num) => {
        return res.send({
          message: "User was updated successfully.",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error updating User ",
        });
      });
  });

  return;
};

exports.deleteImageFront = async (req, res) => {
  const filePath = req.body.imagefrontBackup;

  const id = req.body.id;

  fs.unlink(filePath, async (err) => {
    if (err) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    await people
      .update(
        { imagefront: null },
        {
          where: { id: id },
        }
      )
      .then((num) => {
        return res.send({
          message: "User was updated successfully.",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error updating User ",
        });
      });
  });

  return;
};

exports.deleteImageBack = async (req, res) => {
  const filePath = req.body.imagebackBackup;

  const id = req.body.id;

  fs.unlink(filePath, async (err) => {
    if (err) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    await people
      .update(
        { imageback: null },
        {
          where: { id: id },
        }
      )
      .then((num) => {
        return res.send({
          message: "User was updated successfully.",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error updating User ",
        });
      });
  });

  return;
};

exports.uploadimage = upload_test;

exports.createPeople = async (req, res) => {
  if (req.body.phone == null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (req.body == null) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  people.findOne({ where: { phone: req.body.phone } }).then(async (user) => {
    if (user) {
      res.status(400).send({
        status: 400,
        message: "Failed! PhoneNumber is already in use!",
      });
      return;
    }
    var data_people = {};

    try {
      await sharp(req.files.imageprofile[0].path)
        .resize(400, 400)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imageprofile[0].destination,
            "resized",
            req.files.imageprofile[0].filename
          )
        );
      fs.unlinkSync(req.files.imageprofile[0].path);
    } catch (err) {}
    //************************************************************ */
    try {
      await sharp(req.files.imagefront[0].path)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imagefront[0].destination,
            "resized",
            req.files.imagefront[0].filename
          )
        );
      fs.unlinkSync(req.files.imagefront[0].path);
    } catch (err) {}
    //************************************************************ */
    try {
      await sharp(req.files.imageback[0].path)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imageback[0].destination,
            "resized",
            req.files.imageback[0].filename
          )
        );
      fs.unlinkSync(req.files.imageback[0].path);
    } catch (err) {}
    var imageprofiletxt = null;
    var imagefronttxt = null;
    var imagebacktxt = null;
    try {
      imageprofiletxt =
        "app\\images\\profile\\resized\\" + req.files.imageprofile[0].filename;
    } catch (err) {
      imageprofiletxt = null;
    }
    try {
      imagefronttxt =
        "app\\images\\idcardfront\\resized\\" +
        req.files.imagefront[0].filename;
    } catch (err) {
      imagefronttxt = null;
    }
    try {
      imagebacktxt =
        "app\\images\\idcardback\\resized\\" + req.files.imageback[0].filename;
    } catch (err) {
      imagebacktxt = null;
    }

    try {
      data_people = {
        imageprofile: imageprofiletxt,
        imagefront: imagefronttxt,
        imageback: imagebacktxt,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        city: req.body.city,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        useaddress: req.body.useaddress,
        use: req.body.use,
      };
    } catch (err) {}

    return await people
      .create(data_people)
      .then((data) => {
        console.log(data.id);
        res.status(200).send({ status: true, id: data.id });
      })
      .catch((err) => {
        res.status(500).send({
          status: 500,
          message:
            err.message || "Some error occurred while creating the People.",
        });
      });
  });
};

exports.getAllUser = async (req, res) => {
  people
    .findAll({
      include: [
        {
          model: bankuser,
          as: "bankusers",
          include: { model: bank, as: "banks" },
        },
        {
          model: loanstate,
          as: "loanstates",
          include: {
            model: loan,
            as: "loans",
          },
        },
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

exports.getOneUser = (req, res) => {
  people
    .findOne({
      include: [
        {
          model: bankuser,
          as: "bankusers",
          include: { model: bank, as: "banks" },
        },
        {
          model: loan,
          as: "loans",
        },
      ],
      where: { phone: req.body.phone },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (user.use === 0) {
        return res.status(402).send({
          message: "user disable!",
        });
      }

      if (req.body.password != user.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

exports.getOneUserAfter = (req, res) => {
  const id = req.params.id;
  people
    .findOne({
      include: [
        {
          model: bankuser,
          as: "bankusers",
          include: { model: bank, as: "banks" },
        },

        {
          model: loanstate,
          as: "loanstates",
          include: { model: loan, as: "loans" },
        },
      ],
      where: { id: id },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

exports.updateUser = async (req, res) => {
  people.findAll({ where: { phone: req.body.phone } }).then(async (user) => {
    if (user.length > 1) {
      res.status(400).send({
        status: 400,
        message: "Failed! phoneNumber is already in use!",
      });
      return;
    }

    var data_people = {};

    try {
      await sharp(req.files.imageprofile[0].path)
        .resize(400, 400)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imageprofile[0].destination,
            "resized",
            req.files.imageprofile[0].filename
          )
        );
      fs.unlinkSync(req.files.imageprofile[0].path);
    } catch (err) {}
    //************************************************************ */
    try {
      await sharp(req.files.imagefront[0].path)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imagefront[0].destination,
            "resized",
            req.files.imagefront[0].filename
          )
        );
      fs.unlinkSync(req.files.imagefront[0].path);
    } catch (err) {}
    //************************************************************ */
    try {
      await sharp(req.files.imageback[0].path)
        .jpeg({ quality: 50 })
        .toFile(
          path.resolve(
            req.files.imageback[0].destination,
            "resized",
            req.files.imageback[0].filename
          )
        );
      fs.unlinkSync(req.files.imageback[0].path);
    } catch (err) {}
    var imageprofiletxt = null;
    var imagefronttxt = null;
    var imagebacktxt = null;
    try {
      imageprofiletxt =
        "app\\images\\profile\\resized\\" + req.files.imageprofile[0].filename;
    } catch (err) {
      imageprofiletxt = null;
    }
    try {
      imagefronttxt =
        "app\\images\\idcardfront\\resized\\" +
        req.files.imagefront[0].filename;
    } catch (err) {
      imagefronttxt = null;
    }
    try {
      imagebacktxt =
        "app\\images\\idcardback\\resized\\" + req.files.imageback[0].filename;
    } catch (err) {
      imagebacktxt = null;
    }

    try {
      data_people = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,

        password: req.body.password,
        city: req.body.city,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        useaddress: req.body.useaddress,
        use: req.body.use,
      };
    } catch (err) {}
    if (imageprofiletxt !== null) {
      data_people.imageprofile = imageprofiletxt;
    }
    if (imagefronttxt !== null) {
      data_people.imagefront = imagefronttxt;
    }
    if (imagebacktxt !== null) {
      data_people.imageback = imagebacktxt;
    }

    const id = req.params.id;
    people
      .update(data_people, {
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe Question was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  });
};

exports.updateUseUser = async (req, res) => {
  people
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Question was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  people
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: "User was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
