import { FETCH_USER,FILTER_USER_BY_STATUS } from "../action/actionTypes";

const initialState = {
    user: []
}
export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return ({
                ...state,
                user: action.payload
            })
        default:
            return state
    }
}
export const UserReducerFilterByStatus = (state = initialState, action) =>{
    switch(action.type) {
        case FILTER_USER_BY_STATUS:
            return ({
                ...state,
                user:action.payload
            })
            default:
                return state;
    }
}

