const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/LoginModel');
const addUser = async(req,res) => 
{
    const {emailaddress,password} = req.body;
        
    if(!emailaddress || !password){
        return res.status(422).json({error:"ERROR"});
    }

try{
    const userExist = await User.findOne({emailaddress: emailaddress});


        if(userExist)
        {
            return res.status(422).json({error:"Email already registered"});
        }
   
        const user = new User({emailaddress,password}) ;

         await user.save();

          
                res.status(201).json({message: "user registered successfully"});

    
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
        
    //console.log(emailaddress);
    //console.log(password);
   //res.json({message: req.body});
};

const verifyLogin = async(req,res,next) => {
    try {
        
        const {emailaddress,password} = req.body;
        
        const log= await User.findOne({emailaddress:emailaddress , password:password});
        if(log)
        {
          res.status(201).json(log)
  
        }
        else
        {
          res.status(401).json("Emailaddress or Password not found!")
        }
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
       
};

const updateLogin = async (req, res, next) => {
  try {
      const emailaddress ={emailaddress:req.params.emailaddress};
      const updates=req.body;
    Login.findOneAndUpdate(emailaddress,updates)
      .then(() => res.json("Update operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteLogin = async (req, res, next) => {
  try {
      const emailaddress ={emailaddress:req.params.emailaddress};

    Login.findOneAndDelete(emailaddress)
      .then(() => res.json("Delete operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

exports.addUser = addUser;
exports.verifyLogin = verifyLogin;
exports.updateLogin = updateLogin;
exports.deleteLogin = deleteLogin;