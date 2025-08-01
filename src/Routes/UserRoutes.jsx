import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout (typically not lazy-loaded unless very large)
import UserLayout from '../User/Layout/UserLayout';

// Lazy-loaded pages
const Dashboard = lazy(() => import('../User/Pages/Dashboard'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
