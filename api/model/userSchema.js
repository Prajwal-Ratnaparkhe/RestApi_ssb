const mongoose = require('mongoose');

// Making user for login or singup database schema

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    email:String,
    phone:Number,
    userType:String,

})

module.exports=mongoose.model('userSchema',userSchema);


