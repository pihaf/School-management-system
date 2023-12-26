import {
    ReadOutlined,
    UserOutlined,
    SolutionOutlined
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState } from "react";
  
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  // import { Bar } from "react-chartjs-2";
  
import '../../css/AdminHome.css';
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Dashboard({ isAuthenticated }) {
    const [students, setStudents] = useState(0);
    const [lecturers, setLecturers] = useState(0);
    const [requests, setRequests] = useState(0);
    const [courses, setCourses] = useState(0);
  
    useEffect(() => {
        //get total requests
        fetch("http://localhost:3000/api/admin/requests", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
            setRequests(data.length);
        })
        .catch(error => {
            console.error('Error fetching requests:', error);
        });

        //get total students
        fetch("http://localhost:3000/api/admin/students", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
            setStudents(data.length);
        })
        .catch(error => {
            console.error('Error fetching students:', error);
        });

        //get total lecturers
        fetch("http://localhost:3000/api/admin/lecturers", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
            setLecturers(data.length);
        })
        .catch(error => {
            console.error('Error fetching lecturers:', error);
        });

        //get total lecturers
        fetch("http://localhost:3000/api/courses", { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }).then(response => response.json())
        .then(data => {
            setCourses(data.length);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
    }, []);
  
    return (    
      <div className="App">
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu></SideMenu>
            <Space size={20} direction="vertical">
              <Typography.Title level={4}>Dashboard</Typography.Title>
              <Space direction="horizontal">
                <DashboardCard
                  icon={
                    <SolutionOutlined
                      style={{
                        color: "green",
                        backgroundColor: "rgba(0,255,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Requests"}
                  value={requests}
                />
                <DashboardCard
                  icon={
                    <ReadOutlined
                      style={{
                        color: "blue",
                        backgroundColor: "rgba(0,0,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Courses"}
                  value={courses}
                />
                <DashboardCard
                  icon={
                    <UserOutlined
                      style={{
                        color: "purple",
                        backgroundColor: "rgba(0,255,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Students"}
                  value={students}
                />
                <DashboardCard
                  icon={
                    <UserOutlined
                      style={{
                        color: "red",
                        backgroundColor: "rgba(255,0,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Lecturers"}
                  value={lecturers}
                />
              </Space>
              <Space>
                {/* <RecentOrders />
                <DashboardChart /> */}
              </Space>
            </Space>
          </div>
          <AdminFooter />
      </div>
    );
  }
  
  function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
//   function RecentRequests() {
//     const [dataSource, setDataSource] = useState([]);
//     const [loading, setLoading] = useState(false);
  
//     useEffect(() => {
//       setLoading(true);
//       getOrders().then((res) => {
//         setDataSource(res.products.splice(0, 3));
//         setLoading(false);
//       });
//     }, []);
  
//     return (
//       <>
//         <Typography.Text>Recent requests</Typography.Text>
//         <Table
//           columns={[
//             {
//               title: "Title",
//               dataIndex: "title",
//             },
//             {
//               title: "Quantity",
//               dataIndex: "quantity",
//             },
//             {
//               title: "Price",
//               dataIndex: "discountedPrice",
//             },
//           ]}
//           loading={loading}
//           dataSource={dataSource}
//           pagination={false}
//         ></Table>
//       </>
//     );
//   }
  
//   function DashboardChart() {
//     const [reveneuData, setReveneuData] = useState({
//       labels: [],
//       datasets: [],
//     });
  
//     useEffect(() => {
//       getRevenue().then((res) => {
//         const labels = res.carts.map((cart) => {
//           return `User-${cart.userId}`;
//         });
//         const data = res.carts.map((cart) => {
//           return cart.discountedTotal;
//         });
  
//         const dataSource = {
//           labels,
//           datasets: [
//             {
//               label: "Revenue",
//               data: data,
//               backgroundColor: "rgba(255, 0, 0, 1)",
//             },
//           ],
//         };
  
//         setReveneuData(dataSource);
//       });
//     }, []);
  
//     const options = {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "bottom",
//         },
//         title: {
//           display: true,
//           text: "Order Revenue",
//         },
//       },
//     };
  
//     return (
//       <Card style={{ width: 500, height: 250 }}>
//         <Bar options={options} data={reveneuData} />
//       </Card>
//     );
//   }
  export default Dashboard;
  