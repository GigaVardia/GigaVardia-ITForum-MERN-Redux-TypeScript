import {
    AuthenticationActions,
    AuthenticationActionTypes,
    AuthenticationTypes
} from "../../types/store/AuthenticationTypes";

export const setToken = (payload: string): AuthenticationActions => {
    return {
        type: AuthenticationActionTypes.SET_TOKEN,
        payload
    }
}

export const setUserId = (payload: string): AuthenticationActions => {
    return {
        type: AuthenticationActionTypes.SET_USER_ID,
        payload
    }
}

export const setIsAuthenticated = (payload: boolean): AuthenticationActions => {
    return {
        type: AuthenticationActionTypes.SET_IS_AUTHENTICATED,
        payload
    }
}

export const setAuthenticationOptionsAll = (payload: AuthenticationTypes): AuthenticationActions => {
    return {
        type: AuthenticationActionTypes.SET_AUTHENTICATION_ALL_OPTIONS,
        payload
    }
}