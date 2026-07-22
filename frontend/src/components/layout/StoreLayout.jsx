import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const StoreLayout = () => (
  <div className="bg-background min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default StoreLayout;
