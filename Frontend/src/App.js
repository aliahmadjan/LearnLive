import { useState, useCallback } from "react";
import { Box, Toolbar } from "@mui/material";
import './App.css';
//import SignInSide from './pages/Login/Login';

import {BrowserRouter as Router, Routes , Route}  from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import NavigationUI from "./components/NavigationUI.js";
import { LoggedInRoutes, LoggedOutRoutes } from "./routes/AllRoutes";


function App() {
  /////
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  const setCurrentUser = useCallback((u) => {
    setUser(u);
  }, []);

  let routes = loggedIn ? LoggedInRoutes() : LoggedOutRoutes();

  return (
    <AuthContext.Provider
      value={{
        isLogged: loggedIn,
        login: login,
        logout: logout,
        user: user,
        setUser: setCurrentUser,
      }}
    >
      <Router>
        <Box sx={{ display: "flex" }}>
          {loggedIn && <NavigationUI />}
          {loggedIn && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar/>
              {routes}
            </Box>
          )}
          {!loggedIn && (
            <Box component="main" sx={{ flexGrow: 1 }}>
              {routes}
            </Box>
          )}
        </Box>
      </Router>
    </AuthContext.Provider> 
  );
}

export default App;

/*
function App() {
  return (

    <div className="App">
      <Router>
        <Routes >
          <Route path='/' element = { <SignInSide/> } />  
        </Routes>
      
      </Router>
      
      
    </div>
  );
}

export default App;
*/
