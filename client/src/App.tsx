import React, {useEffect} from 'react';
import "./scss/App.scss"
import {useRoutes} from "./hooks/useRoutes";
import {useAuth} from "./hooks/useAuth";
import {useActions} from "./hooks/useActions";

// Style
const App: React.FC = () => {
    const {token, userId, login, logout} = useAuth();
    const {setAuthenticationOptionsAll} = useActions()

    useEffect(() => {
        setAuthenticationOptionsAll({
            token, userId, login, logout, isAuthenticated: !!token
        })
    })
    const routes = useRoutes(!!token)

    return routes
};

export default App;