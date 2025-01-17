import Reac from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Login from './components/login'
// import DataTable from './components/pages/patients/pp';
import Home from './components/pages/Home/Home'
import Logout from './components/logout';
import Signup from './components/signup';
import PatientAdminView from './components/pages/patients/patientAdminView';
import EmployeesListPage from './components/pages/employees/employees';
import PatientsListPage from './components/pages/patients/patients';
import Dashboard from './components/pages/admin/dashboard';
import ResultListPage from './components/pages/result/results';
import AddResult from './components/pages/result/addResult'
import UsersListPage from './components/pages/users/users';
import BlockedUsers from './components/pages/users/blockedUsers'
import UpdateProfile from './components/pages/employees/profile';
import UpdateAccount from './components/pages/users/userUpdate'
import SinglePatient from './components/pages/patients/singlePatient';
import RegisterEmployee from './components/pages/admin/registerEmployee';
import RegisterStaffAdmin from './components/pages/admin/registerAdmin';
import Resetpassword from './components/resetPassword';
import UpdateProfilePatient from './components/pages/patients/profile'
import ViewSingleEmployee from './components/pages/employees/viewSingleEmployee'
import AddMoreResult from './components/pages/result/addMoreResult'
import Appointements from './components/pages/result/appointements'
import ResultPatientView from './components/pages/result/resultPatientView'
import AppointementPatientView from './components/pages/appointement/appointementForPatientView';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/pp' element={<DataTable />} /> */}
          <Route path='/employee' element={<EmployeesListPage />} />
          <Route path='/employee/register' element={<RegisterEmployee />} />
          <Route path='/signup/admin' element={<RegisterStaffAdmin />} /> 
          <Route path='/employee/update/:uid' element={<UpdateProfile />} />
          <Route path="employee/register/admin" element={<RegisterStaffAdmin />} />
          <Route path='/patientadminview' element={<PatientAdminView />} />
          <Route path='/patientview' element={<SinglePatient />} />
          <Route path='/patient' element={<PatientsListPage />} />
          <Route path='/patient/update/:uid' element={<UpdateProfilePatient />} />
          <Route path='patient/find/status/:status' element={<PatientsListPage />} />
          <Route path='patient/find/:PID' element={<AddResult />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/result/patient/:uid' element={<ResultPatientView />} />
          <Route path='/result' element={<ResultListPage />} />
          <Route path='/appointement' element={<Appointements />} />
          <Route path='/appointement/find/:tid' element={<AddMoreResult />} />
          <Route path='/appointement/patient/:uid' element={<AppointementPatientView />} />
          <Route path='result/find/:PID' element={<AddMoreResult />} />

          <Route path='employee/find/:EID' element={<ViewSingleEmployee />} />
          <Route path='/user' element={<UsersListPage />} />
          <Route path='/user/blockedaccounts' element={<BlockedUsers />} />

          <Route path='/user/updateaccount/:uid' element={<UpdateAccount />} />
          <Route path='/resetpassword' element={<Resetpassword />} />

          {/* <Route path='*' element={<div><h1>404 <br />Page not found</h1></div>} /> */}
        </Routes>
        {/* </Sidebar> */}
        {/* </RequireAuth> */}
      </BrowserRouter>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
