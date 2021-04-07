export interface AuthenticationTypes {
    token: string | null,
    userId: string | null,
    login: ((jwtToken: string, id: string) => void) | null,
    logout: (() => void) | null,
    isAuthenticated: boolean
}

export enum AuthenticationActionTypes {
    SET_TOKEN = "SET_TOKEN",
    SET_USER_ID = "SET_USER_ID",
    SET_LOGIN = "SET_LOGIN",
    SET_LOGOUT = "SET_LOGOUT",
    SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED",
    SET_AUTHENTICATION_ALL_OPTIONS = "SET_AUTHENTICATION_ALL_OPTIONS"
}

interface SetTokenAction {
    type: AuthenticationActionTypes.SET_TOKEN,
    payload: string
}

interface SetUserIdAction {
    type: AuthenticationActionTypes.SET_USER_ID,
    payload: string
}

interface SetLoginAction {
    type: AuthenticationActionTypes.SET_LOGIN,
    payload: (jwtToken: string, id: string) => void
}

interface SetLogoutAction {
    type: AuthenticationActionTypes.SET_LOGOUT,
    payload: () => void
}
interface SetIsAuthenticatedAction {
    type: AuthenticationActionTypes.SET_IS_AUTHENTICATED,
    payload: boolean
}

interface SetAuthenticationAllOptionsAction {
    type: AuthenticationActionTypes.SET_AUTHENTICATION_ALL_OPTIONS,
    payload: AuthenticationTypes
}

export type AuthenticationActions = SetAuthenticationAllOptionsAction | SetIsAuthenticatedAction | SetTokenAction | SetLoginAction | SetLogoutAction | SetUserIdAction
