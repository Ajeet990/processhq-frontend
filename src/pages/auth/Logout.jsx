import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { AuthContext } from '../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Messages } from '../../messages/auth/Message';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout(); // Wait for logout to complete
      toast.success(Messages.LOGOUT_SUCCESS);
      navigate('/login', { replace: true });
    };
    
    performLogout();
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
