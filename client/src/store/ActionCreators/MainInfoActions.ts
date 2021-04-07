import {MainInfoActions, MainInfoActionsTypes} from "../../types/store/MainInfoTypes";

export const setSignUpClicked = (payload: boolean): MainInfoActions => {
    return {
        type: MainInfoActionsTypes.SET_SIGN_UP_CLICKED,
        payload
    }
}

export const setSignInClicked = (payload: boolean): MainInfoActions => {
    return {
        type: MainInfoActionsTypes.SET_SIGN_IN_CLICKED,
        payload
    }
}