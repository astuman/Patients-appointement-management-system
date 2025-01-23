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
    //  const user = api.get(`employee/find/${email}`)
    //   if(!(user)){
    //     alert("Invalid Email")
    //   }else{
    const u = parseInt(uid)

    if (password !== cpassword) {
      alert("different passwords")
    } else if (email === "" || uid === "" || password === "" || cpassword === "") {
      alert("all fields are required")
      navigate('#')
    } else {
      try {
        const user = api.get(`/employee/find/${u}`)
          .then((res) => {
            if (user !== null) {
              const e = res.data.email
              const id = res.data.uid
              if (e !== email) {
                alert("Invalid Email")
              } else {
                api.post('/resetpassword', (datas))
                  .then(res => {
                    alert("success")
                    navigate('/login')
                  })
              }
            } if (res.status === 404) {
              api.get(`/employee/find/${email}`)
                .then((res) => {
                  const id = res.data.uid
                  if (id !== uid) {
                    alert("Invalid ID")
                  } else {
                    api.post('/resetpassword', (datas))
                      .then(res => {
                        alert("success")
                        navigate('/login')
                      })
                  }

                })
            }
          })

        // if (!(user)) {
        //   api.get(`/employee/find/${email}`)
        //     .then((res) => {
        //       const id = res.data.uid
        //       if (id !== uid) {
        //         alert("Invalid ID")
        //       } else {
        //         api.post('/resetpassword', (datas))
        //           .then(res => {
        //             alert("success")
        //             navigate('/login')
        //           })
        //       }

        //     })

        // }

      } catch (err) {
        console.log(err)
      }
    }
  }
  const Home = () => {
    navigate('/')
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
            autoFocus
            onChange={(e) => setEmail(e.target.value)}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="uid"
            label="Verification code"
            name="uid"
            autoComplete='off'
            type='Number'
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
          </Button >
          <Button color='primary'
            bgcolor='White'
            fullWidth
            variant="contained"
            on onClick={Home}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Resetpassword
