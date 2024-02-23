const mysql2 = require('mysql2');
require('dotenv').config()
// MySQL Database Connection Configuration
const db = mysql2.createPool({
    host: 'localhost',
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit:10
}); 
console.log(process.env.PASSWORD)
// Connect to MySQL
// db.execute("select 'test'",(err,result) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(result);
//     }
// });
module.exports=db.promise();