import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Table, Typography, Layout, Space, Button, Alert, Modal, BackTop } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import "../css/UserCourse.css";
import axios from "axios";
const { Content } = Layout;

function Grade({ isAuthenticated, model, id}) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchedText, setSearchedText] = useState("");
  const [grades, setGrades] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingGrade, setAddingGrade] = useState({course_id: courseId, });
  const [isEditing, setIsEditing] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
        alert("You need to login");
        navigate("/login");
      } else {
        let url;
        if (model === 'lecturer') {
            fetch(`http://localhost:3000/api/grades/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Grades data:", data);
                setGrades(data);
            })
            .catch((error) => {
                console.error("Error fetching grades:", error);
            });
        } else if (model === 'student') {
          fetch(`http://localhost:3000/api/grades/students/${id}/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Grades data:", data);
                setGrades(data);
            })
            .catch((error) => {
                console.error("Error fetching grades:", error);
            });
        }
    }
  }, [isAuthenticated, navigate, model, courseId]);

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

  const onAddingGrade = () => {
    setIsAdding(true);
    setAddingGrade({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingGrade(null);
  };
  const onAddGrade = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.post(
        'http://localhost:3000/api/grades',
        { ...addingGrade, course_id: courseId }, { headers }
      );
  
      const createdGrade = response.data;
      console.log(createdGrade);
      const course = createdGrade.Course;
      const student = createdGrade.Student;
      setGrades((pre) => {
        return [...pre, {
          grade_id: createdGrade.grade_id,
          student_id: createdGrade.student_id,
          name: student.name,
          email: student.email,
          course: course.course_id,
          course_class_code: course.course_class_code,
          course_name: course.course_name,
          component_score: createdGrade.component_score,
          midterm_score: createdGrade.midterm_score,
          finalterm_score: createdGrade.finalterm_score,
          overall_score: createdGrade.overall_score
        }];
      });
      resetAdding();
      addAlert('Grade added successfully!', 'success');
    } catch (error) {
      addAlert('Error adding grade: ' + String(error), 'error');
      console.error('Error creating grade:', error);
      setIsAdding(false);
    }
  };

  const onDeleteGrade = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this grade record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        axios
          .delete(`http://localhost:3000/api/grades/${record.grade_id}`, {headers})
          .then((response) => {
            console.log('Record deleted:', response.message);
              setGrades((pre) => pre.filter((grade) => grade.grade_id !== record.grade_id));
            addAlert('Grade deleted successfully!', 'success');
          })
          .catch((error) => {
            addAlert('Error deleting grade: ' + String(error), 'error');
            console.error('Error deleting grade record:', error);
          });
      },
    });
  };

  const onEditGrade = (record) => {
    setIsEditing(true);
    setEditingGrade({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingGrade(null);
  };

  const onSaveEdit = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.put(`http://localhost:3000/api/grades/${editingGrade.grade_id}`, { ...editingGrade, course_id: courseId }, { headers });
      const updatedGrade = response.data;
      console.log("Updated grade: ");
      console.log(updatedGrade);
      const course = updatedGrade.Course;
      const student = updatedGrade.Student;
      setGrades((pre) => {
        return pre.map((grade) => {
          if (grade.grade_id === updatedGrade.grade_id) {
            return {
              grade_id: updatedGrade.grade_id,
              student_id: updatedGrade.student_id,
              name: student.name,
              email: student.email,
              course_class_code: course.course_class_code,
              course_name: course.course_name,
              component_score: updatedGrade.component_score,
              midterm_score: updatedGrade.midterm_score,
              finalterm_score: updatedGrade.finalterm_score,
              overall_score: updatedGrade.overall_score
            };
          } else {
            return grade;
          }
        });
      });
      addAlert('Grade updated successfully!', 'success');
      resetEditing();
    } catch (error) {
      addAlert('Error updating grade: ' + String(error), 'error');
      console.error('Error updating grade record:', error);
      setIsEditing(false);
    }
  };

  return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
      <Space size={25} direction="vertical">
          <Typography.Title level={2}>Grades for Course {courseId}</Typography.Title>
          <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Back
            </Button>
          {model === "lecturer" && (
          <>
            <Button onClick={onAddingGrade}>Add a new grade</Button>
          </>
        )}
          <Modal
              title="Add Grade"
              open={isAdding && model==='lecturer'}
              onOk={onAddGrade}
              onCancel={() => {
                resetAdding();
              }}
            >
              <Input
                placeholder="Student ID"
                name="student_id"
                value={addingGrade?.student_id}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, student_id: e.target.value };
                  });
                }}
              />
              {/* <Input
                placeholder="Course ID"
                name="course_id"
                value={addingGrade?.course_id}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, course_id: e.target.value };
                  });
                }}
                disabled={false}
              /> */}
              <Input
                placeholder="Component score"
                name="component_score"
                value={addingGrade?.component_score}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, component_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Midterm score"
                name="midterm_score"
                value={addingGrade?.midterm_score}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, midterm_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Finalterm score"
                name="finalterm_score"
                value={addingGrade?.finalterm_score}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, finalterm_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Overall"
                name="overall_score"
                value={addingGrade?.overall_score}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, overall_score: e.target.value };
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
              style={{ width: '500px', float: 'right' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
          {grades.length === 0 ? (
            <Typography.Text>No grades found for this course.</Typography.Text>
        ) : (
          <Table 
          columns={[
            {
              title: "Grade ID",
              dataIndex: "grade_id",
              filteredValue: [searchedText],
              onFilter: (value, record) => {
                return (
                  String(record.grade_id).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.student_id).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.course_id).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.student_name).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.course_name).toLowerCase().includes(value.toLowerCase()) ||
                  String(record.course_class_code).toLowerCase().includes(value.toLowerCase()) 
                );
              }
            },
            {
              title: "Student ID",
              dataIndex: ["Student", "student_id"],
            },
            {
              title: "Student name",
              dataIndex: ["Student", "name"],
            },
            {
              title: "Email",
              dataIndex: ["Student", "email"],
            },
            {
              title: "Course ID",
              dataIndex: ["Course", "course_id"],
            },
            {
              title: "Course class code",
              dataIndex: ["Course", "course_class_code"],
            },
            {
              title: "Course name",
              dataIndex: ["Course", "course_name"],
            },
            {
                title: "Component score",
                dataIndex: "component_score",
              },
              {
                title: "Midterm score",
                dataIndex: "midterm_score",
              },
              {
                title: "Finalterm score",
                dataIndex: "finalterm_score",
              },
              {
                title: "Overall score",
                dataIndex: "overall_score",
              },
              {
                title: "Actions",
                render: (record) => {
                  return (
                    <>
                      <EditOutlined
                        onClick={() => {
                          onEditGrade(record);
                        }}
                      />
                      <DeleteOutlined
                        onClick={() => {
                          onDeleteGrade(record);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                      />
                    </>
                  );
                },
              },
          ]}
          dataSource={grades.map((record) => ({
            ...record,
            key: record.grade_id,
          }))}
          pagination={{
            pageSize: 20,
          }}
        ></Table>
        )}
        <Modal
              title="Edit Grade"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              <Input
                placeholder="Student ID"
                name="student_id"
                value={editingGrade?.student_id}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, student_id: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Component score"
                name="component_score"
                value={editingGrade?.component_score}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, component_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Midterm score"
                name="midterm_score"
                value={editingGrade?.midterm_score}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, midterm_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Finalterm score"
                name="finalterm_score"
                value={editingGrade?.finalterm_score}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, finalterm_score: e.target.value };
                  });
                }}
              />
              <Input
                placeholder="Overall score"
                name="overall_score"
                value={editingGrade?.overall_score}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, overall_score: e.target.value };
                  });
                }}
              />
            </Modal>
      </Space>
      <BackTop />
    </Content>
  );
}

export default Grade;
