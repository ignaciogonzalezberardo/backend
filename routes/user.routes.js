const express =require('express')
const router=express.Router()
const validation =require('../middlewares/auth')
const isAdmin=require("../middlewares/isAdmin")
const upload = require('../middlewares/uploadFileUser');
const userControllers=require ('../controllers/user.controllers')
router.get("/users",userControllers.getUsers)

router.post("/users", [upload] ,userControllers.createUser)

router.get("/users/:id",userControllers.getUsersById)

router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser);


router.put("/users/:id",validation,userControllers.updateUser)

router.post("/login", userControllers.login)
module.exports=router