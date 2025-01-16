import React, { useState, useEffect, useMemo } from 'react'
import Login from '../../login'
import api from '../../api/api'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Patients } from '../../../action/action';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import RemoveCookie from '../../hooks/removeCookie';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container,Table } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'address', headerName: 'Address', type: 'text', width: 140 },
  { field: 'email', headerName: 'Email', type: 'text', width: 150 },
  { field: 'dob', headerName: 'Birth Date', type: 'number', width: 90 },
  {
    renderCell: (params) => {
      const onClick = (e) => {
        const currentRow = params.row;
        return alert(JSON.stringify(currentRow, null, 4));
      };
      return (
        <Stack direction="row" spacing={4}>
          <Button  color="warning" size="small" onClick={onClick}>View</Button>
          <Button color="error" size="small" onClick={onClick}>Delete</Button>
        </Stack>
      );
    }
    ,width:160}
];


export default function DataTable() {
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(Patients())
},[])
    const pp = useSelector(state => state.rootPatientList.patients)
    const rows = useMemo(
      () => pp.map((row, index) => ({ ...row, id: row.uid })),
      [pp]
    );
  

  return (
    <Container>
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
    </Container>
  );
}