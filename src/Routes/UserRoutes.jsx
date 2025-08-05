import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout (static import, NOT lazy)
import UserLayout from '../User/Layout/UserLayout';
import UserLoader from '../User/Components/Comman/UserLoader';
import Swap from '../User/Pages/Swap';
import SwapReport from '../User/Pages/SwapReport';
import ReferralIncome from '../User/Pages/ReferralIncome';


// Lazy-loaded pages
const Dashboard = lazy(() => import('../User/Pages/Dashboard'));
const MyProfile = lazy(() => import('../User/Pages/MyProfile'));
const Deposit = lazy(() => import('../User/Pages/Deposit'));
const DepositReport = lazy(() => import('../User/Pages/DepositReport'));
const Wallets = lazy(() => import('../User/Pages/Wallets'));
const Investments = lazy(() => import('../User/Pages/Investments'));
const ActivePlans = lazy(() => import('../User/Pages/ActivePlans'));
const InvestmentReport = lazy(() => import('../User/Pages/InvestmentReport'));
 

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
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
          path="ul"
          element={
            <Suspense fallback={<UserLoader />}>
              <UserLoader />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
