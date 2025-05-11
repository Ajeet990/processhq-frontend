import { createContext, useState } from "react";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    const login = (userData) => {
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)
    }
    const values = {
        login,
        logout,
        user,
        isAuthenticated,
        token,
        setToken
    }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

