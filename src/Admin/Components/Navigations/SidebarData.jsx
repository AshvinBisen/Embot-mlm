import {
    FaHome,
    FaUser,
    FaCog,
    FaChartBar,
    FaFolder,
} from 'react-icons/fa';

export const sidebarData = [
    {
        name: 'Dashboard',
        icon: <FaHome />,
        route: '/dashboard',
    },
    {
        name: 'Users',
        icon: <FaUser />,
        submenu: [
            { name: 'All Users', route: '/users/all' },
            { name: 'Add User', route: '/users/add' },
        ],
    },
    {
        name: 'Reports',
        icon: <FaChartBar />,
        route: '/reports',
    },
    {
        name: 'Projects',
        icon: <FaFolder />,
        submenu: [
            { name: 'Active', route: '/projects/active' },
            { name: 'Archived', route: '/projects/archived' },
        ],
    },
    {
        name: 'Settings',
        icon: <FaCog />,
        route: '/settings',
    },
];
