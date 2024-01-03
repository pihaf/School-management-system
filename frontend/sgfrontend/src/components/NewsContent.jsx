import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Typography, Layout, Button, Image, FloatButton} from "antd";
import host from "../../config";
import "../css/UserCourse.css";
const { Content } = Layout;

function NewsContent({token}) {
  const navigate = useNavigate();
  const { newId } = useParams();
  const [dataSource, setDataSource] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`${host}/api/news/${newId}`, {
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!dataSource) {
    return null; 
  }

  const { title, content, image } = dataSource;

  return (
    <Content style={{ margin: "0px 28px 0px 24px" }}>
      <Typography.Title level={2}>News</Typography.Title>
      <Button
              onClick={() => {
                navigate("/news");
              }}
            >
              Back
            </Button>
      <div>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Image src={image} alt="News Image" width={1000}/>
        <Typography.Paragraph>{content}</Typography.Paragraph>
      </div>
      <FloatButton.BackTop />
    </Content>
  );
}

export default NewsContent;
