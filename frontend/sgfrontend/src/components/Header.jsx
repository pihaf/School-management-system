import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Typography, Input, Drawer, Image, List, Badge } from "antd";
import { BellFilled, LogoutOutlined } from "@ant-design/icons";

function Header({ model, id, profileHeader}) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // console.log("profile data in header:", profileHeader);

  if (!profileHeader) {
    return (
      <Space size={20} direction="horizontal">
        <Input.Search
          placeholder="Search here..."
          style={{ width: "400px", float: "right" }}
        />
      </Space>
    );
  }

  return (
    <>
      <Space size={ 20 } direction="horizontal" style={ { width: '100%' } }>
        {/* <Input.Search
          placeholder="Search here..."
          style={ { width: "700px", float: "right" } }
        /> */}

        {model === "lecturer" ? (
          <Space>
            <div className="user-info">
              <div>{profileHeader.name}</div>
              <div>{profileHeader.email}</div>
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
            <div style={ { display: 'flex', width: '100%' } }>
              <Space style={ { display: 'flex', justifyContent: 'flex-end', } }>
              <div className="user-info">
                <div>{profileHeader.name}</div>
                <div>{profileHeader.student_id}</div>
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
            </div>
        )}
      </Space>
    </>
  );
}

export default Header;
