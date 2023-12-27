import {
    AppstoreOutlined,
    UserOutlined,
    BarChartOutlined,
    ProjectOutlined,
    SolutionOutlined,
    CheckSquareOutlined,
    ReadOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
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
            onClick={(item) => {
            //item.key
            navigate(item.key);
            }}
            selectedKeys={[selectedKeys]}
            items={[
            {
                label: "Dashboard",
                icon: <BarChartOutlined />,
                key: "/admin/dashboard",
            },
            {
                label: "Students",
                key: "/admin/students",
                icon: <UserOutlined />,
            },
            {
                label: "Lecturers",
                key: "/admin/lecturers",
                icon: <UserOutlined />,
            },
            {
                label: "Courses",
                key: "/admin/courses",
                icon: <ReadOutlined />,
            },
            {
                label: "News",
                key: "/admin/news",
                icon: <ProjectOutlined />,
            },
            {
                label: "Requests",
                key: "/admin/requests",
                icon: <SolutionOutlined />,
            },
            {
                label: "Grades",
                key: "/admin/grades",
                icon: <CheckSquareOutlined />,
            },
            ]}
        ></Menu>
        </div>
    );
}
export default SideMenu;
  