export interface MainInfo {
    signUpClicked: boolean,
    signInClicked: boolean
}

export enum MainInfoActionsTypes {
    SET_SIGN_UP_CLICKED = "SET_SIGN_UP_CLICKED",
    SET_SIGN_IN_CLICKED = "SET_SIGN_IN_CLICKED"
}

interface SetSignUpClicked {
    type: MainInfoActionsTypes.SET_SIGN_UP_CLICKED,
    payload: boolean
}

interface SetSignInClicked {
    type: MainInfoActionsTypes.SET_SIGN_IN_CLICKED,
    payload: boolean
}

export type MainInfoActions = SetSignUpClicked | SetSignInClicked