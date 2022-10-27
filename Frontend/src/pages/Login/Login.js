import * as React from 'react';
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from '../../context/AuthContext';
import {login as LoginUser} from '../../services/Userservice';


const SignInSide = () => {
//const navigate = useNavigate();
const auth = useContext(AuthContext);
const [errorMessage, setErrorMessage] = useState("");
  //const [ user, setUser] = useState({
  //emailaddres:"",password:""});

    //let name, value;
    const handleInputs = (e) => {

      e.preventDefault();
     const data = new FormData(e.target);
     
      const emailaddress = data.get("emailaddress");
      const password = data.get("password");
      console.log({emailaddress,password});

        //console.log(e);
      //name = e.target.name;
      //value = e.target.value;

      //setUser({...user, [name]:value});
    

    LoginUser(emailaddress,password)
    .then((log) => {
      if(log.status === 201)
      {
        auth.setUser(log.data.emailaddress);
        auth.login();
        window.alert("Sign-in successful");
      }
      })
      .catch((err) => {
        setErrorMessage("Invalid login credentials");
        console.log("Error: " + err);
      });
    };

    const theme = createTheme({
      palette: {
          type: 'dark',
          primary: {
            main: '#3f51b5',
          },
          secondary: {
            main: '#f50057',
          },
          mode: 'dark'
      },
  });
/*
    const PostData = async(event) => 
    {
       event.preventDefault();
       const {emailaddress , password} = user;

       const res = await fetch("/verify" , {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          emailaddress , password
        })
       })

       const data = await res.json();

       if(res.status === 422 || !data){
        window.alert("invalid login credentials");
        console.log("invalid login credentials")
       }
       else
       {
        auth.setUser()
        window.alert("Signup success");
        console.log("Signup success");

        //navigate('/',{replace:true});
       }


       }
  */
       return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
                backgroundRepeat: "no-repeat",
                backgroundColor: "primary", //(t) =>
                //t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleInputs}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="emailaddress"
                    autoComplete="email"
                    autoFocus
                    error={errorMessage === "" ? false: true}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={errorMessage}
                    error={errorMessage === "" ? false: true}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );

}
export default SignInSide

/*

value={user.emailaddress}
                onChange={handleInputs}
value={user.password}
            onChange={handleInputs}



            const myStyle={
    backgroundImage: 
"url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height:'106.8vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
const paperStyle={padding :100,height:'70vh',width:250, margin:"20px auto"}
const avatarStyle={backgroundColor:'red'}
const btnstyle={margin:'8px 0'}
return(
    <div style={myStyle}>
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h3>LogIn</h3>
            </Grid>
            
            <TextField label='EmailAddress' name='emailaddress' placeholder='Enter emailaddresss' id='emailaddress'
                />
            <TextField label='Password' name='password' placeholder='Enter password' id= 'password' type='password' 
            />
            

            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth
            onSubmit = {handleInputs}>Sign in</Button>
           
            <Typography >
                 <Link href="#" >
                    Forgot password ?
            </Link>
            </Typography>
            <Typography > Do you have an account ?
                 <Link href="#" >
                    Sign Up 
            </Link>

            </Typography>
            
        </Paper>
    </Grid>
    </div>
);
}

*/