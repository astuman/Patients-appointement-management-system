import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button'
import Navbar from '../navbar/navbar'
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { Employees, Patients, Users } from '../../../action/action';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/astuman">
        Astewul Alemu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
//50

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Employees())
  }, [])
  useEffect(() => {
    dispatch(Users())
  }, [])

  useEffect(() => {
    dispatch(Patients())
  }, [])

  const addStaff = () => {
    // console.log("clicked")
    navigate('/employee/register')
  }
  const gotoEmployeesList = () => {
    navigate('/employee')
  }
  const gotoAccounts = () => {
    navigate('/user')
  }
  const gotoPatientList = () => {
    navigate('/patientadminview')
  }


  const emp = useSelector(state => state.rootEmployeeList.employees)
  const user = useSelector(state => state.rootUserList.user)
  const patient = useSelector(state => state.rootPatientList.patients)
  const empRows = useMemo(() => emp.map((row, index) => ({ ...row, id: row.uid })), [emp]);
  const userRows = useMemo(() => user.map((row, index) => ({ ...row, id: row.uid })), [user]);
  const patientRows = useMemo(() => patient.map((row, index) => ({ ...row, id: row.uid })), [user]);


  let countEmployees = 0;
  for (let i = 0; i < empRows.length; i++) {
    if (empRows[i].id) countEmployees++;
  }

  let countUsers = 0;
  for (let i = 0; i < userRows.length; i++) {
    if (userRows[i].id) countUsers++;
  }
  let notVerifiedUsers = 0;
  for (let i = 0; i < userRows.length; i++) {
    if (userRows[i].accountStatus === 'not_verified') notVerifiedUsers++;
  }


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Navbar />
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '40px' }} onClick={gotoEmployeesList}>Employees</span>
                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '20px' }}><br />
                    <Badge badgeContent={empRows.length} color="error" />
                  </span>
                  <Button onClick={addStaff}>Add Employee</Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >

                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '40px' }} onClick={gotoAccounts}>Accounts</span>
                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '20px' }}><br />
                    <Badge badgeContent={userRows.length} color="error" />
                  </span>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '40px' }} onClick={gotoPatientList}>Patients</span>
                  <span style={{ alignItems: 'center', textAlign: 'center', fontSize: '20px' }}><br />
                    <Badge badgeContent={patientRows.length} color="error">
                    </Badge>
                  </span>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box >
    </ThemeProvider >
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}