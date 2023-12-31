import {
  Avatar,
  Rate,
  Space,
  Table,
  Typography,
  Modal,
  Alert,
  Input,
  Button,
  BackTop,
  Layout,
} from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/AdminHome.css";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

const { Content } = Layout;
function AdminProfile({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to log in");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch("http://localhost:3000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProfileData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <p>Loading admin profile...</p>;
  }

  if (!profileData) {
    return null;
  }

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

  const onEditProfile = () => {
    setIsEditing(true);
    setEditingProfile({ ...profileData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProfile(null);
  };

  const onSaveEdit = async () => {
    try {
      const updatedData = {
        ...profileData,
        ...editingProfile,
      };
      console.log("Current profile: ", updatedData);
      const response = await axios.put(
        `http://localhost:3000/api/admin/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const updatedProfile = response.data;
      console.log("Updated profile: ");
      console.log(updatedProfile);
      setProfileData(updatedProfile);
      addAlert("Updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating profile: " + String(error), "error");
      console.error("Error updating profile:", error);
      setIsEditing(false);
    }
  };

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
  ];

  const data = [
    { key: "1", field: "Admin ID", value: profileData.admin_id },
    { key: "2", field: "Name", value: profileData.name },
    { key: "3", field: "Email", value: profileData.email },
    { key: "4", field: "Username", value: profileData.username },
    { key: "5", field: "Password", value: profileData.password },
  ];

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
            <Typography.Title level={2}>Admin Profile</Typography.Title>
            <Button
              onClick={() => {
                onEditProfile();
              }}
              style={{ width: "150px", height: "40px" }}
            >
              Update Profile
            </Button>
            <ReloadOutlined
              onClick={() => {
                window.location.reload();
              }}
              style={{ marginLeft: 12 }}
            />
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
            <Table columns={columns} dataSource={data} pagination={false} />
            <Modal
              title="Edit Profile"
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
                value={editingProfile?.name}
                onChange={(e) => {
                  setEditingProfile((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              Email
              <Input
                placeholder="Email"
                name="email"
                value={editingProfile?.email}
                onChange={(e) => {
                  setEditingProfile((pre) => {
                    return { ...pre, email: e.target.value };
                  });
                }}
              />
              Username
              <Input
                disabled
                placeholder="Username"
                name="username"
                value={editingProfile?.username}
                onChange={(e) => {
                  setEditingProfile((pre) => {
                    return { ...pre, username: e.target.value };
                  });
                }}
              />
              Password
              <Input.Password
                placeholder="Password"
                name="password"
                value={editingProfile?.password}
                onChange={(e) => {
                  setEditingProfile((pre) => {
                    return { ...pre, password: e.target.value };
                  });
                }}
              />
            </Modal>
          </Space>
        </Content>
      </div>
      <BackTop />
      <AdminFooter />
    </div>
  );
}

export default AdminProfile;
