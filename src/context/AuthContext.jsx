import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext()
// import axios from "axios";
import { toast } from "react-toastify";
import FullPageLoader from "../components/loader/FullPageLoader";
import { useLogoutMutation, useCheckTokenValidityQuery, useLazyCheckTokenValidityQuery } from "../apis/auth/AuthSlice";


export const AuthProvider = ({ children }) => {
    const [makeLogout] = useLogoutMutation();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [triggerCheckToken] = useLazyCheckTokenValidityQuery();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('user_token');
            
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data: response } = await triggerCheckToken();
                console.log('Token validation response:', response);
                if (response.success) {
                    setUser(response.data.user);
                    setToken(token); // Set token in state
                    setIsAuthenticated(true); // Critical: Set authenticated
                } else {
                    clearAuth();
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                clearAuth();
            } finally {
                setLoading(false);
            }
        };

        const clearAuth = () => {
            localStorage.removeItem('user_token');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            toast.error('Session expired. Please log in again.');
        };

        validateToken();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('user_token', token);

    };

    const logout = async () => {
        const isLoggedOut = await makeLogout();
        // const isLoggedOut = await makeUserLogout();
        if (isLoggedOut) {
            localStorage.removeItem('user_token');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            // window.location.href = '/login';
        }
    };

    const values = {
        login,
        logout,
        user,
        isAuthenticated,
        token,
        setToken
    };

    if (loading) {
        return <FullPageLoader /> // Show loader while validating token
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

