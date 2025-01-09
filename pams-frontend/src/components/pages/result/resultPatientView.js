import React, { useState, useEffect } from 'react'
import {useMemo} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
// import { Stack } from '@mui/system';
import { Button, Container, Table } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from '../navbar/navbar';
import { Results, FilterResultByDoctor, FilterResultByPatient } from '../../../action/action';
// import PropTypes from 'prop-types';
// import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';

// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



  export const ResultPatientView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false)
  const userRole = localStorage.getItem(('role'))
  const uid = localStorage.getItem('UID')
  if(uid == null)
  {
    alert("Please login first")
    navigate('/login')
  }
  useEffect(() => {
    dispatch(FilterResultByPatient())
  }, [])


  const patient = useSelector(state => state.rootResultFilterByPatient.caseResult)
  const patientRows = useMemo(() =>patient.map((row, index) =>({...row, id:row.transactionId})), [patient])


  // function MyCustomDialog({ payload, open, onClose }) {
  //   return (
  //     <Dialog fullWidth open={open} onClose={() => onClose()}>
  //       <DialogTitle>Dialog with payload</DialogTitle>
  //       <DialogContent>The payload is &quot;{payload}&quot;</DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => onClose()}>Close me</Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
  // }






  const columns = [
    { field: 'id', headerName: 'Order ID', width: 50 },
    { field: 'uid', headerName: 'Patient ID', width: 80 },
    { field: 'doctorId', headerName: 'Doctor ID', width: 50 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter .',
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'healthStatus', headerName: 'Case', type: 'text', width: 140 },
    // { field: 'gender', headerName: 'Gender', type: 'text', width: 110 },
    { field: 'checkedDate', headerName: 'Checked Date', type: 'number', width: 140 },
    {
      field: "View", headerName: 'View case', width: 110,
      renderCell: (params) => {
        const view = (e) => {
          const currentRow = params.row;
          // const i = currentRow.uid;
          // const id = parseInt(i)
          // localStorage.setItem("PID", id);
          // navigate(`/patients/find/${id}`)
          return alert(JSON.stringify(currentRow.caseDescription, null, 4));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button color="warning" size="small" onClick={view}>View Detail</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
          </Stack>
        );
      },
      width: 160,
    },
    {
      field: "Action", headerName: 'View Doctor', width: 160,
      renderCell: (params) => {
        const update = (e) => {
          const currentRow = params.row;
          const i = currentRow.doctorId;
          localStorage.removeItem("drId")
          localStorage.setItem("drId", i);
          const getId = localStorage.getItem("drId")
          navigate(`/employee/find/${i}`)
          // return alert(JSON.stringify(currentRow.caseDescription, null, 4));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button color="warning" size="small" onClick={update}>About Doctor</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
          </Stack>
        );
      },
      width: 160,
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={patientRows}
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

export default ResultPatientView;


/***************************************************** 
New PatientView page


import React, { useState, useEffect, useMemo } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container, Table } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from '../navbar/navbar';
import api from '../../api/api';
import { FILTER_RESULT_BY_PATIENT } from './actionTypes'
import { Results, FilterResultByPatient } from './action';
import { FilterPatientByStatus } from '../../../action/action'
import { rootResultFilterByPatient, } from '../../../reducer/rootReducer'


export const ResultPatientView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false)
  const userRole = localStorage.getItem(('role'))
  const uid = localStorage.getItem('UID')

  useEffect(() => {
    if (!uid) {
      alert('please login first')
      navigate('/logout')
    }
  })

  useEffect(() => {
    dispatch(FilterResultByPatient())
  }, [])

  const [tableData, setTableData] = useState([])
  
    useEffect(() => {
      api.get(`/result/patient/${uid}`)
        // .then((data) => data.json())
        .then((data) => setTableData(data.data))
        
  
    }, [])

    
  //  api.get(`/result/patient/${uid}`)
  //   .then((response) => response.data)


const pp = tableData
console.log(tableData)

  // // useEffect(() => {
  // //   dispatch(FilterPatientByStatus())
  // // },[])

  // const pp = useSelector(state => state.rootResultFilterByPatient.caseResult)
  const filterRows = useMemo(() => (tableData.map((row, index) => ({ ...row, id: row.transactionId }))),
    [tableData]
  );

  


  const columns = [
    { field: 'id', headerName: 'Order ID', width: 50 },
    { field: 'uid', headerName: 'Patient ID', width: 80 },
    { field: 'doctorId', headerName: 'Doctor ID', width: 50 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter .',
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'healthStatus', headerName: 'Case', type: 'text', width: 140 },
    // { field: 'gender', headerName: 'Gender', type: 'text', width: 110 },
    { field: 'checkedDate', headerName: 'Last Checked', type: 'Date', width: 100 },
    {
      field: "Vew", headerName: 'Detail', width: 80,
      renderCell: (params) => {
        const view = (e) => {
          const currentRow = params.row;
          // const i = currentRow.uid;
          // const id = parseInt(i)
          // localStorage.setItem("PID", id);
          // navigate(`/patients/find/${id}`)
          return alert(JSON.stringify(currentRow.caseDescription));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button color="warning" size="small" onClick={view}>View Detail</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> 
            </Stack>
          );
        },
        width: 160,
      }
    ];
   
    
     return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Navbar />
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filterRows}
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
  export default ResultPatientView;
  

********************************************************/