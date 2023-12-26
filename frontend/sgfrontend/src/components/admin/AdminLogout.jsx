import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogout({ setAdminToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('adminToken');

    // Update the token state in the App component
    setAdminToken(null);
    
    // Redirect to the login page
    navigate('/admin/login');
  }, [setAdminToken, navigate]);

  return null;
}

export default AdminLogout;