import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Table, Typography, Layout, Space, Button, Alert, Modal, FloatButton , Select} from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from 'axios';
import host from '../../config';
import "../css/UserCourse.css";
const { Content } = Layout;

const types = ["Cấp giấy chứng nhận hoạt động cho thành viên/cộng tác viên", "In bảng điểm tích lũy", "Cấp giấy chứng nhận sinh viên", 
"Vấn đề tài khoản"];

function Request({ isAuthenticated, model, id, token }) {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [requests, setRequests] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingRequest, setAddingRequest] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else if (model === 'lecturer') {
      alert('Access denied');
      navigate('/');
    } else {
      const fetchRequests = async () => {
        try {
          const response = await fetch(`${host}/api/requests/students/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setRequests(data);
          } else {
            throw new Error('Failed to fetch requests');         
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchRequests();
    }
  }, [isAuthenticated, navigate, id]);
  
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


  const onAddingRequest = () => {
    setIsAdding(true);
    setAddingRequest({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingRequest(null);
  };
  const onAddRequest = async () => {
    try {
      console.log({...addingRequest, student_id: id, status: "Pending", created_at: new Date()});
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.post(
        `${host}/api/requests`,
        {...addingRequest, student_id: id, type: selectedType, status: "Pending", created_at: new Date()}, { headers }
      );
        
      const createdRequest = response.data;
      console.log(createdRequest);
      setRequests((pre) => {
        return [...pre, createdRequest];
      });
      resetAdding();
      addAlert('Request added successfully!', 'success');
    } catch (error) {
      addAlert('Error adding request: '+ String(error), 'error');
      console.error('Error creating request: ', error);
      setIsAdding(false);
    }
  };

  return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
      <Space size={25} direction="vertical">
        <Typography.Title level={2}>Requests</Typography.Title>
        <Button onClick={() => {
                            onAddingRequest();
                          }}
            >Add a new Request</Button>
            <Modal
              title="Add Request"
              open={isAdding}
              onOk={onAddRequest}
              onCancel={() => {
                resetAdding();
              }}
            >
              {/* Type<Input
                placeholder="Type"
                name="type"
                value={addingRequest?.type}
                onChange={(e) => {
                  setAddingRequest((pre) => {
                    return { ...pre, type: e.target.value };
                  });
                }}
              /> */}
              <p>Select Type</p>
              <Select
                placeholder="Select Type"
                value={selectedType}
                onChange={(value) => setSelectedType(value)}
                style={{ width: "100%", marginTop: "10px" }}
              >
                {types.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
              Details<Input.TextArea
                placeholder="Details"
                name="details"
                value={addingRequest?.details}
                onChange={(e) => {
                  setAddingRequest((pre) => {
                    return { ...pre, details: e.target.value };
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
          style={{ width: "400px", float: "right" }}
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
          {requests.length === 0 ? (
                <Typography.Text>No requests found.</Typography.Text>
        ) : (
          <Table
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
                    String(record.admin_id)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.type)
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.created_at).toLowerCase().includes(value.toLowerCase())
                  );
                },
              },
              {
                title: "Student ID",
                dataIndex: "student_id"
              },
              {
                title: "Admin ID",
                dataIndex: "admin_id",
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
            ]}
            rowClassName={(record, index) => {
              const style = index % 2 === 0 ? {backgroundColor: '#6f9eb5'} : {backgroundColor: '#d22222'};
              return style;
            }}
            dataSource={requests.map((record) => ({
              ...record,
              key: record.request_id,
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

export default Request;