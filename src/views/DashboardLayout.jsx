import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppBar from "../components/AppBar";
import MobileNavbar from "../components/MobileNavbar";
import OfflineBanner from "../components/OfflineBanner";
import { NavbarContext } from "../contexts/NavbarContext";
import { OfflineProvider } from "../contexts/OfflineContext";
import useAuth from "../helpers/useAuth";

export default function DashboardLayout() {
  useAuth();
  const [isNavbarCollapsed] = useContext(NavbarContext);
  const navigate = useNavigate();

  //   useEffect(() => {
  //   const token = Cookies.get("accessToken");
  //   console.log("DashboardLayout - token:", token);
  //   if (!token) return;

  //   const decoded = jwtDecode(token);
  //   console.log(decoded);

  //   if (String(decoded.is_active) === "0") {
  //     navigate("/dashboard/inactive-subscription", { replace: true });
  //   }
  // }, [navigate]);

  const contentPaddingClass = isNavbarCollapsed
    ? "w-full md:pl-[5.5rem]"
    : "w-full md:pl-72";

  return (
    <OfflineProvider>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className={`${contentPaddingClass} pb-24 md:pb-0 flex flex-col min-w-0`}>
          <AppBar />
          <OfflineBanner />
          <Outlet />
        </div>
        <MobileNavbar />
      </div>
    </OfflineProvider>
  );
}
