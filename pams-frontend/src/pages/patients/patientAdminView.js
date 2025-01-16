import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Patients } from '../../../action/action';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Container} from '@mui/material';
// import DataTable from 'react-data-table-component'
import GetCookie from '../../hooks/getCookie';
import RemoveCookie from '../../hooks/removeCookie';
import Navbar from '../navbar/navbar'

export const PatientAdminView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    /******  Check login **********************/
    const userRole = localStorage.getItem('role')
    const userCookie = GetCookie('user')
    const userId = localStorage.getItem('UID')

    useEffect(() => {
        if ((!userRole || !userCookie || !userId || userRole !== "admin")) {
            localStorage.removeItem('role');
            localStorage.removeItem('UID');
            localStorage.removeItem('PID');
            RemoveCookie('user')
            alert('Unauthorized access')
            navigate('/login')
        }
        else {
            localStorage.removeItem("pstatus");
            localStorage.setItem("pstatus", 'new');
            dispatch(Patients())

        }
    }, [])


    const pp = useSelector(state => state.rootPatientList.patients)
    const rows = useMemo(() => pp.map((row, index) => ({ ...row, id: row.uid })),
        [pp]
    );
    console.log(rows)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter .',
            sortable: false,
            width: 180,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'address', headerName: 'Address', type: 'text', width: 140 },
        { field: 'email', headerName: 'Email', type: 'text', width: 150 },
        { field: 'dob', headerName: 'Age', type: 'number', width: 90 },
        { field: 'createdAt', headerName: 'Registered At', type: 'Date', width: 110 },
        { field: 'updatedAt', headerName: 'Updated At', type: 'Date', width: 110 },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Navbar />
            <div style={{ height: 500, width: '100%' }}>
                <h3>Patients List</h3>
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
export default PatientAdminView;
