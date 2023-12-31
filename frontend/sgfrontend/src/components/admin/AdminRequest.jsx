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
  BackTop,
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
function AdminRequest({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch("http://localhost:3000/api/admin/requests", {
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
          console.error("Error fetching requests:", error);
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

  const onDeleteRequest = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this request record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const adminToken = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${adminToken}` };
        axios
          .delete(
            `http://localhost:3000/api/admin/requests/${record.request_id}`,
            { headers }
          )
          .then((response) => {
            // Handle successful deletion
            console.log("Record deleted:", response.message);

            // Update the local state (dataSource) if needed
            setDataSource((pre) =>
              pre.filter((request) => request.request_id !== record.request_id)
            );
            addAlert("Request deleted successfully!", "success");
          })
          .catch((error) => {
            addAlert("Error deleting request: " + String(error), "error");
            console.error("Error deleting request record:", error);
          });
      },
    });
  };
  const onEditRequest = (record) => {
    setIsEditing(true);
    setEditingRequest({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRequest(null);
  };

  const onSaveEdit = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${adminToken}` };
      editingRequest.updated_at = new Date();
      const response = await axios.put(
        `http://localhost:3000/api/admin/requests/${editingRequest.request_id}`,
        editingRequest,
        { headers }
      );
      const updatedRequest = response.data;
      console.log("Updated request: ");
      console.log(updatedRequest);
      setDataSource((pre) => {
        return pre.map((request) => {
          if (request.request_id === updatedRequest.request_id) {
            return updatedRequest;
          } else {
            return request;
          }
        });
      });
      addAlert("Request updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating request: " + String(error), "error");
      console.error("Error updating request record:", error);
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
            <Typography.Title level={2}>Requests</Typography.Title>
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
                  title: "Request ID",
                  dataIndex: "request_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.request_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.student_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.type)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.status)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
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
                {
                  title: "Updated at",
                  dataIndex: "updated_at",
                },
                {
                  title: "Actions",
                  render: (record) => {
                    return (
                      <>
                        <EditOutlined
                          onClick={() => {
                            onEditRequest(record);
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            onDeleteRequest(record);
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
                key: record.request_id + record.student_id,
              }))}
              pagination={{
                pageSize: 10,
              }}
            ></Table>
            <Modal
              title="Edit Request"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              Type
              <Input
                placeholder="Type"
                name="type"
                value={editingRequest?.type}
                onChange={(e) => {
                  setEditingRequest((pre) => {
                    return { ...pre, type: e.target.value };
                  });
                }}
              />
              Details
              <Input.TextArea
                placeholder="Details"
                name="details"
                value={editingRequest?.details}
                onChange={(e) => {
                  setEditingRequest((pre) => {
                    return { ...pre, details: e.target.value };
                  });
                }}
              />
              <p>Status</p>
              <Input
                placeholder="Status"
                name="status"
                value={editingRequest?.status}
                onChange={(e) => {
                  setEditingRequest((pre) => {
                    return { ...pre, status: e.target.value };
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
export default AdminRequest;
