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

function Students({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingStudent, setAddingStudent] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch("http://localhost:3000/api/admin/students", {
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
          console.error("Error fetching students:", error);
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

  const onAddingStudent = () => {
    setIsAdding(true);
    setAddingStudent({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingStudent(null);
  };
  const onAddStudent = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.post(
        "http://localhost:3000/api/admin/students",
        addingStudent,
        { headers }
      );

      const createdStudent = response.data.student;
      console.log(createdStudent);
      setDataSource((pre) => {
        return [...pre, createdStudent];
      });
      resetAdding();
      addAlert("Student added successfully!", "success");
    } catch (error) {
      addAlert("Error adding student: " + String(error), "error");
      console.error("Error creating student:", error);
      setIsAdding(false);
    }
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const adminToken = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${adminToken}` };
        axios
          .delete(
            `http://localhost:3000/api/admin/students/${record.student_id}`,
            { headers }
          )
          .then((response) => {
            // Handle successful deletion
            console.log("Record deleted:", response.message);

            // Update the local state (dataSource) if needed
            setDataSource((pre) =>
              pre.filter((student) => student.student_id !== record.student_id)
            );
            addAlert("Student deleted successfully!", "success");
          })
          .catch((error) => {
            addAlert("Error deleting student: " + String(error), "error");
            console.error("Error deleting student record:", error);
          });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const onSaveEdit = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.put(
        `http://localhost:3000/api/admin/students/${editingStudent.student_id}`,
        editingStudent,
        { headers }
      );
      const updatedStudent = response.data;
      console.log("Updated student: ");
      console.log(updatedStudent);
      setDataSource((pre) => {
        return pre.map((student) => {
          if (student.student_id === updatedStudent.student_id) {
            return updatedStudent;
          } else {
            return student;
          }
        });
      });
      addAlert("Student updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating student: " + String(error), "error");
      console.error("Error updating student record:", error);
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
            <Typography.Title level={2}>Students</Typography.Title>
            <Button
              onClick={() => {
                onAddingStudent();
              }}
              style={{ width: "180px", height: "40px" }}
            >
              Add a new Student
            </Button>
            <Modal
              title="Add Student"
              open={isAdding}
              onOk={onAddStudent}
              onCancel={() => {
                resetAdding();
              }}
            >
              Student ID
              <Input
                placeholder="Student ID"
                name="student_id"
                value={addingStudent?.student_id}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, student_id: e.target.value };
                  });
                }}
              />
              Name
              <Input
                placeholder="Name"
                name="name"
                value={addingStudent?.name}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              Email
              <Input
                placeholder="Email"
                name="email"
                value={addingStudent?.email}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              Class
              <Input
                placeholder="Class"
                name="student_class"
                value={addingStudent?.student_class}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, student_class: e.target.value };
                  });
                }}
              />
              Gender
              <Input
                placeholder="Gender"
                name="gender"
                value={addingStudent?.gender}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, gender: e.target.value };
                  });
                }}
              />
              Date of birth
              <Input
                placeholder="Date of birth"
                name="date_of_birth"
                value={addingStudent?.date_of_birth}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, date_of_birth: e.target.value };
                  });
                }}
              />
              Place of birth
              <Input
                placeholder="Place of birth"
                name="place_of_birth"
                value={addingStudent?.place_of_birth}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, place_of_birth: e.target.value };
                  });
                }}
              />
              Citizen ID
              <Input
                placeholder="Citizen ID"
                name="citizen_id"
                value={addingStudent?.citizen_id}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, citizen_id: e.target.value };
                  });
                }}
              />
              Phone number
              <Input
                placeholder="Phone number"
                name="phone_number"
                value={addingStudent?.phone_number}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, phone_number: e.target.value };
                  });
                }}
              />
              Username
              <Input
                placeholder="Username"
                name="username"
                value={addingStudent?.username}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, username: e.target.value };
                  });
                }}
              />
              Password
              <Input.Password
                placeholder="Password"
                name="password"
                value={addingStudent?.password}
                onChange={(e) => {
                  setAddingStudent((pre) => {
                    return { ...pre, password: e.target.value };
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
                      String(record.student_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.student_class)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.email)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
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
                  title: "Place of birth",
                  dataIndex: "place_of_birth",
                },
                {
                  title: "Citizen ID",
                  dataIndex: "citizen_id",
                },
                {
                  title: "Phone number",
                  dataIndex: "phone_number",
                },
                {
                  title: "Username",
                  dataIndex: "username",
                },
                {
                  title: "Password",
                  dataIndex: "password",
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <>
                        <EditOutlined
                          onClick={() => {
                            onEditStudent(record);
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            onDeleteStudent(record);
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
                key: record.student_id,
              }))}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
            <Modal
              title="Edit Student"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              Student ID
              <Input
                placeholder="Student ID"
                name="student_id"
                value={editingStudent?.student_id}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, student_id: e.target.value };
                  });
                }}
              />
              Name
              <Input
                placeholder="Name"
                name="name"
                value={editingStudent?.name}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              Gender
              <Input
                placeholder="Gender"
                name="gender"
                value={editingStudent?.gender}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, gender: e.target.value };
                  });
                }}
              />
              Date of birth
              <Input
                placeholder="Date of birth"
                name="date_of_birth"
                value={editingStudent?.date_of_birth}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, date_of_birth: e.target.value };
                  });
                }}
              />
              Class
              <Input
                placeholder="Class"
                name="student_class"
                value={editingStudent?.student_class}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, student_class: e.target.value };
                  });
                }}
              />
              Email
              <Input
                placeholder="Email"
                name="email"
                value={editingStudent?.email}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              Place of birth
              <Input
                placeholder="Place of birth"
                name="place_of_birth"
                value={editingStudent?.place_of_birth}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, place_of_birth: e.target.value };
                  });
                }}
              />
              Citizen ID
              <Input
                placeholder="Citizen ID"
                name="citizen_id"
                value={editingStudent?.citizen_id}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, citizen_id: e.target.value };
                  });
                }}
              />
              Phone number
              <Input
                placeholder="Phone number"
                name="phone_number"
                value={editingStudent?.phone_number}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, phone_number: e.target.value };
                  });
                }}
              />
              Username
              <Input
                placeholder="Username"
                name="username"
                value={editingStudent?.username}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, username: e.target.value };
                  });
                }}
              />
              Password
              <Input.Password
                placeholder="Password"
                name="password"
                value={editingStudent?.password}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, password: e.target.value };
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
export default Students;
