const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary')
const upload1 = require('../utils/multer') 
const mongoose = require('mongoose');



const newAssignmentController = require('../controllers/uploadassignment-controller');

/*

mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/mernstack?retryWrites=true&w=majority");
const connection = mongoose.connection;
connection.once('open', () => {
  
  console.log("MongoDB connection established successfully");
})
*/ 
  //upload new assignment
  router.post('/uploadassignment', newAssignmentController.uploadAssignment)

  // view all assignments
  router.get('/viewassignments',newAssignmentController.getAllAssignments)

  //delete an assignment using assignment no
  router.delete('/:assignmentno', newAssignmentController.deleteAssignment)

  // update an assignment using assignment no
  router.patch('/:assignmentno' , newAssignmentController.updateAssignment)

  // get a single assignment using assignment no
  router.get('/:assignmentno' , newAssignmentController.getAssignment)
/*
router.post("/uploadassignment",upload1.single('image'), async(req,res)=> {
  console.log('This is the rejected field ->', error.field);
  try{
    
    const result = await cloudinary.uploader.upload(req.file.path)
    res.json(result);
  }
  catch(err)
  {
    console.log("yar",err)
  }
});
*/
module.exports = router;