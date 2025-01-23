import { FETCH_USER, 
    FETCH_EMPLOYEES,
    FETCH_PATIENT,
    FETCH_RESULT,
    ADD_EMPLOYEES,
    ADD_PATIENT,
    ADD_RESULT,
    FILTER_PATIENT,
    FILTER_EMPLOYEE,
    FILTER_PATIENT_BY_ID,
    FILTER_RESULT_BY_DOCTOR,
    FILTER_PATIENT_BY_STATUS,
    FILTER_USER_BY_STATUS,
    FILTER_RESULT_BY_DOCTOR_APPO,
    FILTER_RESULT_BY_PATIENT,
    FILTER_RESULT_UPDATED,
    FILTER_RESULT_BY_DOCTOR_APPO_FOR_PATIENT
} from "./actionTypes";
import axios from 'axios';
import api from '../components/api/api'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Patients =()=> async dispatch =>{
    try{
        api.get(`/patient`)
        .then(res=>{
            dispatch({
                type:FETCH_PATIENT,
                payload:res.data
            })
        })

         
    }catch(err){
        console.log({err})
    }
}
export const FilterPatientById =()=> async dispatch =>{
    try{
        api.get('/patient/find/:uid')
        .then(res=>{
            dispatch({
                type:FILTER_PATIENT_BY_ID,
                payload:res.data
            })
        })

         
    }catch(err){
        console.log({err})
    }
}
export const FilterPatientByStatus =()=> async dispatch =>{
    const ii = localStorage.getItem("pstatus")
    try{
        api.get(`/patient/find/status/${ii}`)
        .then(res=>{
            dispatch({
                type:FILTER_PATIENT_BY_STATUS,
                payload:res.data
            })
        })        
    }catch(err){
        console.log({err})
    }
}

export const FilterEmployee =()=> async dispatch =>{
    const uid = localStorage.getItem("EID")
    try{
        api.get(`/employee/find/${uid}`)
        .then(res=>{
            dispatch({
                type:FILTER_EMPLOYEE,
                payload:res.data
            })
            

        })
    }catch(err){
        console.log({err})
    }
}
// export const AddPatient =()=> async dispatch =>{
//     try{
//         api.get(`/patients/add`)
//         .then(res=>{
//             dispatch({
//                 type:ADD_PATIENT,
//                 payload:res.data
//             })
//         })

         
//     }catch(err){
//         console.log({Error:err})
//     }
// }

export const Employees =()=>async dispatch => {
    try{
    api.get(`/employee`)
    .then(res=>{
        dispatch({
            type:FETCH_EMPLOYEES,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}
export const Users =()=>async dispatch => {
    try{
    api.get(`/user`)
    .then(res=>{
        dispatch({
            type:FETCH_USER,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}
export const FilterUserByStatus =()=> async dispatch =>{
    const st = "blocked"
    try{
        api.get(`/user/find/status/${st}`)
        .then(res=>{
            dispatch({
                type:FILTER_USER_BY_STATUS,
                payload:res.data
            });
        })
    }catch(err){
        console.log(err)
    }
}

export const Results =()=> async dispatch =>{
    try{
    api.get('/result').then(res=>{
        dispatch({
            type:FETCH_RESULT,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}

export const Result_updated =()=> async dispatch =>{
    try{
    api.get('/result/find')
    .then(res=>{
        dispatch({
            type:FILTER_RESULT_UPDATED,
            payload:res.data
        })
        console.log(res.data)
    })
}catch(err){
    console.log(err)
}
}
export const FilterResultByDoctor =()=> async dispatch =>{
    const uid = localStorage.getItem('UID')
    // 
    try{
    api.get(`/result/doctor/${uid}`)
    .then(res=>{
        dispatch({
            type:FILTER_RESULT_BY_DOCTOR,
            payload:res.data
        })
        // console.log(res.data)
    })
}catch(err){
    console.log(err)
}
    }
export const FilterResultByPatient =()=> async dispatch =>{
    const uid = localStorage.getItem('UID')
    try{
    await api.get(`/result/patient/${uid}`)
    .then(res=>{
        dispatch({
            type:FILTER_RESULT_BY_PATIENT,
            payload:res.data
        })
        // console.log(res.data)
    })
}catch(err){
    console.log(err)
}
}
export const FilterResultByDoctorAppo =()=> async dispatch =>{
    const current = new Date()
    const currentDate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
    const uid = localStorage.getItem('UID')
    localStorage.setItem('appoDate', currentDate)
    const appdate = localStorage.getItem('appoDate')

    // if(currentDate !== null){
    try{
    api.get(`/appointement/doctor/${uid}`)
    .then(res=>{
        dispatch({
            type:FILTER_RESULT_BY_DOCTOR_APPO,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}
export const FilterResultByDoctorAppoForPatientView =()=> async dispatch =>{
    const current = new Date()
    const currentDate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
    const uid = localStorage.getItem('UID')
    localStorage.setItem('appoDate', currentDate)
    const appdate = localStorage.getItem('appoDate')

    try{
    api.get(`/appointement/patient/${uid}`)
    .then(res=>{
        dispatch({
            type:FILTER_RESULT_BY_DOCTOR_APPO_FOR_PATIENT,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}
export const AddResult =()=> async dispatch =>{
    try{    
    api.post('/result/addresult')
    .then(res=>{
        dispatch({
            type:ADD_RESULT,
            payload:res.data
        })
    })
}catch(err){
    console.log(err)
}
}

// export const addEmployee =()=> async dispatch =>{
//     try{

    
//     api.post('/employees/add').then(res=>{
//         dispatch({
//             type:ADD_EMPLOYEES,
//             payload:res.data
//         })
//     })
// }catch(err){
//     console.log(err)
// }
// }
