import React, { useState, useEffect, useMemo } from 'react'
// import Login from '../../login'
import api from '../../api/api'
// import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Results, Patients, FilterPatient } from '../../../action/action';
// import { Table, Input, Form } from 'semantic-ui-react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { Logout } from '../../logout'
// import Cookies from 'js-cookie';
// import RemoveCookie from '../../hooks/removeCookie';

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { TextArea } from 'semantic-ui-react';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { getRenderableIndexes } from '@mui/x-data-grid/internals';
import Navbar from '../navbar/navbar'
import { FilterEmployee } from '../../../action/action';
import { Input } from '@mui/material';

export const ViewSingleEmployee = () => {
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(() =>{
  dispatch(FilterEmployee())
 },[]);

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("uid");
  const { slug } = useParams();
  const [search, setSearch] = useState("");

  const [employee, setEmployee] = useState({});
  // const drId = localStorage.getItem('UID');
  // console.log(drId)
  const [uid, setUid] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [experienceYear, seExperienceYear] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [dob, setDob] = useState('');
  // const [doctorId, setDoctorId] = useState(drId);


  const theme = createTheme();

  const emp = useSelector(state => state.rootEmployeeFilter.filter)
  const rows = useMemo(() => emp.map((row, index) => ({ ...row, id: row.uid })),
    [emp]
  );
  // console.log(rows)
  // const a = pp.count({role:'doctor'})

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter .',
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    // { field: 'address', headerName: 'Address', type: 'text', width: 140 },
    { field: 'email', headerName: 'Email', type: 'text', width: 150, Input },
    { field: 'contactNo', headerName: 'Tel No', type: 'text', width: 110 },
    { field: 'departement', headerName: 'Departement', type: 'text', width: 110},
    { field: 'role', headerName: 'Role', type: 'text', width: 100 },
    { field: 'experienceYear', headerName: 'Experience', type: 'text', width: 40 },

    { field: 'gender', headerName: 'Gender', type: 'text', width: 60 },
    { field: 'dob', headerName: 'Age(DoB)', type: 'text', width: 100 },

    // {field:"Action", headerName: 'Action', width:160,
    // renderCell: (params) => {
    //     const onClick = (e) => {
    //       const currentRow = params.row;
    //       const i = currentRow.uid;
    //       const id = parseInt(i)
    //       localStorage.removeItem("EID")
    //       localStorage.setItem("EID", id); 
    //       navigate(`/employee/find/${id}`)
    //       // return alert(JSON.stringify(currentRow, null, 4));
    //     };
        // return (
        //   <Stack direction="row" spacing={4}>
        //     <Button  color="warning" size="small" onClick={onClick}>View</Button>
        //     {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
        //   </Stack>
        // );
      // },width: 160,}
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
    <div style={{ height: 500, width: '100%' }}>
      <h2>About Doctor's Information</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pagination
        // checkboxSelection
      />
    </div>
    </Container>
  );
}



export default ViewSingleEmployee;