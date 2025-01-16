import React, { useState, useEffect, useMemo, useRef } from 'react'
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
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { TextareaAutosize } from '@mui/base';
import Navbar from '../navbar/navbar'
import { List } from '@mui/material';
import moment from 'moment';
moment().format();

export const AddResult = () => {
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();

  const [patient, setPatient] = useState({});
  const drId = localStorage.getItem('UID');
  const PID = localStorage.getItem('PID')
  const transacId = localStorage.getItem("transacId")
  const current = new Date()
  const currentdate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

  // console.log(drId)
  const [id, setId] = useState(PID);
  const [transactionId, setTransactionId] = useState('');
  const [uid, setUid] = useState(drId);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [status, setStatus] = useState('');
  const [doctorId, setDoctorId] = useState(drId);
  const [healthStatus, setHealthStatus] = useState('')
  const [caseDescription, setCaseDescription] = useState('');
  const [checkedDate, setCheckedDate] = useState('');
  const [appointementDate, setAppointementDate] = useState('');

  const pp = useSelector(state => state.rootPatientList.patients)

  const rows = useMemo(() => pp.map((row, index) => ({ ...row, id: row.uid })));
  useEffect(() => {
    const searchPatient = async () => {
      if (localStorage.getItem("PID") !== null) {
        const I = localStorage.getItem("PID")
        // const ID = parseInt(I)
        try {
          const data1 = await api.get(`/patient/find/${I}`)

          setUid(data1.data.id)
          setPatient(data1)
          setTransactionId(data1.data.transactionId)
          setStatus(data1.data.status)
          setFirstName(data1.data.firstName)
          setLastName(data1.data.LastName)
          setEmail(data1.data.email)
          setGender(data1.data.gender)
          setAddress(data1.data.address)
          setContactNo(data1.data.contactNo)
          setDob(data1.data.dob)
          setCaseDescription(data1.data.caseDescription)
          setHealthStatus(data1.data.healthStatus)
          setDoctorId(drId)
          setCheckedDate(currentdate)
          // setAppointementDate(data1.data.appointementDate)
        } catch (error) {
          setError(error.response?.data?.message);
        }
      };
    }
    searchPatient();
  }, []);

  const handleUpdate = (e) => {
    const data2 = {
      id: id,
      uid: uid,
      transactionId: transactionId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      contactNo: contactNo,
      status: status,
      doctorId: doctorId,
      healthStatus: healthStatus,
      caseDescription: caseDescription,
      checkedDate: checkedDate,
      appointementDate: appointementDate
    }


    const appDate = new Date(appointementDate)
    const cheDate = new Date(checkedDate)

    //check if patient is appointed to the future date.
    if (appDate >= cheDate || appDate !== null) {
      if (appDate <= cheDate) {
        alert('Appointement date must be in the futurerr')
        navigate(`/result/find/${transactionId}`)
      } else {
        api.post(`/result/add`, data2, data2.status = "onAppointement")
        api.post(`/patient/update/status/${PID}`, data2, data2.status = "Viewed")
        api.post('/appointement/add', data2, data2.status = "onAppointement")
        .then((res) => (dispatch(setSearchResults())))
        .catch(err => console.log(err))
      }

    } else {
      api.post(`/appointement/update/status/${PID}`, data2.status = "completed")
      api.post(`/patient/update/status/${PID}`, data2, data2.status = "Viewed")
      api.post(`/result/add`, data2, data2.status = "completed")
        .then((res) =>  (dispatch(setSearchResults())))
        .catch(err => console.log(err))
    }
    navigate('/result')
  }

  const theme = createTheme();
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} mt={2} >
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '300',
              width: '100%',
              border: 2,
              alignItems: 'center',
            }}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
              }}
              noValidate
              autoComplete="off"
            ><br />

              <Select
                labelId="select-label"
                id="status-select"
                value={healthStatus}
                label="Health status"
                onChange={e => setHealthStatus(e.target.value)}
              >
                <MenuItem value={'HIV'}>HIV</MenuItem>
                <MenuItem value={'Blood Check'}>Blood Check</MenuItem>
                <MenuItem value={'Covid 19'}>Covid 19</MenuItem>
              </Select><br />
              <TextareaAutosize
                id="outlined-controlled"
                label="Description"
                placeholder='Case description'
                width='3px'
                value={caseDescription}
                onChange={(e) => {
                  setCaseDescription(e.target.value);
                }}
              /><br />
              <br />
              <TextField
                id="outlined-controlled"
                type='date'
                label="Appointement Date"
                value={appointementDate}
                onChange={(e) => {
                  setAppointementDate(e.target.value);
                }}
              /><br />

            </Box>
            <Button onClick={handleUpdate}>Update Result</Button>
          </Paper>
        </Grid>
        {/* )} */}
      </Grid>
    </Container>
  );
}
export default AddResult;