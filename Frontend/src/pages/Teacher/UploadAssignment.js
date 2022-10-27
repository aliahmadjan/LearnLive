import React, { useState } from "react";

import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hooks";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { uploadAssignment } from "../../services/Userservice";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Viewer } from '@react-pdf-viewer/core';
import { Worker} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const events = [];

const UploadAssignment = () => {

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
      setAllEvents([...allEvents, newEvent]);
  }


  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [submitStatus, setSubmitStatus] = useState(0);
   
  //for onChange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError,setPdfFileError ] = useState('');

  // for submit event
  const [viewPdf , setViewPdf]= useState(null);

  //onchange event
   const fileType = ['application/pdf'];
  //const fileType = ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
  const handlePdfFileChange = (e) =>
  {
  let selectedFile = e.target.files[0];
  if(selectedFile)
  {
    if(selectedFile && fileType.includes(selectedFile.type)){
       let reader = new FileReader();
       reader.readAsDataURL(selectedFile);
       reader.onloadend = (e) => {
        setPdfFileError('')
        setPdfFile(e.target.result); //setPreviewSource
        console.log(reader.result)
        
       }
    }
    else{
      setPdfFileError('Please select valid pdf file');
      setPdfFile('');
      
    }
  }
  else{
    console.log("Please Select a PDF");
  }
  } 


  // form submit 
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }



  const [formState, InputHandler] = useForm(
    {
      assignmentno:{
        value:"",
        isValid: false,
      },
     topic: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      marks: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  const onSubmitHandler = () => {
    assignmentSubmitHandler();
  };
  const [snackOpen, setSnackOpen] = React.useState(false);

  const assignmentSubmitHandler = () => {
     const file = pdfFile || '';
     console.log(file)
    uploadAssignment (
      formState.inputs.assignmentno.value,
      formState.inputs.topic.value,
      formState.inputs.description.value,
      formState.inputs.marks.value,
      
      file,
      console.log("HELLO",file)
    )

      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setSubmitStatus(1);
          //setPdfFileError(1);
          setSnackOpen(true);
        } else {
          setSubmitStatus(-1);
          //setPdfFileError(-1);
          setSnackOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitStatus(-1);
        setSnackOpen(true);
      });
    console.log(formState.inputs);
    console.log("Image: ", file)
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
         Assignment was not uploaded!
        </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Assignment Uploaded Successfully!
        </Alert>
      );
  };

  /*
  const handleFileInputChange = (e) => {
    //const files = e.target.files
    //const data = new FormData()
    //data.append('file',files[0])
    //data.append('upload_preset','Assignments')
    
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    console.log(selectedFile);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    console.log("Result",reader.result)
    setPreviewSource(reader.result);
    };
  };
 */
  return (
    <Grid justifyContent="center" display="flex" flex-direction="row">
      <Card sx={{ width: "90%", maxWidth: "900px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            m: 1,
          }}
        >
          <AssignmentIcon sx={{ mr: 2 }}>
                     </AssignmentIcon>
          <Typography variant="h5">New Assignment</Typography>
        </Box>

       
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",

            p: 1,
          }}
        >
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="assignmentno"
            label="Assignment No"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Assignment Number is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="topic"
            label="Topic"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Topic is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="description"
            label="Description"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Description is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="marks"
            label="Total Marks"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MIN(10)]}
            errorText="Total Marks must be entered"
          />

     
      
           

         
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
              width: "100%",
              p: 1,
            }}
              >
            <InputLabel sx={{ p: "-1px", w: "100%" }}>
              Assignment
            </InputLabel>

            <input
              style={{
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
              }}
              id="imagefile"
              type="file"
              onChange={handlePdfFileChange}
            />
          </Box>
          <Grid container display="flex" justifyContent="flex-end">
            <Button
              onClick={onSubmitHandler}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mt: 2 }}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Card>
     
      
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div>
          <StatusAlert />
          
        </div>
      </Snackbar>
    </Grid>
  );
 
};

export default UploadAssignment;
