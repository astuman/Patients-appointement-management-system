import {
    FETCH_RESULT,
    ADD_RESULT,
    FILTER_RESULT_BY_DOCTOR,
    FILTER_RESULT_BY_DOCTOR_APPO,
    FILTER_RESULT_BY_PATIENT,
    FILTER_RESULT_UPDATED,
    FILTER_RESULT_BY_DOCTOR_APPO_FOR_PATIENT
} from "../action/actionTypes";

const initialState = {
    caseResult: [],
}
export const ResultReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESULT:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }

}
export const ResultReducerFilterByDoctor = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RESULT_BY_DOCTOR:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }

}
export const ResultReducerFilterByDoctorAppo = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RESULT_BY_DOCTOR_APPO:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }
}
export const FilterResultByDoctorAppoForPatientView = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RESULT_BY_DOCTOR_APPO_FOR_PATIENT:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }
}
export const ResultReducerFilterByUpdated = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RESULT_UPDATED:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }

}

export const ResultReducerFilterByPatient = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_RESULT_BY_PATIENT:
            return ({
                ...state,
                caseResult: action.payload
            })
        default:
            return state
    }
}



