import { BrowserRouter, Route, Routes } from "react-router-dom";
import Students from "./Students";
import Lecturers from "./Lecturers";
// import Dashboard from "../../Pages/Dashbaord";
// import Inventory from "../../Pages/Inventory";
// import Orders from "../../Pages/Orders";

function AdminRoutes({ isAuthenticated }) {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route> */}
      <Route path="/students" element={<Students isAuthenticated={isAuthenticated}/>}></Route>
      <Route path="/lecturers" element={<Lecturers isAuthenticated={isAuthenticated}/>}></Route>

    </Routes>
  );
}
export default AdminRoutes;
