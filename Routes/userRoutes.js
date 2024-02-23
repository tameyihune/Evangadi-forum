const express=require('express');
const router=express.Router()
const Authmiddleware=require('../MiddleWare/Authmiddleware')
// user contrroler
const {register,login,check}=require('../controller/userController')
// register route
router.post('/register',register)
router.post('/login',login)
// check user
router.get('/check',Authmiddleware, check);
module.exports=router;