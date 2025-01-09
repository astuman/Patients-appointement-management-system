import { PatientReducer, FilterPatientReducerByStatus, FilterPatientReducerById } from './patientReducer'
import { EmployeeReducer, FilterEmployeeReducer } from './employeeReducer'
import { ResultReducer, ResultReducerFilterByDoctor, ResultReducerFilterByDoctorAppo, ResultReducerFilterByPatient, ResultReducerFilterByUpdated, FilterResultByDoctorAppoForPatientView } from './resultReducer'
import { combineReducers } from 'redux'
import { UserReducer, UserReducerFilterByStatus } from './userReducer'

export const RootReducer = combineReducers({
    rootPatientList: PatientReducer,
    rootResultFilterByPatient: ResultReducerFilterByPatient,
    rootPatientListByStatus: FilterPatientReducerByStatus,
    rootPatientListById: FilterPatientReducerById,
    rootEmployeeList: EmployeeReducer,
    rootEmployeeFilter: FilterEmployeeReducer,
    rootResultList: ResultReducer,
    rootResultFilterByDoctor: ResultReducerFilterByDoctor,
    rootResultFilterByDoctorAppo: ResultReducerFilterByDoctorAppo,
    rootResultByDoctorAppoForPatientView:FilterResultByDoctorAppoForPatientView,
    rootResultFilterByUpdated: ResultReducerFilterByUpdated,
    rootUserList: UserReducer,
    rootUserFilterByStatus: UserReducerFilterByStatus,
})
export default RootReducer;