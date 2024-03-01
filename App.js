const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
// db connection
const db=require('./db/dbconfig')

const questionsRoutes=require('./Routes/questionRoutes')
// base url
const usersRoutes=require("./Routes/userRoutes")
// json middle ware
app.use(express.json())
app.use("/api/users",usersRoutes)
app.use("/api/questions",questionsRoutes)
 async function start(){
    try {
    const result= await db.execute("select'test'")

    app.listen(port)
    console.log(`Server is running on port ${port}`);  } 
     catch (error) {
        console.log(error.message)  
    }
 }
 
 start();



