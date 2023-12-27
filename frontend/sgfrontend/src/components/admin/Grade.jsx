import { Avatar, Rate, Space, Table, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function Grade({ isAuthenticated }) {
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
        fetch("http://localhost:3000/api/admin/grades", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
            const processedData = data.map(record => {
                return {
                    ...record,
                    ...record.Course,
                    ...record.Student
                };
            });
          setDataSource(processedData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching grades:', error);
        });
    }
  }, []);

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Grades</Typography.Title>
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
                  title: "Grade ID",
                  dataIndex: "grade_id",
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
                  title: "Student Name",
                  dataIndex: "name",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Course class code",
                  dataIndex: "course_class_code",
                },
                {
                    title: "Component score",
                    dataIndex: "component_score",
                },
                {
                    title: "Midterm score",
                    dataIndex: "midterm_score",
                },
                {
                    title: "Finalterm score",
                    dataIndex: "finalterm_score",
                },
                {
                    title: "Overall",
                    dataIndex: "overall_score",
                },
              ]}
              dataSource={dataSource.map((record) => ({ ...record, key: record.grade_id }))}
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
export default Grade;
