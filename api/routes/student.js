const express = require("express");
const { status } = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const StudentSchema = require("../model/studentSchema"); // Import Student Schema from model folder

const checkAuth = require("../middleware/check-auth");  // Import the middleware parh



/**************************************************Get**********************************************************/

// to get data from database

router.get("/", checkAuth,(req, res, next) => {
  StudentSchema.find() // find student data in mongodb

    .then((result) => {
      // if find successfully
      res.status(200).json({
        studentData: result,
      });
    })

    .catch((err) => {
      // if occure any error
      res.status(500).json({
        error: err,
      });
    });
});

/**************************************************Get By id**********************************************************/

router.get("/:id", checkAuth,(req, res, next) => {
  StudentSchema.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })

    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


/**************************************************Post**********************************************************/



// for post data in database

router.post("/",checkAuth, (req, res, next) => {
  //  console.log(req.body);
  const student = new StudentSchema({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  });

  student
    .save() // save student data in mongodb

    .then((result) => {
      // if save successfully

      console.log(result);
      res.status(200).json({
        newStudent: result,
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
});


/**************************************************Delete**********************************************************/


router.delete("/:id",checkAuth,(req,res,next)=>{
    StudentSchema.remove({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            Message:"Data deleted"
        })
    })

    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})



/**************************************************PUT (Modify)**********************************************************/


router.put("/:id",checkAuth,(req,res,next)=>{
    StudentSchema.findByIdAndUpdate({_id:req.params.id},{

        $set:{
            
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,   
                
        }
    })

    .then(result =>{
        res.status(200).json({
            updatedData:result
        })
    })

    .catch(err=>{
      console.log(err);
        res.status(500).json({
            error:err
        })
    })
        
})






module.exports = router;
