import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout (static import, NOT lazy)
import UserLayout from '../User/Layout/UserLayout';
import UserLoader from '../User/Components/Comman/UserLoader';
import AuthLayout from '../User/Layout/AuthLayout';
import LoginPage from '../User/Auth/LoginPage';
import SignUpPage from '../User/Auth/SignUpPage';
import ForgotPasswordPage from '../User/Auth/ForgotPasswordPage';
import TeamDownline from '../User/Pages/TeamDownline';
import TeamTreeView from '../User/Pages/TeamTreeView';
import DirectReferral from '../User/Pages/DirectReferral';
import LevelWiseTeam from '../User/Pages/LevelWiseTeam';
import ScrollToTop from '../User/Components/Comman/ScrollToTop';



// Lazy-loaded pages
const Dashboard = lazy(() => import('../User/Pages/Dashboard'));
const MyProfile = lazy(() => import('../User/Pages/MyProfile'));
const Deposit = lazy(() => import('../User/Pages/Deposit'));
const DepositReport = lazy(() => import('../User/Pages/DepositReport'));
const Wallets = lazy(() => import('../User/Pages/Wallets'));
const Investments = lazy(() => import('../User/Pages/Investments'));
const ActivePlans = lazy(() => import('../User/Pages/ActivePlans'));
const InvestmentReport = lazy(() => import('../User/Pages/InvestmentReport'));
const Swap = lazy(() => import('../User/Pages/Swap'));
const SwapReport = lazy(() => import('../User/Pages/SwapReport'));
const ReferralIncome = lazy(() => import('../User/Pages/ReferralIncome'));
const ReferralReport = lazy(() => import('../User/Pages/ReferralReport'));
const StakeIncomeReport = lazy(() => import('../User/Pages/StakeIncomeReport'));
const LavelIncomeReport = lazy(() => import('../User/Pages/LavelIncomeReport'));
const BonanzaIncomeReport = lazy(() => import('../User/Pages/BonanzaIncome'));
const BonanzaRewards = lazy(() => import('../User/Pages/BonanzaRewards'));
const Withdrawals = lazy(() => import('../User/Pages/Withdrawals'));
const WithdrawReport = lazy(() => import('../User/Pages/WithdrawReport'));
const TransactionHistory = lazy(() => import('../User/Pages/TransactionHistory'));



const UserRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>

        <Route path="/user" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<UserLoader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<UserLoader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="my-profile"
            element={
              <Suspense fallback={<UserLoader />}>
                <MyProfile />
              </Suspense>
            }
          />
          <Route
            path="deposit"
            element={
              <Suspense fallback={<UserLoader />}>
                <Deposit />
              </Suspense>
            }
          />
          <Route
            path="deposit-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <DepositReport />
              </Suspense>
            }
          />
          <Route
            path="wallets"
            element={
              <Suspense fallback={<UserLoader />}>
                <Wallets />
              </Suspense>
            }
          />
          <Route
            path="investments"
            element={
              <Suspense fallback={<UserLoader />}>
                <Investments />
              </Suspense>
            }
          />
          <Route
            path="active-plan"
            element={
              <Suspense fallback={<UserLoader />}>
                <ActivePlans />
              </Suspense>
            }
          />
          <Route
            path="investment-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <InvestmentReport />
              </Suspense>
            }
          />
          <Route
            path="swap"
            element={
              <Suspense fallback={<UserLoader />}>
                <Swap />
              </Suspense>
            }
          />
          <Route
            path="swap-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <SwapReport />
              </Suspense>
            }
          />
          <Route
            path="referral-income"
            element={
              <Suspense fallback={<UserLoader />}>
                <ReferralIncome />
              </Suspense>
            }
          />
          <Route
            path="referral-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <ReferralReport />
              </Suspense>
            }
          />
          {/* network */}
          <Route
            path="team-downline"
            element={
              <Suspense fallback={<UserLoader />}>
                <TeamDownline />
              </Suspense>
            }
          />
          <Route
            path="team-tree-view"
            element={
              <Suspense fallback={<UserLoader />}>
                <TeamTreeView />
              </Suspense>
            }
          />
          <Route
            path="direct-referral"
            element={
              <Suspense fallback={<UserLoader />}>
                <DirectReferral />
              </Suspense>
            }
          />
          <Route
            path="level-wise-team"
            element={
              <Suspense fallback={<UserLoader />}>
                <LevelWiseTeam />
              </Suspense>
            }
          />


          {/* bonanza  */}

          <Route
            path="bonanza-rewards"
            element={
              <Suspense fallback={<UserLoader />}>
                <BonanzaRewards />
              </Suspense>
            }
          />
          <Route
            path="bonanza-plan-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <BonanzaIncomeReport />
              </Suspense>
            }
          />

          <Route
            path="stake-income-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <StakeIncomeReport />
              </Suspense>
            }
          />
          <Route
            path="lavel-income-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <LavelIncomeReport />
              </Suspense>
            }
          />
          <Route
            path="bonanza-income-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <BonanzaIncomeReport />
              </Suspense>
            }
          />

          {/* withdrawls  */}
          <Route
            path="withdrawals"
            element={
              <Suspense fallback={<UserLoader />}>
                <Withdrawals />
              </Suspense>
            }
          />
          <Route
            path="withdraw-report"
            element={
              <Suspense fallback={<UserLoader />}>
                <WithdrawReport />
              </Suspense>
            }
          />
          <Route
            path="transaction-history"
            element={
              <Suspense fallback={<UserLoader />}>
                <TransactionHistory />
              </Suspense>
            }
          />


          <Route
            path="ul"
            element={
              <Suspense fallback={<UserLoader />}>
                <UserLoader />
              </Suspense>
            }
          />
        </Route>

      </Routes>
    </>
  );
};

export default UserRoutes;
