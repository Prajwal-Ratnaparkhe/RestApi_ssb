const express = require("express");
const app = express();
const mongoose = require('mongoose'); // import mongoose file
const bodyParser = require('body-parser'); // import body parser


// Router Page 

const studentRoute = require('./api/routes/student');  // import the student route page
const facultyRoute=require('./api/routes/faculty'); // import the faculty route page
const userRoute=require('./api/routes/user'); // Import the User route page




// MongoDb connection establish from mongodb atlas


mongoose.connect('mongodb+srv://admin:admin@restapi.jrzcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');   // connection with mongodb


// to check connection is not establish and error

mongoose.connection.on('error',error=>{
  console.log('connection error');
});

// to check connection is establish or not 

mongoose.connection.on('connected',connected=>{
  console.log("Connect with mongodb database");
});




app.use(bodyParser.urlencoded({extended:false}));     // send data by using url  ** write this code before  route
app.use(bodyParser.json());



// Use of Student Router page  *imp: Add this code before main app.use middelware code 
app.use('/student',studentRoute);
app.use('/faculty',facultyRoute); // Use of faculty Router page
app.use('/user',userRoute);




//  MiddelWare
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "app is running successful",
//     owner: "prajwal ratnaparkhe",
//   });
// });
// we cant use multiple time if use then 1st will execute


// Bad Url Request
app.use((req,res,next)=>{
  res.status(404).json({
    error:'Bad Url Request'
  })
})








module.exports = app;
