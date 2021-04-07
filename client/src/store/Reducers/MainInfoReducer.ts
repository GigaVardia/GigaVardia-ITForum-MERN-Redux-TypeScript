import {MainInfo, MainInfoActions, MainInfoActionsTypes} from "../../types/store/MainInfoTypes";

const initialState: MainInfo = {
    signUpClicked: false,
    signInClicked: false
}

export const MainInfoReducer = (state: MainInfo = initialState, action: MainInfoActions): MainInfo => {
    switch (action.type) {
        case MainInfoActionsTypes.SET_SIGN_UP_CLICKED:
            return {...state, signUpClicked: action.payload}
        case MainInfoActionsTypes.SET_SIGN_IN_CLICKED:
            return {...state, signInClicked: action.payload}
        default:
            return state
    }
}