import React, { useState, useEffect, useMemo } from 'react'
import api from '../../api/api'
import { useDispatch, useSelector } from "react-redux";
// import { Results, Patients, FilterPatient } from '../../../action/action';
// import { Table, Input, Form } from 'semantic-ui-react'
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
// import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base';



import Navbar from '../navbar/navbar'
// import { List } from '@mui/material';

export const AddMoreResult = () => {
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
  const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


  // console.log(da)
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

  const result = useSelector(state => state.rootResultFilterByUpdated.caseResult)

    result.map((row, index) => {
      const id = row.uid
      console.log(id)
    })


  useEffect(() => {
    const searchPatient = async () => {
      if (localStorage.getItem("PID") !== null) {
        const tid = localStorage.getItem("transacId")
        try {
          const datas = await api.get(`/appointement/find/${tid}`)
          setUid(datas.data.uid)
          setTransactionId(datas.data.transactionId)
          setPatient(datas)
          setStatus(datas.data.status)
          setFirstName(datas.data.firstName)
          setLastName(datas.data.LastName)
          setEmail(datas.data.email)
          setGender(datas.data.gender)
          setAddress(datas.data.address)
          setContactNo(datas.data.contactNo)
          setDob(datas.data.dob)
          setCaseDescription(datas.data.caseDescription)
          setHealthStatus(datas.data.healthStatus)
          setDoctorId(drId)
          setCheckedDate(currentDate)
        } catch (error) {
          setError(error.response?.data?.message);
        }
      };
    }
    searchPatient();
    
  }, []);

  

  
  const handleUpdate = (e) => {
    const datas = {
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

    if (appDate !== null) {
      if (cheDate >= appDate) {
        alert('Appointement date must be in the future')
        navigate(`/result/find/${transactionId}`)
        // console.log(checkedDate)
      } else {

        try {
          // api.post('/appointement/add', datas)
          api.post(`/result/add`, datas, datas.status = "onAppointement")
          // .then((res) => (dispatch(setSearchResults())))
          api.post(`/appointement/update/status/${PID}`, datas, datas.status = "onAppointement")
          localStorage.removeItem("transacId")
          // .then((res) => res.status ? (dispatch(setSearchResults())) : "")
          // .catch(err => console.log(err))
          alert("Update result success")
          navigate('/result')
        } catch (error) {
          console.log("update patient Error" + error)
        }
      }
    } else {

      // .then((res) => res.status ? (dispatch(setSearchResults())) : "")
      try {
        api.post(`/result/add`, datas, datas.status = 'completed')
        api.post(`/appointement/update/status/${PID}`, handleUpdate, handleUpdate.status = "completed")
        // .then((res) => res.status ? (dispatch(setSearchResults())) : "")
          .catch(err => console.log(err))
        alert("Update result success")
        navigate('/result')
      } catch (error) {
        console.log("update patient Error" + error)
      }
    }
  }


  // const dateInputRef = useRef(null);

  const theme = createTheme();
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <Grid container spacing={3}>
        {/* {pp.map((e, i) => */}
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
              <TextField
                id="outlined-controlled"
                type='date'
                label="Appointement Date"
                format='YY-MM-DD'
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
export default AddMoreResult;