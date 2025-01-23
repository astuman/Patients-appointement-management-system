import { React, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SetCookie from './hooks/setCookie';
import RemoveCookie from './hooks/removeCookie';
import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';

// import useAuth from './hooks/useAuth';
import api from './api/api'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  useEffect(() => {
    setErrMsg('');
  }, [])

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const datas = {
    email: email,
    password: password,
    method: 'post',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
        alert("uername and passsord are required")
        navigate('/login')
      }
    try {
      await api.post('/login', datas)
        .then(res => {
          if (!email || !password) {
            alert("uername and passsord is required")
            navigate('/login')
          } else {
            if(res.data.status === 'blocked')
            alert("Your account status is "+res.data.status)
             else if(res.data.email === undefined) {
              alert('email or password error')
            }else{
              RemoveCookie("user")
              localStorage.removeItem('PID')
              localStorage.removeItem('role')
              localStorage.removeItem('UID')
              SetCookie('user', JSON.stringify(res.data))
              localStorage.setItem('UID', res.data.uid)
              localStorage.setItem("role", res.data.role)
              const uid = localStorage.getItem('UID')

              if (res.data.role === 'doctor') {
                navigate('/patient')
                localStorage.setItem('PID', uid)
              } else if (res.data.role === 'admin') {
                navigate('/dashboard')
              } else if (res.data.role === 'patient') {
                navigate(`/result/patient/${uid}`)
              } else {
                alert('User role not Defined')
                navigate('/login')
              }
            }
          }
        })
      return setErrMsg('username or password missed')

    } catch (err) {
      setErrMsg(err)
    }

  }
  const Home =()=>{
    navigate('/')
  }


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/astuman">
          Astewul
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
          
          <form>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 20,
                maxWidth: 550,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 0.5,
                borderRadius: 5,
                maskPosition: 2
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Button color='primary' bgcolor='White' on onClick={Home}>
            Go Back
          </Button>

              <Box maxWidth={300}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete='off'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
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
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/resetpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </form>
        </Container>
      </ThemeProvider>
    </div>
  );
}
export default Login;