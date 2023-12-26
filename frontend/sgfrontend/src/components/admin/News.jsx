import { Avatar, Rate, Space, Table, Typography, Input, Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

function News({ isAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState("");

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

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>News</Typography.Title>
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
                    return <Image src={link} />;
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
                  dataIndex: "tile",
                },
                {
                  title: "Content",
                  dataIndex: "content",
                },
                {
                  title: "Created at",
                  dataIndex: "created_at",
                },
              ]}
              dataSource={dataSource}
              pagination={{
                pageSize: 20,
              }}
            ></Table>
          </Space>
        </div>
        <AdminFooter />
    </div>
  );
}
export default News;
