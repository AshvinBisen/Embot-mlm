import { Routes, Route } from 'react-router-dom';

import UserLayout from '../User/Layout/UserLayout';
import Dashboard from '../User/Pages/Dashboard';


const UserRoutes = () => {
  return (


    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>

  );
};

export default UserRoutes;
