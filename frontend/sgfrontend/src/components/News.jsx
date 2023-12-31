import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Table, Typography, Layout, Space, Card, Tag, List, FloatButton} from "antd";
import host from "../../config";
import "../css/UserCourse.css";
const { Content } = Layout;

function News({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to login");
      navigate("/login");
    } else {
      fetch(`${host}/api/news`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("News data:", data);
          setDataSource(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    }
  }, [isAuthenticated, navigate, model]);

  if (loading) {
    return <p>Loading...</p>; // or render a loading state
  }

//   const filteredData = searchedText
//     ? dataSource.filter((item) =>
//         item.title.toLowerCase().includes(searchedText.toLowerCase())
//       )
//     : dataSource;

return (
    <Content
      style={{
        margin: "0px 28px 0px 24px",
      }}
    >
        <Typography.Title level={2}>News</Typography.Title>
        {/* <Input.Search
          placeholder="Search here..."
          style={{ width: "400px", float: "right" }}
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        /> */}
        {dataSource.length === 0 ? (
          <p>No news found.</p>
        ) : (
          <List
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item key={item.new_id}>
                <List.Item.Meta
                  title={<Link to={`/news/${item.new_id}`}>{item.title}</Link>}
                  description={item.content}
                  avatar={<img src={item.image} alt="News Image" width={150}/>}
                  style={{ width: "100%" }} 
                />
              </List.Item>
            )}
            pagination={{
                pageSize: 5, 
                position: "bottom", 
              }}
              style={{
                float: "right", 
                width: "100%", 
              }}
          />
        )}
        <FloatButton.BackTop />
    </Content>
  );
}

        {/* <Table 
            columns={[
                {
                    title: "News ID",
                    dataIndex: "new_id",
                    filteredValue: [searchedText],
                    onFilter: (value, record) => {
                      return (
                        String(record.new_id).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.title).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.content).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.admin_id).toLowerCase().includes(value.toLowerCase()) ||
                        String(record.created_at).toLowerCase().includes(value.toLowerCase())
                      );
                    }
                },
                {
                    title: "Image",
                    dataIndex: "image"
                },
                {
                    title: "Title",
                    dataIndex: "title"
                },
                {
                    title: "Content",
                    dataIndex: "content",
                },
                {
                    title: "Created at",
                    dataIndex: "created_at"
                },
                {
                    title: "Updated at",
                    dataIndex: "updated_at"
                },
                {
                    title: "Admin ID",
                    dataIndex: "admin_id"
                },
            ]}
            dataSource={dataSource.map((record) => ({
                ...record,
                key: record.new_id,
              }))}
        ></Table> */}

export default News;
