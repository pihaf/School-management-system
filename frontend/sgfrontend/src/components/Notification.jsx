import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Table, Typography, Layout, Space, Button, Alert, Modal, FloatButton } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import "../css/UserCourse.css";
import axios from "axios";
import host from "../../config";
const { Content } = Layout;

function Notification({ isAuthenticated, model, id, token }) {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [dataSourceReceive, setDataSourceReceive] = useState([]);
  const [dataSourceSent, setDataSourceSent] = useState([]);
  const [dataFromAdmin, setDataFromAdmin] = useState([]);
  const [dataFromLecturer, setDataFromLecturer] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingNotification, setAddingNotification] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      fetch(`${host}/api/notifications/${model}s/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        })
        .then((response) => response.json())
        .then((data) => {
            //console.log("Notifications data:", data);

            if (model=== 'lecturer') {
              setDataSourceReceive(data);
            } else {
              if (Array.isArray(data.adminNotifications)) {
                setDataFromAdmin(data.adminNotifications);
              }
          
              if (Array.isArray(data.lecturerNotifications)) {
                setDataFromLecturer(data.lecturerNotifications);
              }
            }
          
        })
        .catch((error) => {
            console.error("Error fetching notifications:", error);
        });
        if (model === 'lecturer'){
          fetch(`${host}/api/notifications/${model}/sent/${id}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Notifications data:", data);
                const uniqueData = data.reduce((accumulator, current) => {
                  // Check if an object with the same lecturer_id, course_id, title, and details already exists in the accumulator
                  const exists = accumulator.some(
                    (item) =>
                      item.lecturer_id === current.lecturer_id &&
                      item.course_id === current.course_id &&
                      item.title === current.title &&
                      item.details === current.details
                  );
            
                  // If the object doesn't exist, add it to the accumulator
                  if (!exists) {
                    accumulator.push(current);
                  }
            
                  return accumulator;
                }, []);
            
                setDataSourceSent(uniqueData);
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
            });
          }
  }
  }, [isAuthenticated, navigate, id, model]);
  
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

  const onAddingNotification = () => {
    setIsAdding(true);
    setAddingNotification({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingNotification(null);
  };
  const onAddNotification = async () => {
    try {
      console.log("addingNotification: ", addingNotification);
      const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
      const response = await axios.post(
        `${host}/api/notifications/lecturers/course/${addingNotification.course_id}`,
        {...addingNotification, status: 'Sent', created_at: new Date()}, { headers }
      );
  
      // const createdNotification = response.data;
      // console.log(createdNotification);
      // console.log("dataSourceSent before:", dataSourceSent);

      setDataSourceSent((pre) => {
        return [...pre, {...addingNotification, status: 'Sent', created_at: new Date()}];
      });
      // console.log("dataSourceSent after:", dataSourceSent);
      resetAdding();
      addAlert('Notification sent successfully!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      addAlert('Error sending notification: ' + String(error), 'error');
      console.error('Error creating notification:', error);
      setIsAdding(false);
    }
  };

  return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
      {model==='lecturer' ? (
            <><Space size={25} direction="vertical">
          <Typography.Title level={2}>Notifications received</Typography.Title>
          <ReloadOutlined
            onClick={() => {
              window.location.reload();
            } }
            style={{ marginLeft: 12 }} />
          <Input.Search
            placeholder="Search here..."
            style={{ width: '500px', float: 'right' }}
            onSearch={(value) => {
              setSearchedText(value);
            } }
            onChange={(e) => {
              setSearchedText(e.target.value);
            } } />
          {dataSourceReceive.length === 0 ? (
            <Typography.Text>No notifications found.</Typography.Text>
          ) : (
            <Table
              columns={[
                {
                  title: "Notification ID",
                  dataIndex: "notification_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.notification_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.admin_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.title).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.created_at).toLowerCase().includes(value.toLowerCase())
                    );
                  }
                },
                {
                  title: "Admin ID",
                  dataIndex: "admin_id",
                },
                {
                  title: "Title",
                  dataIndex: "title",
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
              ]}
              dataSource={dataSourceReceive.map((record) => ({
                ...record,
                key: record.notification_id,
              }))}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
          )}
        </Space><Space size={25} direction="vertical">
            <Typography.Title level={2}>Notifications sent</Typography.Title>
            <Button onClick={onAddingNotification}>Add a new notification to a course</Button>
            <Modal
              title="Add Notification"
              open={isAdding && model === 'lecturer'}
              onOk={onAddNotification}
              onCancel={() => {
                resetAdding();
              } }
            >
              Course ID<Input
                placeholder="Course ID"
                name="course_id"
                value={addingNotification?.course_id}
                onChange={(e) => {
                  setAddingNotification((pre) => {
                    return { ...pre, course_id: e.target.value };
                  });
                } }
                disabled={false} />
              Title<Input
                placeholder="Title"
                name="title"
                value={addingNotification?.title}
                onChange={(e) => {
                  setAddingNotification((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                } } />
              Details<Input.TextArea
                placeholder="Details"
                name="details"
                value={addingNotification?.details}
                onChange={(e) => {
                  setAddingNotification((pre) => {
                    return { ...pre, details: e.target.value };
                  });
                } } />
            </Modal>
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                message={alert.message}
                type={alert.type}
                showIcon
                closable
                afterClose={() => removeAlert(alert.id)} />
            ))}
            <ReloadOutlined
              onClick={() => {
                window.location.reload();
              } }
              style={{ marginLeft: 12 }} />
            <Input.Search
              placeholder="Search here..."
              style={{ width: '500px', float: 'right' }}
              onSearch={(value) => {
                setSearchedText(value);
              } }
              onChange={(e) => {
                setSearchedText(e.target.value);
              } } />
            {dataSourceSent.length === 0 ? (
              <Typography.Text>No notifications found.</Typography.Text>
            ) : (
              <Table
                columns={[
                  {
                    title: "Notification ID",
                    dataIndex: "notification_id",
                    filteredValue: [searchedText],
                    onFilter: (value, record) => {
                      return (
                        String(record.notification_id).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.title).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.created_at).toLowerCase().includes(value.toLowerCase())
                      );
                    }
                  },
                  {
                    title: "Course ID",
                    dataIndex: "course_id",
                  },
                  {
                    title: "Course class code",
                    dataIndex: ["Course", "course_class_code"]
                  },
                  {
                    title: "Course name",
                    dataIndex: ["Course", "course_name"]
                  },
                  {
                    title: "Title",
                    dataIndex: "title",
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
                ]}
                dataSource={dataSourceSent.map((record) => ({
                  ...record,
                  key: record.notification_id,
                }))}
                pagination={{
                  pageSize: 20,
                }}
              ></Table>
            )}
          </Space></>
      ):(
        <><Space size={25} direction="vertical">
            <Typography.Title level={2}>Notifications received from admins</Typography.Title>
            <ReloadOutlined
              onClick={() => {
                window.location.reload();
              } }
              style={{ marginLeft: 12 }} />
            <Input.Search
              placeholder="Search here..."
              style={{ width: '500px', float: 'right' }}
              onSearch={(value) => {
                setSearchedText(value);
              } }
              onChange={(e) => {
                setSearchedText(e.target.value);
              } } />
            {dataFromAdmin.length === 0 ? (
              <Typography.Text>No notifications found.</Typography.Text>
            ) : (
              <Table
                columns={[
                  {
                    title: "Notification ID",
                    dataIndex: "notification_id",
                    filteredValue: [searchedText],
                    onFilter: (value, record) => {
                      return (
                        String(record.notification_id).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.title).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.created_at).toLowerCase().includes(value.toLowerCase())
                      );
                    }
                  },
                  {
                    title: "Admin ID",
                    dataIndex: "admin_id",
                  },
                  {
                    title: "Admin email",
                    dataIndex: ["Admin", "email"],
                  },
                  {
                    title: "Course ID",
                    dataIndex: "course_id",
                  },
                  {
                    title: "Course class code",
                    dataIndex: ["Course", "course_class_code"],
                  },
                  {
                    title: "Title",
                    dataIndex: "title",
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
                ]}
                dataSource={dataFromAdmin.map((record) => ({
                  ...record,
                  key: record.notification_id,
                }))}
                pagination={{
                  pageSize: 20,
                }}
              ></Table>
            )}
          </Space>
            <Space size={25} direction="vertical">
              <Typography.Title level={2}>Notifications received from lecturers</Typography.Title>
              <ReloadOutlined
                onClick={() => {
                  window.location.reload();
                } }
                style={{ marginLeft: 12 }} />
              <Input.Search
                placeholder="Search here..."
                style={{ width: '500px', float: 'right' }}
                onSearch={(value) => {
                  setSearchedText(value);
                } }
                onChange={(e) => {
                  setSearchedText(e.target.value);
                } } />
              {dataFromLecturer.length === 0 ? (
                <Typography.Text>No notifications found.</Typography.Text>
              ) : (
                <Table
                  columns={[
                    {
                      title: "Notification ID",
                      dataIndex: "notification_id",
                      filteredValue: [searchedText],
                      onFilter: (value, record) => {
                        return (
                          String(record.notification_id).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.student_id).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.course_id).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.lecturer_id).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                          String(record.created_at).toLowerCase().includes(value.toLowerCase())
                        );
                      }
                    },
                    {
                      title: "Lecturer name",
                      dataIndex: ["Lecturer", 'name']
                    },
                    {
                      title: "Lecturer email",
                      dataIndex: ["Lecturer", 'email']
                    },
                    {
                      title: "Course class code",
                      dataIndex: ["Course", 'course_class_code']
                    },
                    {
                      title: "Course name",
                      dataIndex: ["Course", 'course_name']
                    },
                    {
                      title: "Title",
                      dataIndex: "title",
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
                  ]}
                  dataSource={dataFromLecturer.map((record) => ({
                    ...record,
                    key: record.notification_id,
                  }))}
                  pagination={{
                    pageSize: 20,
                  }}
                ></Table>
              )}
            </Space></>
      )}
      <FloatButton.BackTop />
    </Content>
  );
}

export default Notification;