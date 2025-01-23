import { FETCH_EMPLOYEES, ADD_EMPLOYEES,FILTER_EMPLOYEE } from "../action/actionTypes";

const initialState = {
    employees: [],
    filterEmp: [],
    
}
export const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return ({
                ...state,
                employees: action.payload
            })
        default:
            return state
    }
    
}
export const FilterEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_EMPLOYEE:
            return ({
                ...state,
                filterEmp: action.payload
            })
        default:
            return state
    }

}