module.exports = (sequelize, Sequelize) => {
  const People = sequelize.define("peoples", {
    firstname: {
      type: Sequelize.STRING,
      defaultValue: "-",
    },
    lastname: {
      type: Sequelize.STRING,
      defaultValue: "-",
    },
    password: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.FLOAT(11, 2),
      defaultValue: 0.0,
    },
    
    phone: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    zipcode: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    useaddress: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    use: {
      type: Sequelize.TINYINT,
      defaultValue: 1,
    },

    imageprofile: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    imagefront: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    imageback: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  });
  return People;
};
