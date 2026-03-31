import { createContext, useContext, useState } from 'react'
import API from "../api/axios.js"

const AuthContext = createContext();

export function AuthProvider( {children} ) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = async () => {
        try {
            await API.post('/auth/logout')
        } catch (error) {
            console.warn('Logout API failed, continuing with local logout:', error)
        } finally {
            localStorage.clear()
            setUser(null)
        }
    }

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
