import React, { useEffect, useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { Employees } from '../../../action/action';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../logout'
import Cookies from 'js-cookie';
import RemoveCookie from '../../hooks/removeCookie';
import GetCookie from '../../hooks/getCookie';
// import DrawerAppBar from '../header';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import { Button, Container, Table } from '@mui/material';
import Navbar from '../navbar/navbar';

export const EmployeesListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userRole = localStorage.getItem(('role'))

  useEffect(() => {
    if (userRole !== "admin") {
      alert('you are not allowd to access')
      localStorage.removeItem('role')
      RemoveCookie('user')
      navigate('/login')
    }
  })

  useEffect(() => {
      dispatch(Employees())
  }, [Employees])


  const emp = useSelector(state => state.rootEmployeeList.employees)
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
    { field: 'email', headerName: 'Email', type: 'text', width: 150 },
    { field: 'contactNo', headerName: 'Tel No', type: 'text', width: 150 },
    { field: 'departement', headerName: 'Departement', type: 'text', width: 100 },
    { field: 'role', headerName: 'Role', type: 'text', width: 100 },
    // { field: 'experienceYear', headerName: 'Experience', type: 'text', width: 80 },
    {field:"Action", headerName: 'Action', width:160,
    renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          const i = currentRow.uid;
          const id = parseInt(i)
          localStorage.removeItem("EID")
          localStorage.setItem("EID", id); 
          navigate(`/employee/find/${id}`)
          // return alert(JSON.stringify(currentRow, null, 4));
        };
        return (
          <Stack direction="row" spacing={4}>
            <Button  color="warning" size="small" onClick={onClick}>View</Button>
            {/* <Button color="error" size="small" onClick={onClick}>Delete</Button> */}
          </Stack>
        );
      },width: 160,}
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Navbar />
    <div style={{ height: 500, width: '100%' }}>
      <h2>Employees List</h2>
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
export default EmployeesListPage;
