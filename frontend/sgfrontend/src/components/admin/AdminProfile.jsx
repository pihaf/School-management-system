import { Avatar, Rate, Space, Table, Typography, Input, Button, Modal, Alert } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function AdminProfile({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to log in');
      navigate('/admin/login');
    } else {
      setLoading(true);
      fetch('http://localhost:3000/api/admin/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, 
          },
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          setAdminProfile(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <p>Loading admin profile...</p>;
  }

  if (!adminProfile) {
    return null;
  }

  return (
    <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Admin Profile</Typography.Title>
              <p>Name: {adminProfile.name}</p>
              <p>Email: {adminProfile.email}</p>
          </Space>
        </div>
        <AdminFooter />
    </div>
  );
}

export default AdminProfile;
