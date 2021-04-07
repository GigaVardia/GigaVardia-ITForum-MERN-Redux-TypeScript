import React, {FC, useEffect} from 'react';
import "./scss/App.scss"
import {useRoutes} from "./hooks/useRoutes";
import {useAuth} from "./hooks/useAuth";
import {useActions} from "./hooks/useActions";

// Style
const App: FC = () => {
    const {token, userId, login, logout} = useAuth();
    const {setAuthenticationOptionsAll} = useActions()

    useEffect(() => {
        setAuthenticationOptionsAll({
            token, userId, login, logout, isAuthenticated: !!token
        })
    })
    const routes = useRoutes(!!token)

    return (
        <div className="app">
            {routes}
        </div>
    )
};

export default App;