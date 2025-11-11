import React, { lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary'; // Error boundary for handling errors
import LoginPage from './pages/Login.jsx'; // Login page
import { useAuth } from './store/useAuth'; // Authentication store
import { ProtectedRoute } from './components/ProtectedRoute.tsx'; // Protected route component
import { BottomNavigationBar } from './components/BottomNavigationBar.tsx'; // Bottom navigation bar
import SuspenseWrapper from './components/SuspenseWrapper'; // Suspense wrapper for lazy loading

// 动态导入页面组件
const TradeDashboard = lazy(() => import('./pages/TradeDashboard.jsx'));
const FundTrading = lazy(() => import('./pages/FundTrading.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const AccountSettings = lazy(() => import('./pages/AccountSettings.jsx'));
const AdminContracts = lazy(() => import('./pages/AdminContracts.tsx'));
const AdminFunds = lazy(() => import('./pages/AdminFunds.tsx'));
const AdminOptions = lazy(() => import('./pages/AdminOptions.tsx'));
const AdminUsers = lazy(() => import('./pages/AdminUsers.jsx'));
const ContractTrading = lazy(() => import('./pages/ContractTrading.jsx'));
const FundLogs = lazy(() => import('./pages/FundLogs.jsx'));
const OptionTrading = lazy(() => import('./pages/OptionTrading.jsx'));
const Positions = lazy(() => import('./pages/Positions.tsx'));
const TransactionHistory = lazy(() => import('./pages/TransactionHistory.tsx'));
const Home = lazy(() => import('./pages/Home.tsx'));
const Trade = lazy(() => import('./pages/Trade.tsx'));
const Profile = lazy(() => import('./pages/Profile.tsx'));
const BlockTrading = lazy(() => import('./pages/BlockTrading.jsx'));
const IPOSubscription = lazy(() => import('./pages/IPOSubscription.jsx'));
const FundContract = lazy(() => import('./pages/FundContract.jsx'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard.tsx'));
const MemberManagement = lazy(() => import('./pages/MemberManagement.tsx'));
const TradeManagement = lazy(() => import('./pages/TradeManagement.tsx'));
const DataIntegration = lazy(() => import('./pages/DataIntegration.tsx'));
const SystemSettings = lazy(() => import('./pages/SystemSettings.tsx'));

const LazyAdminDashboard = lazy(() =>
  import('./pages/AdminDashboard.tsx').then((module) => ({ default: module.default })),
);

// 包装主布局和导航的组件
const MainLayout: React.FC = () => {
  return (
    <>
      <div className="flex-grow pt-16">
        {' '}
        {/* Add padding-top to prevent content from being hidden behind the fixed header */}
        <Outlet /> {/* 路由出口 */}
      </div>
      <BottomNavigationBar />
    </>
  );
};

// 基金管理人布局组件
const ManagerLayout: React.FC = () => {
  return (
    <>
      <div className="flex-grow pt-16 pb-16">
        {' '}
        {/* Add padding-top and bottom to prevent content from being hidden behind the fixed header and footer */}
        <Outlet /> {/* 路由出口 */}
      </div>
    </>
  );
};

function App() {
  const userType = useAuth((state) => state.user?.userType);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <SuspenseWrapper>
                <Home />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SuspenseWrapper>
                <TradeDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/trade"
            element={
              <SuspenseWrapper>
                <Trade />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/trade-dashboard"
            element={
              <SuspenseWrapper>
                <TradeDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/positions"
            element={
              <SuspenseWrapper>
                <Positions />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/history"
            element={
              <SuspenseWrapper>
                <TransactionHistory />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/funds"
            element={
              <SuspenseWrapper>
                <FundTrading />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/contracts"
            element={
              <SuspenseWrapper>
                <ContractTrading />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/options"
            element={
              <SuspenseWrapper>
                <OptionTrading />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/block-trading"
            element={
              <SuspenseWrapper>
                <BlockTrading />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/ipo-subscription"
            element={
              <SuspenseWrapper>
                <IPOSubscription />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/fund-contract"
            element={
              <SuspenseWrapper>
                <FundContract />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/profile-page"
            element={
              <SuspenseWrapper>
                <ProfilePage />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/settings"
            element={
              <SuspenseWrapper>
                <AccountSettings />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/fund-logs/:fundId"
            element={
              <SuspenseWrapper>
                <FundLogs />
              </SuspenseWrapper>
            }
          />

          {/* Admin Routes */}
          {userType === 'admin' && (
            <>
              <Route
                path="/admin/dashboard"
                element={
                  <SuspenseWrapper>
                    <LazyAdminDashboard />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <SuspenseWrapper>
                    <AdminUsers />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/admin/funds"
                element={
                  <SuspenseWrapper>
                    <AdminFunds />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/admin/contracts"
                element={
                  <SuspenseWrapper>
                    <AdminContracts />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/admin/options"
                element={
                  <SuspenseWrapper>
                    <AdminOptions />
                  </SuspenseWrapper>
                }
              />
            </>
          )}
        </Route>

        {/* 基金管理人路由 */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
          <Route
            path="/manager/dashboard"
            element={
              <SuspenseWrapper>
                <ManagerDashboard />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/manager/users"
            element={
              <SuspenseWrapper>
                <MemberManagement />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/manager/trades"
            element={
              <SuspenseWrapper>
                <TradeManagement />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/manager/data"
            element={
              <SuspenseWrapper>
                <DataIntegration />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/manager/settings"
            element={
              <SuspenseWrapper>
                <SystemSettings />
              </SuspenseWrapper>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
