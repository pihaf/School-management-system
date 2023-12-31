import {
  Avatar,
  Rate,
  Space,
  Table,
  Typography,
  Input,
  Button,
  Modal,
  Alert,
  FloatButton,
  Layout,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/AdminHome.css";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

const { Content } = Layout;

function AdminCourse({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingCourse, setAddingCourse] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch("http://localhost:3000/api/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDataSource(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, []);

  const addAlert = (message, type) => {
    const newAlert = {
      id: Date.now(),
      message,
      type,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const onAddingCourse = () => {
    setIsAdding(true);
    setAddingCourse({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingCourse(null);
  };
  const onAddCourse = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.post(
        "http://localhost:3000/api/admin/courses",
        addingCourse,
        { headers }
      );

      const createdCourse = response.data;
      console.log(createdCourse);
      setDataSource((pre) => {
        return [...pre, createdCourse];
      });
      resetAdding();
      addAlert("Course added successfully!", "success");
    } catch (error) {
      addAlert("Error adding course: " + String(error), "error");
      console.error("Error creating course: ", error);
      setIsAdding(false);
    }
  };
  const onDeleteCourse = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this course record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const adminToken = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${adminToken}` };
        axios
          .delete(
            `http://localhost:3000/api/admin/courses/${record.course_id}`,
            { headers }
          )
          .then((response) => {
            // Handle successful deletion
            console.log("Record deleted:", response.message);

            // Update the local state (dataSource) if needed
            setDataSource((pre) =>
              pre.filter((course) => course.course_id !== record.course_id)
            );
            addAlert("Course deleted successfully!", "success");
          })
          .catch((error) => {
            addAlert("Error deleting course: " + String(error), "error");
            console.error("Error deleting course record:", error);
          });
      },
    });
  };
  const onEditCourse = (record) => {
    setIsEditing(true);
    setEditingCourse({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingCourse(null);
  };

  const onSaveEdit = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.put(
        `http://localhost:3000/api/admin/courses/${editingCourse.course_id}`,
        editingCourse,
        { headers }
      );
      const updatedCourse = response.data;
      console.log("Updated course: ");
      console.log(updatedCourse);
      setDataSource((pre) => {
        return pre.map((course) => {
          if (course.course_id === updatedCourse.course_id) {
            return updatedCourse;
          } else {
            return course;
          }
        });
      });
      addAlert("Course updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating course: " + String(error), "error");
      console.error("Error updating course record:", error);
      setIsEditing(false);
    }
  };

  return (
    <div className="App">
      <AdminHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <Content
          style={{
            margin: "0px 28px 24px 24px",
          }}
        >
          <Space size={20} direction="vertical">
            <Typography.Title level={2}>Courses</Typography.Title>
            <Button
              onClick={() => {
                onAddingCourse();
              }}
              style={{ width: "170px", height: "40px" }}
            >
              Add a new Course
            </Button>
            <Modal
              title="Add Course"
              open={isAdding}
              onOk={onAddCourse}
              onCancel={() => {
                resetAdding();
              }}
            >
              Course name
              <Input
                placeholder="Course name"
                name="course_name"
                value={addingCourse?.course_name}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, course_name: e.target.value };
                  });
                }}
              />
              Course code
              <Input
                placeholder="Course code"
                name="course_code"
                value={addingCourse?.course_code}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, course_code: e.target.value };
                  });
                }}
              />
              Course class code
              <Input
                placeholder="Course class code"
                name="course_class_code"
                value={addingCourse?.course_class_code}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, course_class_code: e.target.value };
                  });
                }}
              />
              Credits
              <Input
                placeholder="Credits"
                name="credits"
                value={addingCourse?.credits}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, credits: e.target.value };
                  });
                }}
              />
              Number of students
              <Input
                placeholder="Number of students"
                name="number_of_students"
                value={addingCourse?.number_of_students}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, number_of_students: e.target.value };
                  });
                }}
              />
              Time
              <Input
                placeholder="Time"
                name="time"
                value={addingCourse?.time}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, time: e.target.value };
                  });
                }}
              />
              Day of week(number)
              <Input
                placeholder="Day of week(number)"
                name="day"
                value={addingCourse?.day}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, day: e.target.value };
                  });
                }}
              />
              Periods
              <Input
                placeholder="Periods"
                name="periods"
                value={addingCourse?.periods}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, periods: e.target.value };
                  });
                }}
              />
              Location
              <Input
                placeholder="Location"
                name="location"
                value={addingCourse?.location}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, location: e.target.value };
                  });
                }}
              />
              Group
              <Input
                placeholder="Group"
                name="group"
                value={addingCourse?.group}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, group: e.target.value };
                  });
                }}
              />
              Semester
              <Input
                placeholder="Semester"
                name="semester"
                value={addingCourse?.semester}
                onChange={(e) => {
                  setAddingCourse((pre) => {
                    return { ...pre, semester: e.target.value };
                  });
                }}
              />
            </Modal>
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                message={alert.message}
                type={alert.type}
                showIcon
                closable
                afterClose={() => removeAlert(alert.id)}
              />
            ))}
            <ReloadOutlined
              onClick={() => {
                window.location.reload();
              }}
              style={{ marginLeft: 12 }}
            />
            <Input.Search
              placeholder="Search here..."
              style={{ width: "500px", float: "right" }}
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
                      String(record.day)
                        .toLowerCase()
                        .includes(value.toLowerCase())
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
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <>
                        <EditOutlined
                          onClick={() => {
                            onEditCourse(record);
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            onDeleteCourse(record);
                          }}
                          style={{ color: "red", marginLeft: 12 }}
                        />
                      </>
                    );
                  },
                },
              ]}
              dataSource={dataSource.map((record) => ({
                ...record,
                key: record.course_id,
              }))}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
            <Modal
              title="Edit Course"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              Course name
              <Input
                placeholder="Course name"
                name="course_name"
                value={editingCourse?.course_name}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, course_name: e.target.value };
                  });
                }}
              />
              Course code
              <Input
                placeholder="Course code"
                name="course_code"
                value={editingCourse?.course_code}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, course_code: e.target.value };
                  });
                }}
              />
              Course class code
              <Input
                placeholder="Course class code"
                name="course_class_code"
                value={editingCourse?.course_class_code}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, course_class_code: e.target.value };
                  });
                }}
              />
              Credits
              <Input
                placeholder="Credits"
                name="credits"
                value={editingCourse?.credits}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, credits: e.target.value };
                  });
                }}
              />
              Number of students
              <Input
                placeholder="Number of students"
                name="number_of_students"
                value={editingCourse?.number_of_students}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, number_of_students: e.target.value };
                  });
                }}
              />
              Time
              <Input
                placeholder="Time"
                name="time"
                value={editingCourse?.time}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, time: e.target.value };
                  });
                }}
              />
              Day of week
              <Input
                placeholder="Day of week(number)"
                name="day"
                value={editingCourse?.day}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, day: e.target.value };
                  });
                }}
              />
              Periods
              <Input
                placeholder="Periods"
                name="periods"
                value={editingCourse?.periods}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, periods: e.target.value };
                  });
                }}
              />
              Location
              <Input
                placeholder="Location"
                name="location"
                value={editingCourse?.location}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, location: e.target.value };
                  });
                }}
              />
              Group
              <Input
                placeholder="Group"
                name="group"
                value={editingCourse?.group}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, group: e.target.value };
                  });
                }}
              />
              Semester
              <Input
                placeholder="Semester"
                name="semester"
                value={editingCourse?.semester}
                onChange={(e) => {
                  setEditingCourse((pre) => {
                    return { ...pre, semester: e.target.value };
                  });
                }}
              />
            </Modal>
          </Space>
        </Content>
      </div>
      <FloatButton.BackTop />
      <AdminFooter />
    </div>
  );
}
export default AdminCourse;
