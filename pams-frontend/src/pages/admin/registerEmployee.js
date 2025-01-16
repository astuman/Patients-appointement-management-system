import React, { useState, useRef } from 'react';
import api from '../../api/api';
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
import { TextArea } from 'semantic-ui-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';



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

export default function RegisterStaff() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [departement, setDepartement] = useState('')
  const [experienceYear, setExperienceYear] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const data = {
    role:role,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    address: address,
    contactNo: contactNo,
    departement: departement,
    experienceYear: experienceYear,
    dob: dob,
    email: email,
    password: password,
    accountStatus: "verified"
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if (data) {
      try {
        api.post('/employee/register', data)
          .then((res) => {
            if (res.status === 200) {
              alert('Successfully registered')
                navigate('/employee')
            } else {
              alert("check parameters")
            }
          })
      } catch (err) { console.log(err) }

    } else {
      console.log("parameter error")
    }


    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDob(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Navbar />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadus: '5',
          }}
        >
          <Typography component="h1" variant="h5">
            Register New Employee
          </Typography>
          <Box>
            <Grid container spacing={2}>
            
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <InputLabel id="demo-simple-select-label">Staff Role</InputLabel>
                <Select
                  labelId="select-label"
                  required
                  id="rol-select"
                  label="Health status"
                  onChange={e => setRole(e.target.value)}
                >
                  <MenuItem value={'doctor'}>Doctor</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select><br />
              </Grid>
              <Grid item xs={12} sm={3}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="select-label"
                  required
                  id="gender-select"
                  label="Gender"
                  onChange={e => setGender(e.target.value)}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select><br />
              </Grid>
              <Grid item xs={12} sm={3}>
              <InputLabel id="demo-simple-select-label">Departement</InputLabel>
                <Select
                  labelId="select-label"
                  required
                  id="Dep-select"
                  label="departement"
                  onChange={e => setDepartement(e.target.value)}
                >
                  <MenuItem value={'Heart Specialist'}>Heart Specialist</MenuItem>
                  <MenuItem value={'Eye Spacialist'}>Eye Spacialist</MenuItem>
                  <MenuItem value={'Skin Specialist'}>Skin Specialist</MenuItem>
                  <MenuItem value={'General surgeon.'}>General surgeon.</MenuItem>
                </Select><br />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-controlled"
                  type='date'
                  label="Age"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                /><br />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact No"
                  name="contactNo"
                  type='Phone'
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="experienceYear"
                  label="Experince Year"
                  type="text"
                  id="experienceYear"
                  onChange={(e) => setExperienceYear(e.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                //20,20,36
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}