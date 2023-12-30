import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Modal, Input, Alert, Typography } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from 'axios';

function Profile({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true); 

  useEffect(() =>
  {
    if (!isAuthenticated)
    {
      alert("You need to login");
      navigate("/login");
    } else
    {
      const fetchProfileData = async () =>
      {
        try
        {
          const response = await fetch(
            `http://localhost:3000/api/${model}s/profile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          );

          if (response.ok)
          {
            const data = await response.json();
            setProfileData(data);
          } else
          {
            navigate("/login");
          }
        } catch (error)
        {
          console.error(error);
        } finally {
          setIsFetchingProfile(false); 
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated, model, navigate]);

  if (isFetchingProfile)
  {
    return <div>Loading...</div>; // Return a loading state while fetching the profile data
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

  const onEditProfile = (record) => {
    setIsEditing(true);
    setEditingProfile({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProfile(null);
  };

  const onSaveEdit = async () => {
    try {
      const updatedData = {
        ...profileData,
        ...editingProfile
      };
      console.log("Current profile: ", updatedData);
      const response = await axios.put(`http://localhost:3000/api/${model}s/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedProfile = response.data;
      console.log("Updated profile: ");
      console.log(updatedProfile);
      setProfileData(updatedProfile);
      addAlert('Updated successfully!', 'success');
      resetEditing();
    } catch (error) {
      addAlert('Error updating profile: ' + String(error), 'error');
      console.error('Error updating profile:', error);
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
    {
      title: "",
      render: (record) => {
        return (
          <>
            {record.editable && ( // Only render the edit button for rows with editable flag set to true
              <EditOutlined
                onClick={() => {
                  onEditProfile(record);
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  const data =
    model === "lecturer"
    ? [
        { key: "1", field: "Name", value: profileData.name, editable: false },
        { key: "2", field: "Email", value: profileData.email , editable: true },
        { key: "3", field: "Department", value: profileData.department , editable: true },
        { key: "4", field: "Subject/Lab", value: profileData["subject/lab"] , editable: true },
        { key: "5", field: "Job Title", value: profileData.job_title , editable: true },
        { key: "6", field: "Phone Number", value: profileData.phone_number , editable: true },
        { key: "7", field: "Profile Image", value: profileData.profile_image, editable: true  },
        { key: "8", field: "Username", value: profileData.username , editable: false },
        { key: "9", field: "Password", value: profileData.password, editable: true  },

      ]
    : [
        { key: "1", field: "Student ID", value: profileData.student_id, editable: false  },
        { key: "2", field: "Class", value: profileData.student_class, editable: false  },
        { key: "3", field: "Name", value: profileData.name, editable: false  },
        {
          key: "4",
          field: "Date of Birth",
          value: new Date(profileData.date_of_birth).toLocaleDateString(), editable: false 
        },
        { key: "5", field: "Gender", value: profileData.gender, editable: true  },
        { key: "6", field: "Email", value: profileData.email, editable: false  },
        { key: "7", field: "Phone Number", value: profileData.phone_number, editable: true  },
        { key: "8", field: "Place of birth", value: profileData.place_of_birth, editable: false  },
        { key: "9", field: "Citizen ID", value: profileData.citizen_id, editable: false  },
        { key: "10", field: "Profile Image", value: profileData.profile_image, editable: true  },
        { key: "11", field: "Username", value: profileData.username, editable: false  },
        { key: "12", field: "Password", value: profileData.password, editable: true  },
      ];

  return (
    <div style={ { justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
      <Typography.Title level={4}>Profile</Typography.Title>
      <ReloadOutlined
              onClick={() => {
                window.location.reload();
              } }
              style={{ marginLeft: 12 }} />
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
      <Space>
        <Table columns={ columns } dataSource={ data } pagination={ false } />
        <Modal
              title="Edit Profile"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              {model === 'student' ? (
                <>
                  <Input
                    placeholder="Student ID"
                    name="student_id"
                    value={editingProfile?.student_id}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, student_id: e.target.value };
                      });
                    }}
                  />
                
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
                  <Input
                    placeholder="Gender"
                    name="gender"
                    value={editingProfile?.gender}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, gender: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Date of birth"
                    name="date_of_birth"
                    value={editingProfile?.date_of_birth}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, date_of_birth: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Class"
                    name="student_class"
                    value={editingProfile?.student_class}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, student_class: e.target.value };
                      });
                    }}
                  />
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
                  <Input
                    placeholder="Place of birth"
                    name="place_of_birth"
                    value={editingProfile?.place_of_birth}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, place_of_birth: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Citizen ID"
                    name="citizen_id"
                    value={editingProfile?.citizen_id}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, citizen_id: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Phone number"
                    name="phone_number"
                    value={editingProfile?.phone_number}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, phone_number: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Username"
                    name="username"
                    value={editingProfile?.username}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, username: e.target.value };
                      });
                    }}
                  />
                  <Input
                    placeholder="Password"
                    name="password"
                    value={editingProfile?.password}
                    onChange={(e) => {
                      setEditingProfile((pre) => {
                        return { ...pre, password: e.target.value };
                      });
                    }}
                  />
              </>
              ) : model === 'lecturer' ? (
                <>
                {/* Render inputs for lecturer */}
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
                <Input
                  placeholder="Department"
                  name="department"
                  value={editingProfile?.department}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, department: e.target.value };
                    });
                  }}
                />
                <Input
                  placeholder="Subject/Lab"
                  name="subject/lab"
                  value={editingProfile?.['subject/lab']}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, 'subject/lab': e.target.value };
                    });
                  }}
                />
                <Input
                  placeholder="Job title"
                  name="job_title"
                  value={editingProfile?.job_title}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, job_title: e.target.value };
                    });
                  }}
                />
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
                <Input
                  placeholder="Phone number"
                  name="phone_number"
                  value={editingProfile?.phone_number}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, phone_number: e.target.value };
                    });
                  }}
                />
                <Input
                  placeholder="Username"
                  name="username"
                  value={editingProfile?.username}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, username: e.target.value };
                    });
                  }}
                />
                <Input
                  placeholder="Password"
                  name="password"
                  value={editingProfile?.password}
                  onChange={(e) => {
                    setEditingProfile((pre) => {
                      return { ...pre, password: e.target.value };
                    });
                  }}
                />
              </>
            ) : null}
          </Modal>
      </Space>
    </div>
  );
  //   return (
  //     <div>
  //       <h1>Profile</h1>
  //       {model === 'lecturer' ? (
  //         <div>
  //           <p>Name: {profileData.name}</p>
  //           <p>Email: {profileData.email}</p>
  //           <p>Department: {profileData.department}</p>
  //           <p>Subject/Lab: {profileData['subject/lab']}</p>
  //           <p>Job Title: {profileData.job_title}</p>
  //           <p>Phone Number: {profileData.phone_number}</p>
  //           <p>Profile Image: {profileData.profile_image}</p>
  //         </div>
  //       ) : (
  //         <div>
  //           <p>Student ID: {profileData.student_id}</p>
  //           <p>Class: {profileData.student_class}</p>
  //           <p>Name: {profileData.name}</p>
  //           <p>Date of Birth: {new Date(profileData.date_of_birth).toLocaleDateString()}</p>
  //           <p>Gender: {profileData.gender}</p>
  //           <p>Place of Birth: {profileData.place_of_birth}</p>
  //           <p>Citizen ID: {profileData.citizen_id}</p>
  //           <p>Email: {profileData.email}</p>
  //           <p>Phone Number: {profileData.phone_number}</p>
  //           <p>Profile Image: {profileData.profile_image}</p>
  //         </div>
  //       )}
  //     </div>
  //   );
}

export default Profile;
