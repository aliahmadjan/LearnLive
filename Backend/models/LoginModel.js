const mongoose = require('mongoose');

const uesrSchema = new mongoose.Schema({
    emailaddress: {
        type: String,
        required: true,

    },

    password :{
      type:String,
      required: true,   
    }

})

const User = mongoose.model('USER',uesrSchema);

module.exports = User;