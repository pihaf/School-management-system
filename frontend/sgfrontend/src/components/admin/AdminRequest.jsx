import { Avatar, Rate, Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function AdminRequest({ isAuthenticated }) {
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
        fetch("http://localhost:3000/api/admin/requests", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
          setDataSource(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching requests:', error);
        });
    }
  }, []);

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Requests</Typography.Title>
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
                  title: "Request ID",
                  dataIndex: "request_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.request_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.student_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.type).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.status).toLowerCase().includes(value.toLowerCase())
                    );
                  }
                },
                {
                  title: "Student ID",
                  dataIndex: "student_id",
                },
                {
                  title: "Type",
                  dataIndex: "type",
                },
                {
                  title: "Details",
                  dataIndex: "details",
                },
                {
                  title: "Status",
                  dataIndex: "status",
                },
                {
                  title: "Created at",
                  dataIndex: "created_at",
                },
              ]}
              dataSource={dataSource.map((record) => ({ ...record, key: record.request_id + record.student_id }))}
              pagination={{
                pageSize: 10,
              }}
            ></Table>
          </Space>
        </div>
        <AdminFooter />
    </div>
  );
}
export default AdminRequest;
