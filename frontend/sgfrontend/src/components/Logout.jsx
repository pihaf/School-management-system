import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setToken, setModel, setId, setProfileHeader }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('model');
    localStorage.removeItem('id');
    localStorage.removeItem('profileHeader');

    // Update the token state in the App component
    setToken(null);
    setModel(null);
    setId(null);
    setProfileHeader(null);
    // Redirect to the login page
    navigate('/home');
  }, [setToken, setModel, navigate]);

  return null;
}

export default Logout;