import Navbar from "@/layout/navbar/Navbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <section className="flex">
      <Navbar />
      <Outlet />
      <Toaster />
      <Sidebar />
          </section>
  );
}

export default App;
