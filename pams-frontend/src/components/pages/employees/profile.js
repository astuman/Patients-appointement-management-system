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
  const u = localStorage.getItem('UID');
  const uid = parseInt(u);


  const [searchProfile, setSearchProfile] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  // const query = new URLSearchParams(location.search).get("uid");
  // console.log(drId)
  const [ui, setUid] = useState(uid);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [status, setStatus] = useState('');
  // const Inputuid = parseInt(uid)
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(FilterEmployee())
  }, []);

  const emp = useSelector(state => state.rootEmployeeFilter.filter)
  const rows = useMemo(() => emp.map((row, index) => ({ ...row, id: row.uid })),
    [emp]
  );

  


  useEffect(() => {
    const searchProfile = async () => {
      if (uid == null) {
        alert(("please login first"))
        navigate('/login')

      } else {
        try {
          const datas = await api.get(`/employee/find/${uid}`)
          setUid(datas.data.uid)
          setFirstName(datas.data.firstName)
          setLastName(datas.data.lastName)
          setEmail(datas.data.email)
          setGender(datas.data.gender)
          setAddress(datas.data.address)
          setContactNo(datas.data.contactNo)
          setDob(datas.data.dob)
          console.log(uid)

        } catch (error) {
          setError(error.response?.data?.message);
        }

      };

    }

    searchProfile();
  }, []);



  const handleUpdate = (e) => {
    
    const datas = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob,
      address: address,
      contactNo: contactNo,
    }
 
    api.put(`/employee/update/${uid}`, datas)
      .then((res) => res.status == 200 ? (dispatch(setSearchProfile())) : "")
      .catch(err => console.log(err))
    alert("Update profile success")
    // navigate(`/result/patient/${uid}`)

  }

  const theme = createTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} mt={1} >
          <Paper
            sx={{
              mt: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '300',
              width: '100%',
              border: 2,
              alignItems: 'center',
            }}>
            {emp.map((emp, index) => {
              return (
                <div key={index}>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      readOnly
                      required
                      fullWidth
                      id="uid"
                      label="First Name"
                      value={emp.uid}
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
                      value={emp.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Last Name"
                      value={emp.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Email"
                      value={emp.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Gender"
                      value={emp.gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Address"
                      value={emp.address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Contact No."
                      value={emp.contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} mt={2} >
                    <TextField
                      autoComplete="given-name"
                      // name="firstName"
                      required
                      fullWidth
                      id="uid"
                      label="Birth Date"
                      value={emp.dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </Grid>
                </div>
              )
            })}
            <Button onClick={handleUpdate}>Update Profile</Button>

          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
}


export default UpdateProfile;