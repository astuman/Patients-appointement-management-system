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
import { GridToolbar } from '@mui/x-data-grid';

import Navbar from '../navbar/navbar';
import { Results,FilterResultByDoctor } from '../../../action/action';


export const ResultListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false)
  const userRole = localStorage.getItem(('role'))

  useEffect(() => {
    dispatch(FilterResultByDoctor())
  }, [])
  

  
  // const re = useSelector(state => state.rootResultList.result);
  const filterByDoctor = useSelector(state => state.rootResultFilterByDoctor.caseResult);
  const filterRows = useMemo(() => filterByDoctor.map((row, index) => ({ ...row, id: row.transactionId})),
      [filterByDoctor]
    );


const columns = [
  { field: 'id', headerName: 'Order ID', width: 50 },
  { field: 'uid', headerName: 'Patient ID', width: 80 },
  { field: 'doctorId', headerName: 'Doctor ID', width: 50 },
  { field: 'fullName',
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
  {field:"Vew", headerName: 'Detail', width:80,
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
          <Button  color="warning" size="small" onClick={view}>View Detail</Button>
          {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
        </Stack>
      );
    },    
    width: 160,}
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
      components={{ Toolbar: GridToolbar }}
      />
  </div>
  </Container>
);
}
export default ResultListPage;
