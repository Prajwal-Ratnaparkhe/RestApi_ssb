const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const User = require("../model/userSchema"); // Import UserSchema 
const jwt=require('jsonwebtoken');




// for post data in database

router.post("/signup", (req, res, next) => {
    //  console.log(req.body);

    bcrypt.hash(req.body.password, 10, (err, hash) => {            // start to make password bcrypt


        if (err) {  // first check error
            return res.status(500).json({
                error: err
            })
        }

        else {
            const user = new User({ // if not

                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,  // make password hash
                email: req.body.email,
                phone: req.body.phone,
                userType: req.body.userType,

            })


            user.save() // save user data in mongodb

                .then((result) => {
                    // if save successfully

                    console.log(result);
                    res.status(200).json({
                        newuser: result,
                    });
                })

                .catch((err) => {
                    // if occure any error
                    console.log(err);
                    res,
                        status(500).json({
                            error: err,
                        });
                });
        }
    })



});




router.post('/login',(req,res,next)=>{

    User.find({username:req.body.username})   // find enter password to database username

    .exec()
    .then(user=>{

        if(user.length <1)   // if no user found
        {
            return res.status(401).json({
                msg:'User Not Found'
            })
        }
// bcrypt take 3 parameter 1 and 2 compare  & 3 is return  result and error
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{  // if user found

            if(!result)   // but password not match
            {
                return res.status(401).json({
                    msg:'password not match'
                })
            }

            if(result)   // then start making token 
            {

                const token =jwt.sign({
                    username:user[0].username,
                    password:user[0].password,
                    userType:user[0].userType,
                    phone:user[0].phone,
                    email:user[0].email
                },
                
                'this is dummy text',           // secrite key  for token

                {
                    expiresIn:'1h'  // token expire after time
                }

                )

                res.status(200).json({  // return data
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    })


    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
    

});











module.exports = router;
