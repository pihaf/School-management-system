import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function Students({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/admin/login');
    } else {
        setLoading(true);
        fetch("http://localhost:3000/api/admin/students", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
          setDataSource(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, []);

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Students</Typography.Title>
            <Table
              loading={loading}
              columns={[
                {
                  title: "Photo",
                  dataIndex: "profile_image",
                  render: (link) => {
                    return <Avatar src={link} />;
                  },
                },
                {
                  title: "Student ID",
                  dataIndex: "student_id",
                },
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Date of birth",
                  dataIndex: "date_of_birth",
                },
                {
                  title: "Class",
                  dataIndex: "student_class",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
              ]}
              dataSource={dataSource}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
          </Space>
        </div>
        <AdminFooter />
    </div>
  );
}
export default Students;
