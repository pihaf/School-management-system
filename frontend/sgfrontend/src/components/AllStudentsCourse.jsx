import { Avatar, Rate, Space, Table, Typography, Input, Button, Layout, FloatButton} from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom';
import host from "../../config";
import "../css/UserCourse.css";
const { Content } = Layout;

function AllStudentsCourse({ isAuthenticated, model, id, token}) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/login');
    } else {
        setLoading(true);
        if (model === 'student'){
          fetch(`${host}/api/students/${id}/${courseId}`, { 
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          }).then(response => response.json())
          .then(data => {
            setDataSource(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching students:', error);
          });
      } else {
        fetch(`${host}/api/courses/${courseId}/students`, { 
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    }
  }, [isAuthenticated, id, model]);

  return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
      <Space size={25} direction="vertical">
        <Typography.Title level={2}>Course {courseId}</Typography.Title>
        <Button onClick={() => {navigate('/courses');}}>Back</Button>
        <Input.Search
          placeholder="Search here..."
          style={{ width: "400px", float: "right" }}
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
          {dataSource.length === 0 ? (
            <Typography.Text>No courses found.</Typography.Text>
        ) : (
          <Table
            columns={[
              {
                title: "Student ID",
                dataIndex: "student_id",
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return (
                    String(record.student_id)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.name)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.email)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.date_of_birth).toLowerCase().includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Student name",
                dataIndex: "name"
              },
              {
                title: "Class",
                dataIndex: "class"
              },
              {
                title: "Email",
                dataIndex: "email"
              },
              {
                title: "Date of birth",
                dataIndex: "date_of_birth"
              },
              {
                title: "Phone number",
                dataIndex: "phone_number"
              }
            ]}
            rowClassName={(record, index) => {
              const style = index % 2 === 0 ? {backgroundColor: '#6f9eb5'} : {backgroundColor: '#d22222'};
              return style;
            }}
            dataSource={dataSource.map((record) => ({
              ...record,
              key: record.student_id,
            }))}
            pagination={{
              pageSize: 20,
            }}
          ></Table>
        )}
      </Space>
      <FloatButton.BackTop />
    </Content>
  );
}
export default AllStudentsCourse;
