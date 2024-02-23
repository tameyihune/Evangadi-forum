const express=require('express');
const router=express.Router()
const Authmiddleware=require('../MiddleWare/Authmiddleware')
router.get("/all-questions",Authmiddleware,(req,res)=>{
    res.send("all questions")
})
module.exports=router;