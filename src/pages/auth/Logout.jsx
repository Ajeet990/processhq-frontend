import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { AuthContext } from '../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../messages/auth/Message';

const Logout = () => {
    // toast.dismiss();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    // const [hasLoggedOut, setHasLoggedOut] = useState(false)

    useEffect(() => {
        logout(); // Perform logout
        navigate('/login'); // Redirect after logout
        toast.success(Messages.LOGOUT_SUCCESS); // Show success message
        // setHasLoggedOut(true)

    }, []); // Dependencies ensure this runs only once

    return (
        <div>
            <p>Logging out...</p> {/* Optional: Show a message while logging out */}
        </div>
    );
};

export default Logout;
