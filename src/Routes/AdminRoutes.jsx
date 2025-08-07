import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AdminLayout from '../Admin/Layout/AdminLayout';

// Lazy-loaded Admin Pages
const Dashboard = lazy(() => import('../Admin/Pages/Dashboard'));
const UserManagment = lazy(() => import('../Admin/Pages/UserManagement'));
const SetTokenPrice = lazy(() => import('../Admin/Pages/SetTokenPrice'));
const Deposit = lazy(() => import('../Admin/Pages/UsersDeposit/Deposit'));
const DepositReport = lazy(() => import('../Admin/Pages/UsersDeposit/DepositReport'));
const InvestmentsPlan = lazy(() => import('../Admin/Pages/InvestmentManagement/InvestmentsPlan'));
const InvestmentsReports = lazy(() => import('../Admin/Pages/InvestmentManagement/Reports'));
const Withdrawals = lazy(() => import('../Admin/Pages/PayoutManagement/Withdrawals'));
const WithdrawalReport = lazy(() => import('../Admin/Pages/PayoutManagement/WithdrawalReports'));

// Lazy-loaded Auth Pages
const Login = lazy(() => import('../Admin/Auth/Login'));
const SignUp = lazy(() => import('../Admin/Auth/SignUp'));
const ForgetPassword = lazy(() => import('../Admin/Auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../Admin/Auth/ResetPassword'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/sign-up" element={<SignUp />} />
        <Route path="/admin/forget-password" element={<ForgetPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-managment" element={<UserManagment />} />
          <Route path="set-token-price" element={<SetTokenPrice />} />
          <Route path="user-deposit/deposit" element={<Deposit />} />
          <Route path="user-deposit/deposit-report" element={<DepositReport />} />
          <Route path="investment-management/investments-plan" element={<InvestmentsPlan />} />
          <Route path="investment-management/report" element={<InvestmentsReports />} />
          <Route path="payout-management/withdrawals" element={<Withdrawals />} />
          <Route path="payout-management/withdrawal-report" element={<WithdrawalReport />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
