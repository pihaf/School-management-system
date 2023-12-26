import { Avatar, Rate, Space, Table, Typography, Input } from "antd";
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
  const [searchedText, setSearchedText] = useState("");

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
            <Input.Search
              placeholder="Search here..."
              style={{ width: '500px', float: 'right' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
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
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.student_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.student_class).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.email).toLowerCase().includes(value.toLowerCase())
                    );
                  }
                },
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Gender",
                  dataIndex: "gender",
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
                {
                  title: "Phone number",
                  dataIndex: "phone_number",
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