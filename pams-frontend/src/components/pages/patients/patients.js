import React, { useState, useEffect,useMemo } from 'react'
import Login from '../../login'
import api from '../../api/api'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Patients } from '../../../action/action';
import {FilterPatientByStatus} from '../../../action/action'
import {FilterPatientById} from '../../../action/action'
import { useNavigate, useParams } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container,Table } from '@mui/material';
// import DataTable from 'react-data-table-component'
// import SinglePatient from '../../pages/patients/singlePatient';
import { GridToolbar } from '@mui/x-data-grid';

import AddResult from '../result/addResult';
import GetCookie from '../../hooks/getCookie';
import RemoveCookie from '../../hooks/removeCookie';
import Navbar from '../navbar/navbar'

const PatientsListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const params = useParams()
  const [logout, setLogout] = useState(false)

  /******  Check login **********************/
  const userRole = localStorage.getItem('role')
  const userCookie = GetCookie('user')
  const userId = localStorage.getItem('UID')
  const patientId = localStorage.getItem('PID')

  useEffect(() => {
    dispatch(FilterPatientByStatus())
  },[])
  
  useEffect(() => {
    if ((!userRole || !userCookie || !userId || userRole !== "doctor")) {
      localStorage.removeItem('role');
      localStorage.removeItem('UID');
      localStorage.removeItem('PID');
      RemoveCookie('user')
      alert('Unauthorized access')
      navigate('/login')
    }
    else{
      localStorage.removeItem("pstatus");
      localStorage.setItem("pstatus", 'new');
    }
  }, [])
  
    const pp = useSelector(state => state.rootPatientListByStatus.patients)
    const rows = useMemo(() => pp.map((row, index) => ({ ...row, id: row.uid })),
          [pp]
        );
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter .',
      sortable: false,
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'address', headerName: 'Address', type: 'text', width: 140 },
    { field: 'email', headerName: 'Email', type: 'text', width: 150 },
    { field: 'dob', headerName: 'Birth Date', type: 'number', width: 90 },
    {field:"Action", headerName: 'Action', width:160,
    renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          const i = currentRow.uid;
          localStorage.removeItem("PID")
          localStorage.setItem("PID", i);
          // localStorage.setItem("TID")
          // const tid = localStorage.getItem("TID")
          navigate(`/patient/find/${i}`)//goto addResult component by caching id
          // return alert(JSON.stringify(currentRow, null, 4));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button  color="warning" size="small" onClick={onClick}>Add Result</Button>
          </Stack>
        );
      },width: 160,}
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pagination
        components={{ Toolbar: GridToolbar }}
        />
    </div>
    </Container>
  );
}
export default PatientsListPage;
