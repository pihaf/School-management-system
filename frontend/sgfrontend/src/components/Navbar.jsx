import {
  HomeOutlined,
  ProjectOutlined,
  SolutionOutlined,
  ReadOutlined,
  ProfileOutlined,
  NotificationOutlined,
  LoginOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        theme="light"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <HomeOutlined />,
            key: "/home",
          },
          {
            label: "Profile",
            icon: <ProfileOutlined />,
            key: "/profile",
          },
          {
            label: "Timetable",
            key: "/timetable",
            icon: <ProjectOutlined />,
          },
          {
            label: "Courses",
            key: "/courses",
            icon: <ReadOutlined />,
          },
          {
            label: "Notifications",
            key: "/notifications",
            icon: <NotificationOutlined />,
          },
          {
            label: "Requests",
            key: "/request",
            icon: <SolutionOutlined />,
          },
          {
            label: "Chat",
            key: "/chat",
            icon: <CommentOutlined />,
          },
          {
            label: "Login",
            key: "/login",
            icon: <LoginOutlined />,
          },
          {
            label: "Logout",
            key: "/logout",
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default Navbar;
