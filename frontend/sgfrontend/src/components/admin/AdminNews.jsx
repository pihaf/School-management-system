import { Avatar, Rate, Space, Table, Typography, Input, Image, Button, Modal, Alert, BackTop } from "antd";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function AdminNews({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingNews, setAddingNews] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/admin/login');
    } else {
        setLoading(true);
        fetch("http://localhost:3000/api/news", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
          setDataSource(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching news:', error);
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

  const onAddingNews = () => {
    setIsAdding(true);
    setAddingNews({});
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingNews(null);
  };
  const onAddNews = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${adminToken}` };
      addingNews.created_at = new Date();
      const response = await axios.post(
        'http://localhost:3000/api/admin/news',
        addingNews, { headers }
      );
  
      const createdNews = response.data;
      console.log(createdNews);
      setDataSource((pre) => {
        return [...pre, createdNews];
      });
      resetAdding();
      addAlert('News added successfully!', 'success');
    } catch (error) {
      addAlert('Error adding new: ' + String(error), 'error');
      console.error('Error creating new:', error);
      setIsAdding(false);
    }
  };
  const onDeleteNews = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this new record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        const adminToken = localStorage.getItem('adminToken');
        const headers = { Authorization: `Bearer ${adminToken}` };
        axios
          .delete(`http://localhost:3000/api/admin/news/${record.new_id}`, {headers})
          .then((response) => {
            // Handle successful deletion
            console.log('Record deleted:', response.message);
  
            // Update the local state (dataSource) if needed
            setDataSource((pre) => pre.filter((news) => news.new_id !== record.new_id));
            addAlert('News deleted successfully!', 'success');
          })
          .catch((error) => {
            addAlert('Error deleting new: ' + String(error), 'error');
            console.error('Error deleting new record:', error);
          });
      },
    });
  };
  const onEditNews = (record) => {
    setIsEditing(true);
    setEditingNews({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingNews(null);
  };

  const onSaveEdit = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${adminToken}` };
      editingNews.updated_at = new Date();
      const response = await axios.put(`http://localhost:3000/api/admin/news/${editingNews.new_id}`, editingNews, { headers });
      const updatedNews = response.data;
      console.log("Updated news: ");
      console.log(updatedNews);
      setDataSource((pre) => {
        return pre.map((news) => {
          if (news.new_id === updatedNews.new_id) {
            return updatedNews;
          } else {
            return news;
          }
        });
      });
      addAlert('News updated successfully!', 'success');
      resetEditing();
    } catch (error) {
      addAlert('Error updating news: ' + String(error), 'error');
      console.error('Error updating news record:', error);
      setIsEditing(false);
    }
  };

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>News</Typography.Title>
            <Button onClick={() => {
                            onAddingNews();
                          }}
            >Add a new News</Button>
            <Modal
              title="Add News"
              open={isAdding}
              onOk={onAddNews}
              onCancel={() => {
                resetAdding();
              }}
            >
              Title<Input
                placeholder="Title"
                name="title"
                value={addingNews?.title}
                onChange={(e) => {
                  setAddingNews((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                }}
              />
              Content<Input.TextArea
                placeholder="Content"
                name="content"
                value={addingNews?.content}
                onChange={(e) => {
                  setAddingNews((pre) => {
                    return { ...pre, content: e.target.value };
                  });
                }}
              />
              <p>Image</p><Input
                placeholder="Image"
                name="image"
                value={addingNews?.image}
                onChange={(e) => {
                  setAddingNews((pre) => {
                    return { ...pre, image: e.target.value };
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
            <Table
              loading={loading}
              columns={[
                {
                  title: "Image",
                  dataIndex: "image",
                  render: (link) => {
                    return <Image src={link} width={200}/>;
                  },
                },
                {
                  title: "News ID",
                  dataIndex: "new_id",
                  filteredValue: [searchedText],
                  onFilter: (value, record) => {
                    return (
                      String(record.new_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.title).toLowerCase().includes(value.toLowerCase()) 
                    );
                  }
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Content",
                  dataIndex: "content",
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
                            onEditNews(record);
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            onDeleteNews(record);
                          }}
                          style={{ color: "red", marginLeft: 12 }}
                        />
                      </>
                    );
                  },
                },
              ]}
              dataSource={dataSource.map((record) => ({ ...record, key: record.new_id}))}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
            <Modal
              title="Edit News"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={onSaveEdit}
            >
              Title<Input
                placeholder="Title"
                name="title"
                value={editingNews?.title}
                onChange={(e) => {
                  setEditingNews((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                }}
              />
              Content<Input.TextArea
                placeholder="Content"
                name="content"
                value={editingNews?.content}
                onChange={(e) => {
                  setEditingNews((pre) => {
                    return { ...pre, content: e.target.value };
                  });
                }}
              />
              Image<Input
                placeholder="Image"
                name="image"
                value={editingNews?.image}
                onChange={(e) => {
                  setEditingNews((pre) => {
                    return { ...pre, image: e.target.value };
                  });
                }}
              />
            </Modal>
          </Space>
        </div>
        <BackTop />
        <AdminFooter />
    </div>
  );
}
export default AdminNews;
