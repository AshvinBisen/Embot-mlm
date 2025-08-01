import { SidebarProvider, useSidebar } from "../Contexts/SidebarContext";
import { Outlet } from "react-router-dom";
import TopNav from "../Components/Navigations/TopNav";
import Backdrop from "../Components/Navigations/Backdrop";
import Sidebar from "../Components/Navigations/Sidebar";
import { ThemeProvider } from "../Contexts/ThemeContext";

const UserLayout = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <Sidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[230px]" : "lg:ml-[80px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <TopNav />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />  {/* like chindren */}
                    
                </div>
            </div>
        </div>
    );
};

const AdminLayout = () => {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <UserLayout />
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default AdminLayout;
