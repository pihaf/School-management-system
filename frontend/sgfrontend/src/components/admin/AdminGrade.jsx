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

function AdminGrade({ isAuthenticated, adminToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingGrade, setAddingGrade] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/admin/login");
    } else {
      setLoading(true);
      fetch(`${host}/api/admin/grades`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const processedData = data.map((record) => {
            return {
              ...record,
              ...record.Course,
              ...record.Student,
            };
          });
          setDataSource(processedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching grades:", error);
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
      const headers = { Authorization: `Bearer ${localStorage.getItem("adminToken")}` };
      const response = await axios.post(
        `${host}/api/admin/grades`,
        addingGrade,
        { headers }
      );

      const createdGrade = response.data;
      console.log(createdGrade);
      const course = createdGrade.Course;
      const student = createdGrade.Student;
      setDataSource((pre) => {
        return [
          ...pre,
          {
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
            overall_score: createdGrade.overall_score,
          },
        ];
      });
      resetAdding();
      addAlert("Grade added successfully!", "success");
    } catch (error) {
      addAlert("Error adding grade: " + String(error), "error");
      console.error("Error creating grade:", error);
      setIsAdding(false);
    }
  };
  const onDeleteGrade = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this grade record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem("adminToken")}` };
        axios
          .delete(`${host}/api/admin/grades/${record.grade_id}`, {
            headers,
          })
          .then((response) => {
            // Handle successful deletion
            console.log("Record deleted:", response.message);

            // Update the local state (dataSource) if needed
            setDataSource((pre) =>
              pre.filter((grade) => grade.grade_id !== record.grade_id)
            );
            addAlert("Grade deleted successfully!", "success");
          })
          .catch((error) => {
            addAlert("Error deleting grade: " + String(error), "error");
            console.error("Error deleting grade record:", error);
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
      const headers = { Authorization: `Bearer ${localStorage.getItem("admiToken")}` };
      const response = await axios.put(
        `${host}/api/admin/grades/${editingGrade.grade_id}`,
        editingGrade,
        { headers }
      );
      const updatedGrade = response.data;
      console.log("Updated grade: ");
      console.log(updatedGrade);
      const course = updatedGrade.Course;
      const student = updatedGrade.Student;
      setDataSource((pre) => {
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
              overall_score: updatedGrade.overall_score,
            };
          } else {
            return grade;
          }
        });
      });
      addAlert("Grade updated successfully!", "success");
      resetEditing();
    } catch (error) {
      addAlert("Error updating grade: " + String(error), "error");
      console.error("Error updating grade record:", error);
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
            <Typography.Title level={2}>Grades</Typography.Title>
            <Button
              onClick={() => {
                onAddingGrade();
              }}
              style={{ width: "170px", height: "40px" }}
            >
              Add a new Grade
            </Button>
            <Modal
              title="Add Grade"
              open={isAdding}
              onOk={onAddGrade}
              onCancel={() => {
                resetAdding();
              }}
            >
              Student ID
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
              Course ID
              <Input
                placeholder="Course ID"
                name="course_id"
                value={addingGrade?.course_id}
                onChange={(e) => {
                  setAddingGrade((pre) => {
                    return { ...pre, course_id: e.target.value };
                  });
                }}
              />
              Component score
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
              Midterm score
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
              Finalterm score
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
              Overall
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
                  title: "Grade ID",
                  dataIndex: "grade_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.grade_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.student_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.course_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.student_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.course_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.course_class_code)
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
                  title: "Student name",
                  dataIndex: "name",
                },
                {
                  title: "Student email",
                  dataIndex: "email",
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
                  title: "Overall",
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
              dataSource={dataSource.map((record) => ({
                ...record,
                key: record.grade_id,
              }))}
              pagination={{
                pageSize: 10,
              }}
            ></Table>
            <Modal
              title="Edit Grade"
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
                value={editingGrade?.student_id}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, student_id: e.target.value };
                  });
                }}
              />
              Course ID
              <Input
                placeholder="Course ID"
                name="course_id"
                value={editingGrade?.course_id}
                onChange={(e) => {
                  setEditingGrade((pre) => {
                    return { ...pre, course_id: e.target.value };
                  });
                }}
              />
              Component score
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
              Midterm score
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
              Finalterm score
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
              Overall score
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
        </Content>
      </div>
      <FloatButton.BackTop />
      <AdminFooter />
    </div>
  );
}
export default AdminGrade;
