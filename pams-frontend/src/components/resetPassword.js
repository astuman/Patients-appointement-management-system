import React, { useState } from 'react';
import api from '../components/api/api'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export const Resetpassword = () => {
  const navigate = useNavigate()
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('')
  const [verification, setVerification] = useState('');

  const handleSubmit = () => {
    const datas = {
      uid: uid,
      email: email,
      password: password
    }
      if (password !== cpassword) {
        alert("different passwords")
      } else if (email == null || verification == null || password == null || cpassword == null) {
        alert("all fields are required")
        navigate('#')
      } else {
      try {
        api.post('/resetpassword', (datas))
        .then(res =>{
          alert("success")
          navigate('/')
                 })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          maxWidth: 550,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 0.5,
          borderRadius: 5,
          maskPosition: 2
        }}
      >
        <Typography component="h1" variant="h5" >
          Reset password
        </Typography>
        <Box maxWidth={300}>
          <TextField
            margin="normal"
            required="true"
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
            id="uid"
            label="Verification code"
            name="uid"
            autoComplete='off'
            type='text'
            onChange={(e) => setUid(e.target.value)}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            onChange={(e) => setCpassword(e.target.value)}
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Reset Passowrd
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Resetpassword
