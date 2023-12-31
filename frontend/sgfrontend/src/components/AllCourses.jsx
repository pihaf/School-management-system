import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Table, Typography, Layout, Space, Button, FloatButton } from "antd";

import "../css/UserCourse.css";
const { Content } = Layout;

function AllCourses({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/login");
    } else {
      fetch('http://localhost:3000/api/courses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDataSource(data);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [isAuthenticated, navigate, model]);

  return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
      <Space size={25} direction="vertical">
        <Typography.Title level={2}>All school courses</Typography.Title>
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
            //loading={loading}
            columns={[
              {
                title: "Course ID",
                dataIndex: "course_id",
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return (
                    String(record.course_id)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.course_class_code)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.course_name)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.day).toLowerCase().includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Course code",
                dataIndex: "course_code",
              },
              {
                title: "Course class code",
                dataIndex: "course_class_code",
              },
              {
                title: "Course name",
                dataIndex: "course_name",
              },
              {
                title: "Credits",
                dataIndex: "credits",
              },
              {
                title: "Number of students",
                dataIndex: "number_of_students",
              },
              {
                title: "Time",
                dataIndex: "time",
              },
              {
                title: "Day of week",
                dataIndex: "day",
              },
              {
                title: "Periods",
                dataIndex: "periods",
              },
              {
                title: "Location",
                dataIndex: "location",
              },
              {
                title: "Group",
                dataIndex: "group",
              },
              {
                title: "Semester",
                dataIndex: "semester",
              },
            ]}
            rowClassName={(record, index) => {
              const style = index % 2 === 0 ? {backgroundColor: '#6f9eb5'} : {backgroundColor: '#d22222'};
              return style;
            }}
            dataSource={dataSource.map((record) => ({
              ...record,
              key: record.course_id,
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

export default AllCourses;
