import Reac from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Login from './components/login'
// import DataTable from './components/pages/patients/pp';
// import Logout from './components/logout';
// import Signup from './components/signup';
// import PatientAdminView from './components/pages/patients/patientAdminView';
// import EmployeesListPage from './components/pages/employees/employees';
// import PatientsListPage from './components/pages/patients/patients';
// import Dashboard from './components/pages/admin/dashboard';
// import ResultListPage from './components/pages/result/results';
// import AddResult from './components/pages/result/addResult'
// import UsersListPage from './components/pages/users/users';
// import BlockedUsers from './components/pages/users/blockedUsers'
// import UpdateProfile from './components/pages/employees/profile';
// import UpdateAccount from './components/pages/users/userUpdate'
// import SinglePatient from './components/pages/patients/singlePatient';
// import RegisterEmployee from './components/pages/admin/registerEmployee';
// import RegisterStaffAdmin from './components/pages/admin/registerAdmin';
// import Resetpassword from './components/resetpassword';
// import UpdateProfilePatient from './components/pages/patients/profile'
// import ViewSingleEmployee from './components/pages/employees/viewSingleEmployee'
// import AddMoreResult from './components/pages/result/addMoreResult'
// import Appointements from './components/pages/result/appointements'
// import ResultPatientView from './components/pages/result/resultPatientView'


function App() {
  // const [token, setToken] = useState();
  // if(!token) {
  //   return (<Login setToken={setToken} />)
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/logout' element={<Logout />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/pp' element={<DataTable />} />
          <Route path='/employees' element={<EmployeesListPage />} />
          <Route path='/employees/register' element={<RegisterEmployee />} />
          <Route path='/signup/admin' element={<RegisterStaffAdmin />} />
          <Route path='/employees/update/:uid' element={<UpdateProfile />} />
          <Route path='/patientadminview' element={<PatientAdminView />} />
          <Route path='/patientview' element={<SinglePatient />} />
          <Route path='/patients' element={<PatientsListPage />} />
          <Route path='/patients/update/:uid' element={<UpdateProfilePatient />} />
          <Route path='patients/find/:PID' element={<AddResult />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/results/patient/:uid' element={<ResultPatientView />} />
          <Route path='/results' element={<ResultListPage />} />
          <Route path='/appointements' element={<Appointements />} />
          <Route path='results/find/:PID' element={<AddMoreResult />} />

          <Route path='employees/find/:EID' element={<ViewSingleEmployee />} />
          <Route path='/users' element={<UsersListPage />} />
          <Route path='/users/blockedaccounts' element={<BlockedUsers />} />

          <Route path='/users/updateaccount/:uid' element={<UpdateAccount />} />
          <Route path='/resetpassword' element={<Resetpassword />} /> */}

          {/* <Route path='*' element={<div><h1>404 <br />Page not found</h1></div>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
