import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext)
    const location = useLocation()

    if (!isAuthenticated) {
        // Save the attempted URL for redirecting post-login
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default PrivateRoute