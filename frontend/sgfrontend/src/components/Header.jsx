import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Typography, Input, Drawer, Image, List, Badge } from "antd";
import { BellFilled, LogoutOutlined } from "@ant-design/icons";

function Header({ model, id }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/${model}s/profile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchProfileData();
    }
  }, [model, navigate]);

  if (!profileData) {
    return (
      <Space size={20} direction="horizontal">
        <Input.Search
          placeholder="Search here..."
          style={{ width: "500px", float: "right" }}
        />
      </Space>
    );
  }
  return (
    <>
      <Space size={20} direction="horizontal">
        <Input.Search
          placeholder="Search here..."
          style={{ width: "500px", float: "right" }}
        />

        {model === "lecturer" ? (
          <Space>
            <div className="user-info">
              <div>{profileData.name}</div>
              <div>{profileData.email}</div>
            </div>
            <Badge count={orders.length}>
              <BellFilled
                style={{ fontSize: 24 }}
                onClick={() => {
                  setNotificationsOpen(true);
                }}
              />
            </Badge>

            <Badge>
              <LogoutOutlined
                style={{ fontSize: 24 }}
                onClick={() => {
                  navigate("/logout");
                }}
              />
            </Badge>
          </Space>
        ) : (
          <>
            <Space>
              <div className="user-info">
                <div>{profileData.name}</div>
                <div>{profileData.student_id}</div>
              </div>
              <Badge count={orders.length}>
                <BellFilled
                  style={{ fontSize: 24 }}
                  onClick={() => {
                    setNotificationsOpen(true);
                  }}
                />
              </Badge>
              <Badge>
                <LogoutOutlined
                  style={{ fontSize: 24 }}
                  onClick={() => {
                    setProfileData(null);
                    navigate("/logout");
                  }}
                />
              </Badge>
            </Space>
            <Drawer
              title="Notifications"
              open={notificationsOpen}
              onClose={() => {
                setNotificationsOpen(false);
              }}
              maskClosable
            >
              <List
                dataSource={orders}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <Typography.Text strong>{item.title}</Typography.Text> has
                      been ordered!
                    </List.Item>
                  );
                }}
              ></List>
            </Drawer>
          </>
        )}
      </Space>
    </>
  );
}

export default Header;
