import { Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function AdminHome({ isAuthenticated, adminToken, setAdminToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/admin/login');
    }   
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      <AdminHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
      </div>
      <AdminFooter />
    </div>
  );
}
export default AdminHome;
