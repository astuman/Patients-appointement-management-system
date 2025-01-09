import React, { useEffect,useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api'
import { useDispatch, useSelector } from "react-redux";
import { Users, FilterUserByStatus } from '../../../action/action';
import { useNavigate } from 'react-router-dom';
import RemoveCookie from '../../hooks/removeCookie';
// import DrawerAppBar from '../header';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container } from '@mui/material';
import Navbar from '../navbar/navbar';

export const BlockedUsers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userRole = localStorage.getItem(('role'))

  useEffect(() => {
    if (userRole !== "admin") {
      localStorage.removeItem('role')
      RemoveCookie('user')
      navigate('/login')
    }
  })

  React.useEffect(() => {
    dispatch(FilterUserByStatus())
  }, [FilterUserByStatus])



  const blockedUs = useSelector(state => state.rootUserFilterByStatus.user)
  const userRows = useMemo(() => blockedUs.map((row, index) => ({ ...row, id: row.uid })),
    [blockedUs]
  );
  // console.log(rows)
  // const a = pp.count({role:'doctor'})

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'email', headerName: 'Email', type: 'text', width: 150 },
    { field: 'role', headerName: 'Role', type: 'text', width: 100 },
    { field: 'accountStatus', headerName: 'Status', type: 'text', width: 100 },
    {
      field: "Action", headerName: 'Action', width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          const status = currentRow.accountStatus
          const i = currentRow.uid;
          const id = parseInt(i)
          localStorage.removeItem("EID")
          localStorage.setItem("EID", id);
          if (currentRow.role !== 'admin') {
            if (status === 'not_verified') {
              api.put(`/user/blockaccount/${id}`, { accountStatus: "active" })
                .then((res) => res.status ? (dispatch(FilterUserByStatus())) : "")
            } else if (status === 'blocked') {
              api.put(`/user/reactiveaccount/${id}`, { accountStatus: "active" })
                .then((res) => res.status ? (dispatch(FilterUserByStatus())) : "")

            } else if (status === 'verified') {
              api.put(`/user/reactiveaccount/${id}`, { accountStatus: "active" })
                .then((res) => res.status ? (dispatch(FilterUserByStatus())) : "")
            }
            else if (status === 'active') {
              api.put(`/user/reactiveaccount/${id}`, { accountStatus: "blocked" })
                .then((res) => res.status ? (dispatch(FilterUserByStatus())) : "")
            }
            else {
              api.put(`/user/reactiveaccount/${id}`, { accountStatus: 'active' })
                .then((res) => res.status ? (dispatch(Users())) : "")
            }
          }

        };
        return (
          <Stack direction="row" spacing={4}>
            <Button color="warning" size="small" onClick={onClick}>Action</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
          </Stack>
        );
      }, width: 160,
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
      <div style={{ height: 500, width: '100%' }}>
        <h3>User Accounts List</h3>
        <DataGrid
          rows={userRows}
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
export default BlockedUsers;
