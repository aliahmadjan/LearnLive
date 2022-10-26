const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/LoginModel');
const loginController = require('../controllers/login-controller');

mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/mernstack?retryWrites=true&w=majority");
const connection = mongoose.connection;
connection.once('open', () => {
  
  console.log("MongoDB connection established successfully");
}) 

router.get('/',(req,res) => 
{
    res.send(`hello world from the server router js`);
});

router.post('/adduser',loginController.addUser);

router.post('/verify', loginController.verifyLogin);

router.patch('/:emailaddress', loginController.updateLogin)

router.delete('/:emailaddress', loginController.deleteLogin)

module.exports = router;



