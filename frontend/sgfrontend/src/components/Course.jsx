import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Table, Typography, Layout, Space } from "antd";

import "../css/UserCourse.css";
const { Content } = Layout;

function Course({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/login");
    } else {
      // Fetch the list of courses based on the user's role
      let url;
      if (model === "student") {
        url = `http://localhost:3000/api/courses/students/${id}`;
      } else if (model === "lecturer") {
        url = `http://localhost:3000/api/courses/lecturers/${id}`;
      }

      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
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
        <Typography.Title level={2}>Courses</Typography.Title>
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
      </Space>

      {/* <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            <p>Title: {course.title}</p>
            <p>Course ID: {course.course_id}</p>
            <p>Class Code: {course.course_class_code}</p>
            <p>Course Code: {course.course_code}</p>
            <p>Course Name: {course.course_name}</p>
            <p>Credits: {course.credits}</p>
            <p>Number of Students: {course.number_of_students}</p>
            <p>Time: {course.time}</p>
            <p>Day: {course.day}</p>
            <p>Periods: {course.periods}</p>
            <p>Location: {course.location}</p>
            <p>Group: {course.group}</p>
            <p>Semester: {course.semester}</p>
          </li>
        ))}
      </ul> */}
    </Content>
  );
}

export default Course;
