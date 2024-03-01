const db=require('../db/dbconfig')
const bcrypt=require('bcrypt')
const{StatusCode}=require('http-status-codes')
const jwt=require('jsonwebtoken')
async function register(req,res) {
const {username,firstname,lastname,email,password}=req.body
    if(!username||!firstname||!lastname||!email||!password){
      return res.status(400).json({msg:"please provide all the information fill"})
    }
    try {
      const [user]= await db.query("select username,userid from users where username=?or email=?",[username,email])
      // return res.json({user:user})
      if(user.length>0){
       return res.status(400).json({msg:"already registerd"})
      }
      if(password.length<=8){
        return res.status(400).json({msg:"password must be more than 8 string"})
       }
       const salt =await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password,salt)
      await db.query("INSERT INTO users (username,firstname,lastname,email,password)VALUES(?,?,?,?,?)",[username,firstname,lastname,email,hashedpassword])
    return res.status(201).json({msg:"user created"})
    } catch (error) {
      console.log(error.message)
      return res.status(500).json("please you miss the innformation")
    }
}
async function login(req,res) {
  const {email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({msg:"please provide all the information"})
  }
  try {
    const [user]= await db.query("select username,userid,password from users where email=?",[email])
    // return res.status(400).json({user:user})
    if(user.length==0){
     return res.status(400).json({msg:"invalid email"})
    }
    //  compare password
  const isMatch= await bcrypt.compare(password,user[0].password)
  if(!isMatch){
    return res.status(400).json({msg:"invalid password"})
  }
  const username=user[0].username
  const userid=user[0].userid
  const token= jwt.sign({username,userid},process.env.jwt_key, {expiresIn:"1d"})
  return res.json({msg:"user login successfully",token,username})
  
  
  return res.json({user})
    // if(password.length<=8){
    //   return res.status(400).json({msg:"password must be more than 8 string"})
    //  }
  } catch (error) {
    console.log(error.message)
      return res.status(500).json("please you miss the innformation") 
  }   
 }
 async function check(req,res) {
  const username=req.user.username  
  const userid=req.user.userid
  res.send({msg:'users checked',username,userid})
     
 }
 module.exports={register,login,check};