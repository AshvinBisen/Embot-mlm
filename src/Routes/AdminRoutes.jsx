import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout (usually not lazy unless very heavy)
import AdminLayout from '../Admin/Layout/AdminLayout';

// Lazy-loaded pages
const Dashboard = lazy(() => import('../Admin/Pages/Dashboard'));
const UserManagment = lazy(() => import('../Admin/Pages/UserManagement'));
const SetTokenPrice = lazy(() => import('../Admin/Pages/SetTokenPrice'));
const Deposit = lazy(() => import('../Admin/Pages/UsersDeposit/Deposit'));
const DepositReport = lazy(() => import('../Admin/Pages/UsersDeposit/DepositReport'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-managment" element={<UserManagment />} />
          <Route path="set-token-price" element={<SetTokenPrice />} />
          <Route path="user-deposit/deposit" element={<Deposit />} />
          <Route path="user-deposit/deposit-report" element={<DepositReport />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
