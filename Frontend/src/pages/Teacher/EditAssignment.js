import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//import { getTeacher, updateTeacher } from "../../services/UserService";
import { getAssignment, updateAssignment } from "../../services/Userservice";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hooks";
import Alert from "@mui/material/Alert";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditAssignment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const prev_assignmentno = useParams().assignmentno;
  //const prev_username = useParams().username;
  const [assignment, setAssignment] = useState("");
  const navigate = useNavigate();
  //run on page load
  useEffect(() => {
    getAssignment(prev_assignmentno)
      .then((response) => {
        if (response.status === 201) {
          setAssignment(response.data);
          console.log(response.data);
        } else console.log("Assignment was not found");
      })
      .catch((err) => console.log(err));
  }, [prev_assignmentno]);

  const [submitStatus, setSubmitStatus] = useState(0);
  //const [selectedFile, setSelectedFile] = useState("");
  //const [fileInputState, setFileInputState] = useState("");
  //const [previewSource, setPreviewSource] = useState("");

  const [formState, InputHandler, setFormData] = useForm(
    {
      assignmentno: {
        value: "",
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
      },
    },
    false
  );

  useEffect(() => {
    console.log("useEffect hit: ", assignment);
    setFormData(
      {
        assignmentno: {
          value: assignment.assignmentno,
          isValid: true,
        },
        topic: {
          value: assignment.topic,
          isValid: true,
        },
        description: {
          value: assignment.description,
          isValid: true,
        },
        marks: {
          value: assignment.marks,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
    //console.log("FormState: ", formState.inputs)
  }, [setFormData, assignment]);

  const onSubmitHandler = () => {
    console.log(formState.inputs);
    assignmentSubmitHandler();
  };
  const [snackOpen, setSnackOpen] = useState(false);

  const assignmentSubmitHandler = () => {
    //const image = previewSource || "";
    //console.log(previewSource)
    updateAssignment(
      prev_assignmentno,
      formState.inputs.assignmentno.value,
      formState.inputs.topic.value,
      formState.inputs.description.value,
      formState.inputs.marks.value
      //image
    )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          console.log("were heree");
          setSubmitStatus(1);
          setSnackOpen(true);
        } else {
          setSubmitStatus(-1);
          console.log("we dont want to be heree");
          setSnackOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("we dont want to be heree part 2");
        setSubmitStatus(-1);
        setSnackOpen(true);
      });
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Assignment was not updated!
        </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Assignment Updated Successfully!
        </Alert>
      );
  };
 /*
  const handleFileInputChange = (e) => {
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
      setPreviewSource(reader.result);
    };
  };
  */
  const handleGoBackClick = (e) => {
    e.preventDefault();
    let url = "/assignments/viewassignments";
    navigate(url);
  };

  if (isLoading) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  if (typeof assignment === "object")
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
            <Typography variant="h5">Update Assignment</Typography>
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
              errorText="Assignment No is a required field"
              initialValue={assignment.assignmentno}
              initialValid={formState.inputs.assignmentno.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="topic"
              label="Topic"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Topic is a required field"
              initialValue={assignment.topic}
              initialValid={formState.inputs.topic.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="description"
              label="Description"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(2000)]}
              errorText="Description is a required field"
              initialValue={assignment.description}
              initialValid={formState.inputs.description.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="marks"
              label="Marks"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MIN(10)]}
              errorText="Marks is a required feild"
              initialValue={assignment.marks}
              initialValid={formState.inputs.marks.isValid}
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
              
              
            
            </Box>
            <Grid container display="flex" justifyContent="space-between">
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBackClick}
              >
                Go Back
              </Button>

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

export default EditAssignment;
