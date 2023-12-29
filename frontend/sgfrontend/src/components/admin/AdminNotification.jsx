import { Avatar, Rate, Space, Table, Typography, Input, Button, Modal, Alert, Select } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

const host = 'http://localhost:3000';
const routes = [
  { value: host + '/api/admin/notifications/students', label: 'Send to All Students' , params: [] },
  { value: host + '/api/admin/notifications/lecturers', label: 'Send to All Lecturers' , params: [] },
  { value: host + '/api/admin/notifications/users', label: 'Send to All Users', params: []  },
  { value: host + '/api/admin/notifications/:courseId', label: 'Send to Course Students', params: ['courseId']  },
  { value: host + '/api/admin/notifications/lecturers/:lecturerId', label: 'Send to Specific Lecturer' , params: ['lecturerId'] },
  { value: host + '/api/admin/notifications/students/:studentId', label: 'Send to Specific Student' , params: ['studentId'] },
];

function AdminNotification({ isAuthenticated }) {
  const navigate = useNavigate();
  const [dataSourceSentAdmin, setDataSourceSentAdmin] = useState([]);
  const [dataSourceSentLecturer, setDataSourceSentLecturer] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addingNotification, setAddingNotification] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/admin/login');
    } else {
        fetch(`http://localhost:3000/api/admin/notifications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.adminNotifications)) {
                    setDataSourceSentAdmin(data.adminNotifications);
                  }
              
                  if (Array.isArray(data.lecturerNotifications)) {
                    setDataSourceSentLecturer(data.lecturerNotifications);
                    console.log(data.lecturerNotifications);
                  }
              
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
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

  const onAddingNotification = () => {
    setIsAdding(true);
    setAddingNotification({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingNotification(null);
  };
  const onAddNotification = () => {
    // Check if a route is selected
    if (selectedRoute !== '') {
      // Make API call based on the selected route
      let route = selectedRoute;
      // Replace route params with actual values
      for (const param in routeParams) {
        route = route.replace(`:${param}`, routeParams[param]);
      }
      fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({...addingNotification, status: 'Sent'}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Notification sent:', data);

          setSelectedRoute('');
          setRouteParams({});
          resetAdding();
          addAlert('Notification sent successfully!', 'success');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        })
        .catch((error) => {
          addAlert('Error sending notification: ' + String(error), 'error');
          console.error('Error sending notification:', error);
        });
    } else {
      // Display an error message if no route is selected
      alert('Please select a route to send the notification');
    }
  };

  const handleParamChange = (param, value) => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
  };

  return (
    <div className="App">
      <AdminHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        
        <Space size={25} direction="vertical">
            <Typography.Title level={2}>Notifications sent by admins</Typography.Title>
            <Button onClick={onAddingNotification}>Add a new notification</Button>
            <Modal
              title="Add Notification"
              open={isAdding}
              onOk={onAddNotification}
              onCancel={() => {
                resetAdding();
              } }
            >
              <Input
                placeholder="Title"
                name="title"
                value={addingNotification?.title}
                onChange={(e) => {
                  setAddingNotification((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                } } />
              <Input
                placeholder="Details"
                name="details"
                value={addingNotification?.details}
                onChange={(e) => {
                  setAddingNotification((pre) => {
                    return { ...pre, details: e.target.value };
                  });
                } } />
              <Select
                placeholder="Select Route"
                value={selectedRoute}
                onChange={(value) => setSelectedRoute(value)}
                style={{ width: '100%', marginTop: '10px' }}
              >
                {routes.map((route) => (
                  <Select.Option key={route.value} value={route.value}>
                    {route.label}
                  </Select.Option>
                ))}
              </Select>

              {selectedRoute && routes.find((route) => route.value === selectedRoute)?.params.map((param) => (
                <Input
                  key={param}
                  placeholder={param}
                  value={routeParams[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  style={{ marginTop: '10px' }}
                />
              ))}
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
            {dataSourceSentAdmin.length === 0 ? (
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
                    title: "Admin email",
                    dataIndex: "email",
                  },
                  {
                    title: "Lecturer ID",
                    dataIndex: "lecturer_id",
                  },
                  {
                    title: "Lecturer name",
                    dataIndex: ["Lecturer", "name"],
                  },
                  {
                    title: "Lecturer email",
                    dataIndex: ["Lecturer", "email"],
                  },
                  {
                    title: "Student ID",
                    dataIndex: "student_id",
                  },
                  {
                    title: "Student name",
                    dataIndex: ["Student", "name"],
                  },
                  {
                    title: "Student email",
                    dataIndex: ["Student", "email"],
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
                dataSource={dataSourceSentAdmin.map((record) => ({
                  ...record,
                  key: record.notification_id,
                }))}
                pagination={{
                  pageSize: 20,
                }}
              ></Table>
            )}
            <Typography.Title level={2}>Notifications sent by lecturers</Typography.Title>
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
            {dataSourceSentLecturer.length === 0 ? (
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
                    title: "Student ID",
                    dataIndex: "student_id",
                  },
                  {
                    title: "Student name",
                    dataIndex: ["Student", "name"],
                  },
                  {
                    title: "Student email",
                    dataIndex: ["Student", "email"],
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
                dataSource={dataSourceSentLecturer.map((record) => ({
                  ...record,
                  key: record.notification_id,
                }))}
                pagination={{
                  pageSize: 20,
                }}
              ></Table>
            )}
            </Space>
      </div>
      <AdminFooter />
  </div>
);
}
export default AdminNotification;

