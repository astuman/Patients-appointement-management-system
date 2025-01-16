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
import Navbar from '../navbar/navbar'


export const UpdateAccount = () => {
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchAccount, setSearchAccount] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("uid");
  const storageID = localStorage.getItem('UID');
  // console.log(drId)
  const [uid, setUid] =useState(storageID)
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [createdAt, setCreatedAt] = useState('');


  useEffect(() => {
    const searchAccount = async () => {
      if (localStorage.getItem("UID") !== null) {
        try {
          const datas = await api.get(`/user/find/${uid}`)
          setUid(datas.data.uid)
          setPassword('')
          setEmail(datas.data.email)
          setRole(datas.data.role)
          setCreatedAt(datas.data.createdAt)
        } catch (error) {
          setError(error.response?.data?.message);
        }
      }else{
        alert('please login first')
        navigate('/')
      }
    }
    searchAccount();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault()
    if(password !== cpassword){
      alert('Confirm Password password missmatch')
    }else{
    api.put(`/user/update/${uid}`, {password: password})
    alert("Password Changed")
   if(localStorage.getItem("role") === 'admin'){
    navigate('/dashboard')
   }else if(localStorage.getItem('role') === 'doctor'){
    navigate('/patient')
   }else{
    navigate(`/result/patient/${uid}`)
   }}
  }

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
              width:'100%',
              border:2,
              alignItems:'center',
            }}>
            <div > 
              <Grid>
                <p>Your User ID:&nbsp;&nbsp;&nbsp;{uid}</p>
                Email: <Input type='text' disabled value={email} onChange={(e) => setEmail(email)} /><br />
                Passowrd: <Input required type='password' value={password || setPassword} onChange={(e) => setPassword(e.target.value)} /><br />
                Confirm Passowrd: <Input required type='password' value={cpassword || setPassword} onChange={(e) => setCpassword(e.target.value)} /><br />
                Role: <Input type='text' disabled readOnly value={role || setRole} onChange={(e) => setRole(role)} /><br />
                Created at.: <Input type='date' disabled value={createdAt} onChange={(e) => setCreatedAt(createdAt)} /><br />
                <Button onClick={handleUpdate}>Update Password</Button>
              </Grid>
            </div>
          </Paper>
        </Grid>
        {/* )} */}
      </Grid>
    </Container>

  );

}
export default UpdateAccount;