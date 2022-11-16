

module.exports =(app)=>{
    
    const people = require("../controllers/people.controller");

    var router = require("express").Router();

    router.post('/newPeople',people.uploadimage,people.createPeople)
    router.get('/allPeople',people.getAllUser)
    router.put('/updatePeople/:id',people.uploadimage,people.updateUser)
    router.put('/updateUseUser',people.updateUseUser)
    router.post('/onePeople',people.getOneUser)
    router.get('/oneUserdata/:id',people.getOneUserAfter)
    router.delete('/deletePeople/:id',people.deleteUser)

    router.post('/deleteimageprofile',people.deleteImageProfile)
    router.post('/deleteimagefront',people.deleteImageFront)
    router.post('/deleteimageback',people.deleteImageBack)


    
    app.use("/api/people",router);
}