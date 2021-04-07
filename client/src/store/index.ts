import {createStore, combineReducers} from 'redux'
import {MainInfoReducer} from "./Reducers/MainInfoReducer";
import {AuthenticationReducer} from "./Reducers/AuthenticationReducer";

const rootReducer = combineReducers({
    mainInfo: MainInfoReducer,
    authentication: AuthenticationReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)