const express = require('express');
const app = express();
const port = 5000;
// db connection
const db=require('./db/dbconfig')
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
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
    console.log(result)
    app.listen(port)
    console.log(`Server is running on port ${port}`);  } 
     catch (error) {
        console.log(error.message)  
    }
 }
 
 start();



