import {AuthenticationActions, AuthenticationTypes, AuthenticationActionTypes} from "../../types/store/AuthenticationTypes";

const initialState: AuthenticationTypes = {
    token: "",
    userId: "",
    login: null,
    logout: null,
    isAuthenticated: false
}

export const AuthenticationReducer = (state= initialState, action: AuthenticationActions): AuthenticationTypes => {
    switch (action.type) {
        case AuthenticationActionTypes.SET_AUTHENTICATION_ALL_OPTIONS:
            return {...action.payload}
        case AuthenticationActionTypes.SET_IS_AUTHENTICATED:
            return {...state, isAuthenticated: action.payload}
        default:
            return state
    }
}