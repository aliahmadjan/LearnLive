import { Routes, Route } from "react-router-dom";

import SignInSide from "../pages/Login/Login";
import UploadAssignment from "../pages/Teacher/UploadAssignment";
import ViewAssignments from "../pages/Teacher/ViewAssignments"
import EditAssignment  from "../pages/Teacher/EditAssignment";
import AssignmentInfo from "../pages/Teacher/AssignmentInfo";

//import RandomLogin from "../pages/SignIn/RandomLogin";

export const LoggedOutRoutes = () => {
    let routes;
    
    routes = (
      <Routes>
        <Route path="/" element={<SignInSide/>} />
      </Routes>
    );
  
    return routes;
  };

  export const LoggedInRoutes = () => {
    let routes;
    routes = (
      <Routes>
         <Route path="/assignments/uploadassignment" element={<UploadAssignment />} />
         <Route path="/assignments/viewassignments" element={<ViewAssignments />} />
         <Route path="/assignments/edit/:assignmentno" element={<EditAssignment />} />
         <Route path="/assignments/:assignmentno" element={<AssignmentInfo />} />
    </Routes>
    );
    return routes;
  };
  