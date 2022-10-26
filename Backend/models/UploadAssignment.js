const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const newAssignment = new Schema({
  assignmentno : {
    type: String ,
  },
  topic: {
    type: String,
    //required: true,

  },
  description: {
    type: String,

  },
  marks: {
    type: Number,

  },
  image: {
    type: String,
  },
}, {
  timestamps: true,
});

const newassignment = mongoose.model('newassignment', newAssignment);
newassignment.createIndexes();
module.exports = newassignment;