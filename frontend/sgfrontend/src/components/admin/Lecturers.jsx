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
import host from "../../../config";
const { Content } = Layout;

function Lecturers({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingLecturer, setAddingLecturer] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch(`${host}/api/admin/lecturers`, {
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
          console.error("Error fetching lecturers:", error);
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

  const onAddingLecturer = () => {
    setIsAdding(true);
    setAddingLecturer({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingLecturer(null);
  };
  const onAddLecturer = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.post(
        `${host}/api/admin/lecturers`,
        addingLecturer,
        { headers }
      );

      const createdLecturer = response.data.lecturer;
      console.log(createdLecturer);
      setDataSource((pre) => {
        return [...pre, createdLecturer];
      });
      resetAdding();
      addAlert("Lecturer added successfully!", "success");
    } catch (error) {
      addAlert("Error adding lecturer: " + String(error), "error");
      console.error("Error creating lecturer:", error);
      setIsAdding(false);
    }
  };
  const onDeleteLecturer = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lecturer record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const adminToken = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${adminToken}` };
        axios
          .delete(
            `${host}/api/admin/lecturers/${record.lecturer_id}`,
            { headers }
          )
          .then((response) => {
            // Handle successful deletion
            console.log("Record deleted:", response.message);

            // Update the local state (dataSource) if needed
            setDataSource((pre) =>
              pre.filter(
                (lecturer) => lecturer.lecturer_id !== record.lecturer_id
              )
            );
            addAlert("Lecturer deleted successfully!", "success");
          })
          .catch((error) => {
            addAlert("Error deleting lecturer: " + String(error), "error");
            console.error("Error deleting lecturer record:", error);
          });
      },
    });
  };
  const onEditLecturer = (record) => {
    setIsEditing(true);
    setEditingLecturer({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingLecturer(null);
  };

  const onSaveEdit = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      const response = await axios.put(
        `${host}/api/admin/lecturers/${editingLecturer.lecturer_id}`,
        editinglecturer,
        { headers }
      );
      const updatedlecturer = response.data;
      console.log("Updated lecturer: ");
      console.log(updatedlecturer);
      setDataSource((pre) => {
        return pre.map((lecturer) => {
          if (lecturer.lecturer_id === updatedlecturer.lecturer_id) {
            return updatedlecturer;
          } else {
            return lecturer;
          }
        });
      });
      addAlert("Lecturer updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating lecturer: " + String(error), "error");
      console.error("Error updating lecturer record:", error);
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
            <Typography.Title level={2}>Lecturers</Typography.Title>
            <Button
              onClick={() => {
                onAddingLecturer();
              }}
              style={{ width: "180px", height: "40px" }}
            >
              Add a new Lecturer
            </Button>
            <Modal
              title="Add Lecturer"
              open={isAdding}
              onOk={onAddLecturer}
              onCancel={() => {
                resetAdding();
              }}
            >
              Name
              <Input
                placeholder="Name"
                name="name"
                value={addingLecturer?.name}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              Email
              <Input
                placeholder="Email"
                name="email"
                value={addingLecturer?.email}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              Department
              <Input
                placeholder="Department"
                name="department"
                value={addingLecturer?.department}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, department: e.target.value };
                  });
                }}
              />
              Subject/Lab
              <Input
                placeholder="Subject/Lab"
                name="subject/lab"
                value={addingLecturer?.["subject/lab"]}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, "subject/lab": e.target.value };
                  });
                }}
              />
              Job title
              <Input
                placeholder="Job title"
                name="job_title"
                value={addingLecturer?.job_title}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, job_title: e.target.value };
                  });
                }}
              />
              Phone number
              <Input
                placeholder="Phone number"
                name="phone_number"
                value={addingLecturer?.phone_number}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, phone_number: e.target.value };
                  });
                }}
              />
              Username
              <Input
                placeholder="Username"
                name="username"
                value={addingLecturer?.username}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
                    return { ...pre, username: e.target.value };
                  });
                }}
              />
              Password
              <Input.Password
                placeholder="Password"
                name="password"
                value={addingLecturer?.password}
                onChange={(e) => {
                  setAddingLecturer((pre) => {
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
                  title: "Lecturer ID",
                  dataIndex: "lecturer_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.lecturer_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.email)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.username)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.department)
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
                  title: "Department",
                  dataIndex: "department",
                },
                {
                  title: "Subject/lab",
                  dataIndex: "subject/lab",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Job title",
                  dataIndex: "job_tile",
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
                            onEditLecturer(record);
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            onDeleteLecturer(record);
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
                key: record.lecturer_id,
              }))}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
            <Modal
              title="Edit Lecturer"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              Name
              <Input
                placeholder="Name"
                name="name"
                value={editingLecturer?.name}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              Department
              <Input
                placeholder="Department"
                name="department"
                value={editingLecturer?.department}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, department: e.target.value };
                  });
                }}
              />
              Subject/Lab
              <Input
                placeholder="Subject/Lab"
                name="subject/lab"
                value={editingLecturer?.["subject/lab"]}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, "subject/lab": e.target.value };
                  });
                }}
              />
              Job title
              <Input
                placeholder="Job title"
                name="job_title"
                value={editingLecturer?.job_title}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, job_title: e.target.value };
                  });
                }}
              />
              Email
              <Input
                placeholder="Email"
                name="email"
                value={editingLecturer?.email}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              Phone number
              <Input
                placeholder="Phone number"
                name="phone_number"
                value={editingLecturer?.phone_number}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, phone_number: e.target.value };
                  });
                }}
              />
              Username
              <Input
                placeholder="Username"
                name="username"
                value={editingLecturer?.username}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
                    return { ...pre, username: e.target.value };
                  });
                }}
              />
              Password
              <Input.Password
                placeholder="Password"
                name="password"
                value={editingLecturer?.password}
                onChange={(e) => {
                  setEditingLecturer((pre) => {
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
export default Lecturers;
