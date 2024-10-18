import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Custom hook for checking authentication
const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
};

export default useAuth;