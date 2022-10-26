const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
require('dotenv').config();


const app = express();
app.use(express.json());
const bodyParser = require("body-parser")

//app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));



//console.log(db);
//const uri = process.env.DATABASE;
//mongoose.connect(uri);
mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/mernstack?retryWrites=true&w=majority");
const connection = mongoose.connection;
connection.once('open', () => {
  
  console.log("MongoDB connection established successfully");
})


const LoginRouter = require('./routes/login-route')
const NewAssignmentRouter = require('./routes/uploadassignment-route')


app.use(fileUpload({
  useTempFiles:true
}));

app.use('/login', LoginRouter);
app.use('/assignments', NewAssignmentRouter);

/*
app.get('/',(req,res) =>
{
  res.send(`Hello `);
});
*/
//error middelware
//special middleware function for error handling
app.use((error, req, res, next)=>{
  if(res.headerSent){
      return next(error);
  }
  //no response has been sent yet 
  res.status(error.code || 500);
  res.json({

      message: error.message || 'An unknown error occured!'
  });
}); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

/*
mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/mernstack?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}). then( () => {
  console.log("MongoDB connection established successfully");
}).catch((error) => console.log(`No connection`)); */