import { SidebarProvider, useSidebar } from "../Contexts/SidebarContext";
import { Outlet } from "react-router-dom";
import TopNav from "../Components/Navigations/TopNav";
import Backdrop from "../Components/Navigations/Backdrop";
import Sidebar from "../Components/Navigations/Sidebar";
import { ThemeProvider } from "../Contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
// import vid from "../../../public/assets/userImages/images/bg-video.mp4"

const UserLayout = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="  relative  text-white     min-h-screen xl:flex">
            <div className="fixed z-[-99] left-0 top-0 object-cover inset-0 bg-[url('/publicImagesUser/mainbg3.jpg')]  bg-cover bg-fixed blur-xl opacity-[0.6]  scale-110" />

            {/* <video
                muted
                autoPlay
                loop
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-[-99] opacity-[0.2] scale-110 blur-xl"
                >
                <source src={vid} type="video/mp4" />
                Your browser does not support the video tag.
                </video> */}

            <div>
                <Sidebar />
                <Backdrop />
                <ToastContainer />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[230px]" : "lg:ml-[73px]"
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
