import axios from "axios";

let URL = "http://localhost:5000/";

export async function login(emailaddress, password) {
  let tempURL = URL+"login/verify";
  console.log(tempURL);
  let loginDetails = { emailaddress, password };

  const response = await axios.post(tempURL, { emailaddress, password })
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }
}


export async function uploadAssignment(assignmentno,topic,description,marks,file) {
  let tempURL = URL + "assignments/uploadassignment/post";
  console.log(tempURL);
  const response = await axios.post(tempURL, {
    assignmentno,topic,description,marks,file
  });
  console.log("MFSSSSS",file)
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }

}


export async function getAllAssignments() {
  let tempURL = URL + 'assignments/viewassignments' // 'http://localhost:5000/assignments'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if(response.status === 201) {
    console.log(response)
    return response;
  }
  else if(response.status === 401)
  {
    return -1
  }
}
export async function getAssignment(assignmentno){
  let tempURL = URL + `assignments/${assignmentno}`;
  const response = await axios.get(tempURL);
  return response;
}
export async function updateAssignment(oldassignmentno,assignmentno,topic, description, marks) {
  let tempURL = URL + `assignments/${oldassignmentno}`;
  console.log(tempURL);
  const response = await axios.patch(tempURL, {
    assignmentno,topic, description, marks
  });
  return response;

}


export async function deleteAssignment(assignmentno){
  let tempURL = URL + `assignments/${assignmentno}`;
  const response = await axios.delete(tempURL);
  return response;
}
