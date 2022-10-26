import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Modal,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Fade,
  Backdrop,
  bottomNavigationActionClasses
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchBox from "../../components/SearchBox";
//import { getAllTeachers, deleteTeacher } from "../../services/UserService";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getAllAssignments , deleteAssignment } from "../../services/Userservice";
//import { Image } from "cloudinary-react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};

const ViewAssignments = () => {
  const[assignmentOptions , setAssignmentOptions ] = useState([]) 
  const [ assignmentno, setAssignmentNo] = useState("");
  //const [ topic , setTopic ] = useState ("");
  const [ assignmentsList , setAssignmentsList ] = useState([])
  const [ assignmentsMasterList , setAssignmentsMasterList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ selectedAssignment , setSelectedAssignment] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    getAllAssignments().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setAssignmentsList(response.data);     
        setAssignmentsMasterList(response.data);
        if (response.data.length !== assignmentOptions.length) {
          var temp_list = [];
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].assignmentno) };
            if (
              assignmentOptions.find(
                (assignment) => assignment.label === tempObj.label
              ) === undefined
            )
              temp_list.push(tempObj);
          }
          setAssignmentOptions(temp_list);
        }
      } else if (response.status === 401) {
        alert("Assignment not found");
        console.log(response.data);
      }
    });// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const textChange = (value) => {
    setAssignmentNo(value);
    //console.log("here: " + value);
    if (typeof value === "string") {
        const filteredArray = assignmentsMasterList.filter((assignment) => {
            return assignment.assignmentno.toLowerCase().includes(value.toLowerCase());
        });
     
      setAssignmentsList(filteredArray);
     
    }
    if(value.length === 0 ) setAssignmentsList(assignmentsMasterList);

  };

  const handleAssignmentDelete = (assignmentId) => {
    setSelectedAssignment(assignmentId)

    console.log(assignmentId);
    setModalOpen(true);
  };

  const handleDeleteAssignment = () => {
    const assignmentId = selectedAssignment;
    //const teacherId = selectedTeacher;
    setModalOpen(false);
    const temp_assignments = assignmentsList.filter(
      (assignment) => assignment.assignmentno !== assignmentId
    );
    setAssignmentsList(temp_assignments);
    //setTeachersList(temp_teachers);
    setAssignmentOptions(
      assignmentOptions.filter((option) => option.label !== assignmentId)
    );
    let res = deleteAssignment(assignmentId);
    if (res.status === 202) console.log("Assignment was deleted successfully");
    else console.log(res);
  };

  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };

    const handleAssignmentCardClick = (assignmentno) => {
    let url = `/assignments/${assignmentno}`;
    navigate(url);
  }

  const handleAssignmentEditClick = (assignmentno) => {
    let url = `/assignments/edit/${assignmentno}`;
    navigate(url);

  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SearchBox
          onChange={textChange}
          inputValue={assignmentno}
          options={assignmentOptions}
          label="Assignment No"
          //label="Teacher Username"
        />
      </Grid>
      <Grid item xs={11}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                Are you sure you want to delete this assignment?
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => setModalOpen((prevState) => !prevState)}
                  variant="contained"
                  component="label"
                  sx={{ mr: 3 }}
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleDeleteAssignment}
                  variant="outlined"
                  color="error"
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>

      {assignmentsList.map((item) => (
        <Grid
          item
          sm={12}
          md={6}
          lg={4}
          key={item.assignmentno}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ maxWidth: 320 }}>
         <Button 
          sx={{ width: "70%" }}
          component="label"
          variant="outlined"
          onClick={() => handleAssignmentCardClick(item.assignmentno)}
          style = {{padding: "0px"}}
          startIcon = {<AssignmentIcon/>}
          >
           
          View Info

          </Button>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.assignmentno}
              </Typography>
            </CardContent>

            <CardActions>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{ width: "40%" }}
                  variant="contained"
                  component="label"
                  startIcon={<EditIcon />}
                  onClick={() => handleAssignmentEditClick(item.assignmentno)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ width: "40%" }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleAssignmentDelete(item.assignmentno)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ViewAssignments;

