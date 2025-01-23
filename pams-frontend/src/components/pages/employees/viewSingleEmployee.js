import React, { useState, useEffect, useMemo } from 'react'
// import Login from '../../login'
import api from '../../api/api'
// import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Results, Patients, FilterPatient,FilterEmployee } from '../../../action/action';
// import { Table, Input, Form } from 'semantic-ui-react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// import TextField from '@mui/material/TextField';

// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from '../navbar/navbar'
import { Input } from '@mui/material';

export const ViewSingleEmployee = () => {
  // console.log(localStorage.getItem("UID"))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FilterEmployee())
}, [FilterEmployee])
const emp = useSelector(state => state.rootEmployeeFilter.filterEmp)
const rows = useMemo(() => emp.map((row, index) => ({...row, id: row.uid })),
  [emp]
);

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
  { field: 'email', headerName: 'Email', type: 'text', width: 150 },
  { field: 'contactNo', headerName: 'Tel No', type: 'text', width: 150 },
  { field: 'departement', headerName: 'Departement', type: 'text', width: 100 },
  { field: 'role', headerName: 'Role', type: 'text', width: 100 }
];

return (
  <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
    <Navbar />
  <div style={{ height: 500, width: '100%' }}>
    <h2>Doctor's Information</h2>
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