import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCube,
  FaCalendarAlt,
  FaChevronDown,
  FaThLarge,
  FaEllipsisH,
  FaList,
  FaFileAlt,
  FaTable,
  FaUserCircle,
} from "react-icons/fa";
import { useSidebar } from "../../Contexts/SidebarContext";

// MAIN NAVIGATION ITEMS
const navItems = [
  {
    icon: <FaThLarge />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <FaThLarge />,
    name: "Other",
    subItems: [
      { name: "Manage Flexible Packages1", path: "/", pro: false },
      { name: "Manage Flexible Packages2", path: "/s", pro: false },
      { name: "Manage Flexible Packages3", path: "/s", pro: false },
      { name: "Manage Flexible Packages4", path: "/s", pro: false },
      { name: "Manage Flexible Packages5", path: "/s", pro: false },
      { name: "Manage Flexible Package6", path: "/s", pro: false },
      { name: "1", path: "/s", pro: false },
      { name: "Ecommerce2", path: "/s", pro: false },
      { name: "Ecommerce3", path: "/s", pro: false },
      { name: "Ecommerce4", path: "/s", pro: false },
      { name: "Ecommerce5", path: "/s", pro: false },
      { name: "Ecommerce6", path: "/s", pro: false },
    ],
  },
  {
    icon: <FaCalendarAlt />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <FaUserCircle />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <FaList />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <FaTable />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <FaFileAlt />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let matched = false;
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu({ index });
          matched = true;
        }
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu((prev) =>
      prev && prev.index === index ? null : { index }
    );
  };

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative overflow-hidden 
                ${openSubmenu?.index === index
                  ? "bg-gradient-to-r from-green-50 to-indigo-50 dark:from-green-900/20 dark:to-indigo-900/20 text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-800/30"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182C2D] hover:text-gray-900 dark:hover:text-white"
                } 
                ${!isExpanded && !isHovered ? " lg:px-[0.9rem]" : " "} lg:justify-start
              `}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />

              <span className={`relative  z-10 flex-shrink-0 text-lg transition-colors duration-200
                ${openSubmenu?.index === index
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400"
                }`}>
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="relative z-10 flex-1 text-left font-medium tracking-wide">
                    {nav.name}  
                  </span>
                  <FaChevronDown
                    className={`relative z-10 w-4 h-4 transition-all duration-300 flex-shrink-0
                      ${openSubmenu?.index === index
                        ? "rotate-180 text-green-600 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-green-500 dark:group-hover:text-green-400"
                      }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`flex   items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative overflow-hidden
                  ${isActive(nav.path)
                    ? "bg-gradient-to-r from-green-50 to-indigo-50 dark:from-green-900/20 dark:to-indigo-900/20 text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-800/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182C2D] hover:text-gray-900 dark:hover:text-white"
                  }
                  ${!isExpanded && !isHovered ? "  lg:px-[0.9rem]" : " " }lg:justify-start
                `}
              >
                {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl " />

                <span className={`relative z-10 flex-shrink-0 ml-[-0.1rem] text-lg transition-colors duration-200 
                  ${isActive(nav.path)
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400"
                  }`}>
                  {nav.icon} 
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="relative z-10 font-medium tracking-wide">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`main-${index}`] = el;
              }}
              className="overflow-hidden  transition-all duration-300 ease-out"
              style={{
                height:
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`main-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 ml-4 space-y-1 border-l border-gray-200 dark:border-gray-700  ">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden
                        ${isActive(subItem.path)
                          ? "bg-gradient-to-r from-green-50 to-indigo-50 dark:from-green-900/10 dark:to-indigo-900/10 text-green-600 dark:text-green-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#182C2D] hover:text-gray-900 dark:hover:text-white"
                        }`}
                    >
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/3 to-indigo-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />

                      <span className="relative z-10 tracking-wide">
                        {subItem.name}
                      </span>

                      {(subItem.new || subItem.pro) && (
                        <span className="relative z-10 flex gap-1.5 ml-2">
                          {subItem.new && (
                            <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold px-2 py-0.5 rounded-full shadow-sm">
                              NEW
                            </span>
                          )}
                          {subItem.pro && (
                            <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-semibold px-2 py-0.5 rounded-full shadow-sm">
                              PRO
                            </span>
                          )}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 z-[999]  left-0   h-[100vh] bg-white/95 dark:bg-[#0000004b] backdrop-blur-md border-r border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 ease-in-out shadow-xl dark:shadow-2xl
        ${isExpanded || isMobileOpen
          ? "w-[230px]"
          : isHovered
            ? "w-[230px]"
            : "w-[73px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* LOGO SECTION */}
      <div className={`py-6  px-6 flex border-b border-gray-100 dark:border-gray-800/50
        ${!isExpanded && !isHovered ? "  lg:px-[0.9rem]" : ""} justify-start`}>
        <Link to="/" className="transition-transform duration-200 hover:scale-105">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden drop-shadow-sm"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={140}
                height={36}
              />
              <img
                className="hidden dark:block drop-shadow-sm"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={140}
                height={36}
              />
            </>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <img
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
          )}
        </Link>
      </div>
      {/* NAVIGATION SECTION */}
      <div className="flex flex-col h-full pb-36 overflow-y-auto no-scrollbar  ">
        <nav className="flex-1 px-3 py-6">
          <div className="space-y-8">
            {/* Menu Section */}
            <div>
              <h2 className={`mb-6 text-sm font-bold uppercase tracking-wider flex leading-5
                ${!isExpanded && !isHovered
                  ? "lg:justify-center text-gray-400 dark:text-gray-500"
                  : "justify-start text-gray-500 dark:text-gray-400"
                }`}>
                {isExpanded || isHovered || isMobileOpen ? (
                  "Navigation"
                ) : (
                    <div className="w-6 h-0.5 mb-3   bg-gray-300 dark:bg-[#121A1C] rounded-full" />
                )}
              </h2>
              {renderMenuItems()}
            </div>
          </div>
        </nav>

        {/* Footer Section */}
        {/* {(isExpanded || isHovered || isMobileOpen) && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-[#121A1C]">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">System Online</span>
            </div>
          </div>
        )} */}
      </div>
    </aside>
  );
};

export default Sidebar;