import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Typography,
  Input,
  Drawer,
  Image,
  List,
  Badge,
  Avatar,
} from "antd";
import { MailOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

function Header({ model, id, profileHeader }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // console.log("profile data in header:", profileHeader);

  if (!profileHeader) {
    return (
      // <Space size={25} direction="horizontal">
      //   <Input.Search
      //     placeholder="Search here..."
      //     style={{ width: "400px", float: "right" }}
      //   />
      // </Space>
      <div
        style={{
          height: "100px",
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          padding: " 4px 20px 20px 12px",
          borderBottom: " 1px solid rgba(0, 0, 0, 0.15)",
          // backgroundColor: "#001529",
        }}
      >
        <img
          className="logo"
          src="public\items\logo-trans.png"
          alt="logo"
          style={{ width: "120px" }}
        ></img>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        padding: " 4px 20px 20px 12px",
        borderBottom: " 1px solid rgba(0, 0, 0, 0.15)",
        // backgroundColor: "#001529",
      }}
    >
      <img
        className="logo"
        src="public\items\logo-trans.png"
        alt="logo"
        style={{ width: "120px" }}
      ></img>
      <Space
        size={25}
        direction="horizontal"
        style={{ width: "100%", justifyContent: "space-evenly" }}
      >
        <Input.Search
          placeholder="Search here..."
          style={{ width: "400px", float: "right" }}
        />

        {model === "lecturer" ? (
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="user-info"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar icon={<UserOutlined />} size={40} />
              <div
                className="user-name-id"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography.Text
                  style={{ margin: "0em 0.7em", fontWeight: "700" }}
                >
                  {profileHeader.name}
                </Typography.Text>
                <Typography.Text style={{ margin: "0em 0.7em" }}>
                  {profileHeader.email}
                </Typography.Text>
              </div>
            </div>
            <Badge count={0} showZero>
              <MailOutlined
                style={{ fontSize: 24 }}
                onClick={() => {
                  setNotificationsOpen(true);
                }}
              />
            </Badge>
          </Space>
        ) : (
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              className="user-info"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar icon={<UserOutlined />} size={40} />
              <div
                className="user-name-id"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography.Text
                  style={{ margin: "0em 0.7em", fontWeight: "700" }}
                >
                  {profileHeader.name}
                </Typography.Text>
                <Typography.Text style={{ margin: "0em 0.7em" }}>
                  {profileHeader.student_id}
                </Typography.Text>
              </div>
            </div>
            <Badge count={0} showZero>
              <MailOutlined
                style={{ fontSize: 24 }}
                onClick={() => {
                  setNotificationsOpen(true);
                }}
              />
            </Badge>
          </Space>
        )}
      </Space>
    </div>
  );
}

export default Header;
