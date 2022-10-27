let newassignment = require("../models/UploadAssignment");
let { cloudinary } = require("../utils/cloudinary");
const upload = require('../utils/multer') 

//let Section = require('../models/section.model')

const HttpError = require("../models/HttpError");
/*
const uploadAssignment = async (req,res,next) =>
{
  try{
console.log(req.body);
const image = req.body.image
//const image = req.files.image;
var uploadResponse 
console.log("HELLO")
uploadResponse = await cloudinary.uploader.upload(image, {
  upload_preset: "Assignments",
})
console.log("HELLO")
console.log(uploadResponse);
  }
  catch (err) {
    return next(new HttpError(err.message, 500));
  }

};
*/
const getAllAssignments = async (req, res, next) => {
  try {
    newassignment.find()
      .then((assignments) => res.status(201).json(assignments))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};


const uploadAssignment = async (req, res, next) => {
 
      try {
      console.log("Hello");
      const assignmentno = req.body.assignmentno;
      const topic = req.body.topic;
      const description = req.body.description;
      const marks = req.body.marks;
      const image = req.body.image || "";
      console.log("HEY", image);
      var uploadResponse;
      
      if (image !== "") {
        console.log("HI");
        uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "Assignments",
        });
        console.log("HELLO");
        console.log(uploadResponse);
      }  else {
        console.log("HELLO1");
        uploadResponse = { public_id: "" };
      }
     
      const newAssignment = new newassignment({
        assignmentno,
        topic,
        description,
        marks, 
        image: uploadResponse.public_id
      });
  
      newAssignment
        .save()
        .then(() => res.status(201).json({ message: "Assignment Uploaded!" }))
        .catch((err) => res.status(401).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
    
    
  };

  const updateAssignment = async (req, res, next) => {
    try {
      const assignmentno = req.params.assignmentno;
      var temp_assignment = await newassignment.findOne({ assignmentno });
  
      //const image = req.body.image || "";
      //var uploadResponse;
      //if (image !== "") {
        //uploadResponse = await cloudinary.uploader.upload(image, {
          //upload_preset: "Teachers",
        //});
        //console.log(uploadResponse);
        //delete last image
        console.log("Assignment: " + temp_assignment);
        //const public_id = temp_teacher.image;
        //console.log("Public ID: " + public_id);
         //const deleteResponse = await cloudinary.uploader
          //.destroy(public_id)
          //.then((res) => console.log(res))
          //.catch((err) => console.log(err));
      //} else {
        //uploadResponse = { public_id: "" };
       //}
  
      const updates = {
        assignmentno:req.body.assignmentno,
        topic :req.body.topic,
        description : req.body.description,
        marks : req.body.marks
        //firstName: req.body.firstName,
        //lastName: req.body.lastName,
        //username: req.body.username,
        //age: req.body.age
      };
  
      //if (image !== "" && uploadResponse.public_id !== "") {
        //updates.image = uploadResponse.public_id;
      //}
  
      newassignment.findOneAndUpdate({assignmentno}, updates)
        .then(() => res.status(201).json("Update operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
  

  const deleteAssignment = async (req, res, next) => {
    try {
      console.log("Hello XDDDD")
      const assignmentno = req.params.assignmentno;
      var temp_assignment = await newassignment.findOne({ assignmentno });
      console.log("Assignment: " + temp_assignment);
      //const public_id = temp_teacher.image;
      //console.log("Public ID: " + public_id);
      //const deleteResponse = await cloudinary.uploader
        //.destroy(public_id)
        //.then((res) => console.log(res))
        //.catch((err) => console.log(err));
  
      if (temp_assignment !== null) {
        newassignment.findByIdAndRemove(temp_assignment._id)
          .then(() =>
            res.status(202).json("Delete operation called successfuly!")
          )
          .catch((err) => res.status(400).json("Error: " + err));
      } else
        return res.status(404).json({ message: "Assignment was not deleted" });
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };


  
const getAssignment = async (req, res, next) => {
  try {
    const assignmentno = req.params.assignmentno;
    newassignment.findOne({ assignmentno: assignmentno }).populate()
      .then((assignments) => res.status(201).json(assignments))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};


  exports.getAllAssignments = getAllAssignments;  
  exports.uploadAssignment = uploadAssignment;
  exports.updateAssignment = updateAssignment;
  exports.deleteAssignment = deleteAssignment;
  exports.getAssignment = getAssignment;