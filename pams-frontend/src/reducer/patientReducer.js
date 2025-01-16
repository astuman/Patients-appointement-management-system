import { FETCH_PATIENT, ADD_PATIENT,FILTER_PATIENT, FILTER_PATIENT_BY_STATUS } from "../action/actionTypes";

const initialState = {
    patients: [],
}

//Get all patiemnts list
export const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PATIENT:
            return ({
                ...state,
                patients: action.payload
            })
        default:
            return state
    }
}
//List of patients by patient ID
export const FilterPatientReducerById = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_PATIENT:
            return ({
                ...state,
                patients: action.payload
            })
        default:
            return state
    }
}
//Filter patients by patient status 
export const FilterPatientReducerByStatus = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_PATIENT_BY_STATUS:
            return ({
                ...state,
                patients: action.payload
            })
        default:
            return state
    }

}