import {useCallback, useEffect, useState} from "react";

const storageName = "userData"

type dataType = {
    token: string,
    userId: string
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data: dataType | null = JSON.parse(localStorage.getItem(storageName) || '{}')

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {
        login,
        logout,
        token,
        userId
    }
}