import React, { useState, useEffect, useMemo } from 'react'
import Login from '../../login'
import api from '../../api/api'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Results, Patients, FilterPatient } from '../../../action/action';
import { Table, Input, Form } from 'semantic-ui-react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navbar/navbar';
import { FilterEmployee } from '../../../action/action';
import { DataGrid } from '@mui/x-data-grid';
import { TextFieldProps } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export const UpdateProfile = () => {
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchProfile, setSearchProfile] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("uid");
  const u = localStorage.getItem('UID');
  // console.log(drId)
  const [uid, setUid] = useState(u);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [status, setStatus] = useState('');
  const Inputuid = parseInt(uid);

  useEffect(() => {
    const searchProfile = async () => {
      if (localStorage.getItem("UID") !== null) {
        // const ID = parseInt(I)
        try {
          const datas = await api.get(`/employee/find/${Inputuid}`)
          setUid(datas.data.uid)
          setFirstName(datas.data.firstName)
          setLastName(datas.data.lastName)
          setEmail(datas.data.email)
          setGender(datas.data.gender)
          setAddress(datas.data.address)
          setContactNo(datas.data.contactNo)
          setDob(datas.data.dob)
        } catch (error) {
          setError(error.response?.data?.message);
        }
      };
    }
    searchProfile();
    
  }, []);

  const handleUpdate = (e) => {
    const datas = {
      uid: uid,
      firstName:firstName,
      lastName:lastName,
      gender:gender,
      dob:dob,
      address: address,
      contactNo: contactNo,
    }
    api.put(`/employee/update/${Inputuid}`, datas)
      .then((res) => res.status ? (dispatch(setSearchProfile())) : "")
      .catch(err => console.log(err))
      alert("Update profile success")
      navigate(`/patient`)
      
  }

  const theme = createTheme();
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} mt={1} >
          <Paper
            sx={{
              mt:2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '300',
              width: '100%',
              border: 2,
              alignItems: 'center',
            }}>
            <div >
    
            <Grid item xs={12} md={12} lg={10} mt={2} >
            <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="uid"
                  label="ID Number"
                  disabled
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="uid"
                  label="First Name"
                  disabled
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  disabled
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  id="outlined-controlled"
                  type='date'
                  label="Age"
                  disabled
                  value={dob}
                /><br />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              Gender
                <Select
                  labelId="select-label"
                  required
                  id="gender-select"
                  label="Health status"
                  disabled
                  value={gender}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select><br />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  // name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  required
                  fullWidth
                  type='Phone'
                  id="contactNo"
                  label="Contact No"
                  // name="contactNo"
                  value={contactNo}
                  inputProps={{ maxLength: 10 }}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} mt={2} >
              <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  // name="email"
                  autoComplete="email"
                  value={email}
                  disabled
                />
              </Grid>
              <Button onClick={handleUpdate}>Update Profile</Button>


            </div>
          </Paper>
        </Grid>
        {/* )} */}
      </Grid>
    </Container>

  );
  
}

export default UpdateProfile;
