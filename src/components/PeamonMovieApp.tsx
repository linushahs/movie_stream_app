import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function PeamonMovieApp() {
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
      <Sidebar />
    </div>
  );
}

export default PeamonMovieApp;
