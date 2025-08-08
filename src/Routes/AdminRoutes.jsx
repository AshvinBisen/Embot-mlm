import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
const PerDayIncome = lazy(() => import('../Admin/Pages/IncomeManagement/PerDayIncome'));
const ReferralIncome = lazy(() => import('../Admin/Pages/IncomeManagement/ReferralIncome'));
const BonanzaRewards = lazy(() => import('../Admin/Pages/IncomeManagement/BonanzaRewards'));
const SwapManagementReport = lazy(() => import('../Admin/Pages/SwapManagement/SwapManagementReport'));
const SessionLog = lazy(() => import('../Admin/Pages/SessionLog'));
const Logout = lazy(() => import('../Admin/Pages/Logout'));

// Lazy-loaded Auth Pages
const Login = lazy(() => import('../Admin/Auth/Login'));
const SignUp = lazy(() => import('../Admin/Auth/SignUp'));
const ForgetPassword = lazy(() => import('../Admin/Auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../Admin/Auth/ResetPassword'));

// Inline Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken'); // Use your token key
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/sign-up" element={<SignUp />} />
        <Route path="/admin/forget-password" element={<ForgetPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-managment" element={<UserManagment />} />
          <Route path="set-token-price" element={<SetTokenPrice />} />
          <Route path="user-deposit/deposit" element={<Deposit />} />
          <Route path="user-deposit/deposit-report" element={<DepositReport />} />
          <Route path="investment-management/investments-plan" element={<InvestmentsPlan />} />
          <Route path="investment-management/report" element={<InvestmentsReports />} />
          <Route path="payout-management/withdrawals" element={<Withdrawals />} />
          <Route path="payout-management/withdrawal-report" element={<WithdrawalReport />} />
          <Route path="income-management/per-day-income" element={<PerDayIncome />} />
          <Route path="income-management/referrel-income" element={<ReferralIncome />} />
          <Route path="income-management/bonanza-rewards" element={<BonanzaRewards />} />
          <Route path="swap-management/report" element={<SwapManagementReport />} />
          <Route path="session-log" element={<SessionLog />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
