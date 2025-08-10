import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AdminLayout from '../Admin/Layout/AdminLayout';
import AdminLoader from '../Admin/Components/AdminLoader';

// ✅ Lazy-loaded Auth Pages
const Login = lazy(() => import('../Admin/Auth/Login'));
const SignUp = lazy(() => import('../Admin/Auth/SignUp'));
const ForgetPassword = lazy(() => import('../Admin/Auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../Admin/Auth/ResetPassword'));

// ✅ Lazy-loaded Admin Pages
const Dashboard = lazy(() => import('../Admin/Pages/Dashboard'));
const UserManagment = lazy(() => import('../Admin/Pages/UserManagement'));
const SetTokenPrice = lazy(() => import('../Admin/Pages/SetTokenPrice'));
const Deposit = lazy(() => import('../Admin/Pages/UsersDeposit/Deposit'));
const DepositReport = lazy(() => import('../Admin/Pages/UsersDeposit/DepositReport'));
const InvestmentsPlan = lazy(() => import('../Admin/Pages/InvestmentManagement/InvestmentsPlan'));
const BonanzaPlan = lazy(() => import('../Admin/Pages/InvestmentManagement/BonanzaPlan'));
const InvestmentsReports = lazy(() => import('../Admin/Pages/InvestmentManagement/Reports'));
const Withdrawals = lazy(() => import('../Admin/Pages/PayoutManagement/Withdrawals'));
const WithdrawalReport = lazy(() => import('../Admin/Pages/PayoutManagement/WithdrawalReports'));
const PerDayIncome = lazy(() => import('../Admin/Pages/IncomeManagement/PerDayIncome'));
const ReferralIncome = lazy(() => import('../Admin/Pages/IncomeManagement/ReferralIncome'));
const BonanzaRewards = lazy(() => import('../Admin/Pages/IncomeManagement/BonanzaRewards'));
const SwapManagementReport = lazy(() => import('../Admin/Pages/SwapManagement/SwapManagementReport'));
const SessionLog = lazy(() => import('../Admin/Pages/SessionLog'));
const Logout = lazy(() => import('../Admin/Pages/Logout'));

// ✅ Private Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Auth Routes with Lazy + Loader */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/admin/sign-up"
        element={
          <Suspense fallback={<AdminLoader />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/admin/forget-password"
        element={
          <Suspense fallback={<AdminLoader />}>
            <ForgetPassword />
          </Suspense>
        }
      />
      <Route
        path="/admin/reset-password"
        element={
          <Suspense fallback={<AdminLoader />}>
            <ResetPassword />
          </Suspense>
        }
      />

      {/* ✅ Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<AdminLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="user-managment"
          element={
            <Suspense fallback={<AdminLoader />}>
              <UserManagment />
            </Suspense>
          }
        />
        <Route
          path="set-token-price"
          element={
            <Suspense fallback={<AdminLoader />}>
              <SetTokenPrice />
            </Suspense>
          }
        />
        <Route
          path="user-deposit/deposit"
          element={
            <Suspense fallback={<AdminLoader />}>
              <Deposit />
            </Suspense>
          }
        />
        <Route
          path="user-deposit/deposit-report"
          element={
            <Suspense fallback={<AdminLoader />}>
              <DepositReport />
            </Suspense>
          }
        />
        <Route
          path="investment-management/investments-plan"
          element={
            <Suspense fallback={<AdminLoader />}>
              <InvestmentsPlan />
            </Suspense>
          }
        />
        <Route
          path="investment-management/bonanza-plan"
          element={
            <Suspense fallback={<AdminLoader />}>
              <BonanzaPlan />
            </Suspense>
          }
        />
        <Route
          path="investment-management/report"
          element={
            <Suspense fallback={<AdminLoader />}>
              <InvestmentsReports />
            </Suspense>
          }
        />
        <Route
          path="payout-management/withdrawals"
          element={
            <Suspense fallback={<AdminLoader />}>
              <Withdrawals />
            </Suspense>
          }
        />
        <Route
          path="payout-management/withdrawal-report"
          element={
            <Suspense fallback={<AdminLoader />}>
              <WithdrawalReport />
            </Suspense>
          }
        />
        <Route
          path="income-management/per-day-income"
          element={
            <Suspense fallback={<AdminLoader />}>
              <PerDayIncome />
            </Suspense>
          }
        />
        <Route
          path="income-management/referrel-income"
          element={
            <Suspense fallback={<AdminLoader />}>
              <ReferralIncome />
            </Suspense>
          }
        />
        <Route
          path="income-management/bonanza-rewards"
          element={
            <Suspense fallback={<AdminLoader />}>
              <BonanzaRewards />
            </Suspense>
          }
        />
        <Route
          path="swap-management/report"
          element={
            <Suspense fallback={<AdminLoader />}>
              <SwapManagementReport />
            </Suspense>
          }
        />
        <Route
          path="session-log"
          element={
            <Suspense fallback={<AdminLoader />}>
              <SessionLog />
            </Suspense>
          }
        />
        <Route
          path="logout"
          element={
            <Suspense fallback={<AdminLoader />}>
              <Logout />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
