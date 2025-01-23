import React, { useState, useEffect, useMemo } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
// import {GridToolbar} from '@mui/material/GridToolbar'
import { GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container, Table } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from '../navbar/navbar';
import { Results, FilterResultByDoctor,FilterResultByDoctorAppo } from '../../../action/action';
import moment from 'moment';
moment().format();


export const Appointement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false)
  const [pageSize, setPageSize] = useState([5])
  const userRole = localStorage.getItem(('role'))
  const current = new Date()
  const currentDate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;

  useEffect(() => {
    dispatch(FilterResultByDoctorAppo())
  }, [])


  const FilterAppo = useSelector(state => state.rootResultFilterByDoctorAppo.caseResult);
  const filterRows = useMemo(() => FilterAppo.map((row, index) => ({ ...row, id: row.transactionId })),
    [FilterAppo]
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
    { field: 'gender', headerName: 'Gender', type: 'text', width: 110 },
    { field: 'checkedDate', headerName: 'Last Checked', type: 'Date', width: 110 },
    { field: 'appointementDate', headerName: 'Appointement Date', type: 'Date', width: 120,
    // valueGetter: ( params ) => `${params.row.appointementDate}` > currentDate,
  },
    { field: "Action", headerName: 'Action', width: 160,
      //////////////////////////////
      renderCell: (params) => {
        const update = (e) => {
          const currentRow = params.row;
          const i = currentRow.uid;
          const transID = currentRow.transactionId;
          // localStorage.removeItem("transId");
          localStorage.removeItem("PID");
          localStorage.setItem("PID", i);
          localStorage.setItem("transacId", transID)
          const tid = localStorage.getItem("transacId")
          const getId = localStorage.getItem("PID")
          navigate(`/appointement/find/${tid}`)
          // return alert(JSON.stringify(currentRow.caseDescription, null, 4));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button  color="warning" size="small" onClick={update}>Update Case</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
          </Stack>
        );
      },    
      //////////////////////////////////
      width: 160,
    },
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
export default Appointement;