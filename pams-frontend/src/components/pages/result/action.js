// import {
//     FETCH_USER,
//     FETCH_EMPLOYEES,
//     FETCH_PATIENT,
//     FETCH_RESULT,
//     ADD_EMPLOYEES,
//     ADD_PATIENT,
//     ADD_RESULT,
//     FILTER_PATIENT,
//     FILTER_EMPLOYEE,
//     FILTER_PATIENT_BY_ID,
//     FILTER_RESULT_BY_DOCTOR,
//     FILTER_PATIENT_BY_STATUS,
//     FILTER_USER_BY_STATUS,
//     FILTER_RESULT_BY_DOCTOR_APPO,
//     FILTER_RESULT_BY_PATIENT
// } from "./actionTypes";
// import axios from 'axios';
// import api from '../../api/api'
// export const Results = () => async dispatch => {
//     try {
//         api.get('/result').then(res => {
//             dispatch({
//                 type: FETCH_RESULT,
//                 payload: res.data
//             })
//             // console.log(res.data)
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }
// export const FilterResultByDoctor = () => async dispatch => {
//     const uid = localStorage.getItem('UID')
//     // 
//     try {
//         api.get(`/result/doctor/${uid}`)
//             .then(res => {
//                 dispatch({
//                     type: FILTER_RESULT_BY_DOCTOR,
//                     payload: res.data
//                 })
//                 // console.log(res.data)
//             })
//     } catch (err) {
//         console.log(err)
//     }
// }


// export const FilterResultByPatient = () => async dispatch => {
//     const uid = localStorage.getItem('UID')
//     try {
//         api.get(`/result/patient/${uid}`)
//             .then(res => {
//                 dispatch({
//                     type: FILTER_RESULT_BY_PATIENT,
//                     payload: res.data
//                 })
//                 // console.log(res.data)
//             })
//     } catch (err) {
//         console.log(err)
//     }
// }


// export const FilterResultByDoctorAppo = () => async dispatch => {
//     const current = new Date()
//     const currentDate = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
//     const uid = localStorage.getItem('UID')
//     localStorage.setItem('appoDate', currentDate)
//     const appdate = localStorage.getItem('appoDate')

//     // if(currentDate !== null){
//     try {
//         api.get(`/appointement/doctor/${uid}`)
//             .then(res => {
//                 dispatch({
//                     type: FILTER_RESULT_BY_DOCTOR_APPO,
//                     payload: res.data
//                 })
//             })
//     } catch (err) {
//         console.log(err)
//     }
//     // }
// }

// export const AddResult = () => async dispatch => {
//     try {
//         api.post('/result/addresult')
//             .then(res => {
//                 dispatch({
//                     type: ADD_RESULT,
//                     payload: res.data
//                 })
//             })
//     } catch (err) {
//         console.log(err)
//     }
// }