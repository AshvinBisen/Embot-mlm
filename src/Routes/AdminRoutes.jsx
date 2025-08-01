import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout (usually not lazy unless very heavy)
import AdminLayout from '../Admin/Layout/AdminLayout';

// Lazy-loaded pages
const Dashboard = lazy(() => import('../Admin/Pages/Dashboard'));
const Test = lazy(() => import('../Admin/Pages/Test'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
