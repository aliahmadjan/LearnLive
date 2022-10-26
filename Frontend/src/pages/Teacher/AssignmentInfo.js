import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

import { Grid, Card, Box, Typography, Paper, Button } from "@mui/material";
import { getAssignment } from "../../services/Userservice";
//import { Image } from "cloudinary-react";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AssignmentInfo = () => {
  let assignmentno = useParams().assignmentno;
  let [assignment, setAssignment] = useState({});
  const navigate = useNavigate();
  //run on page load
  useEffect(() => {
    getAssignment(assignmentno)
      .then((response) => {
        if (response.status === 201) {
          setAssignment(response.data);
        } else console.log("Assignment was not found");
      })
      .catch((err) => console.log(err));
  }, [assignmentno]);
  var d = new Date(assignment.createdAt);
  //console.log("Created at: ", teacher.createdAt)
  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  var newDate = date + "/" + month + "/" + year;

  const handleGoBackClick = (e) => {
    e.preventDefault();
    let url = '/assignments/viewassignments';
    navigate(url);
  }
  return (
    <>
      <Card>
        <Grid container xs={12} style={{ padding: "0px", display: "flex" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { lg: "none", sm: "block" } }}
          >

          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { lg: "block", sm: "none", xs: "none" } }}
          >
            
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <Paper elevation={0}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                     Assignment No:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {assignment.assignmentno}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Topic:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {assignment.topic}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Description:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {assignment.description}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Marks:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {assignment.marks}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 700 }} variant="h6">
                      Uploaded On:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {newDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2} sx={{mt:1}}>
        <Grid item xs={12} textAlign="right">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AssignmentInfo;
