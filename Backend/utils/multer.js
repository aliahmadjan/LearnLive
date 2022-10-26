const multer = require('multer');
const path = require('path')
const express = require('express');
var app = express();
//storage: multer.diskStorage({})
var hello = app.use(multer({ storage : multer.diskStorage}).fields([{name:'image',maxCount:10}]));
module.exports = multer({
    
   hello,
    //storage: multer.diskStorage({}),
    
    fileFilter:(req,file,cb) => {
        let ext = path.extname(file.originalname);
        if(ext!=".png" && ext!=".pdf" && ext!=".docx" && ext!=".jpeg" && ext!=".jpg"){
            cb(new Error("File Type is not supported"),false);
            return;
        }
        cb(null,true);
    },
});