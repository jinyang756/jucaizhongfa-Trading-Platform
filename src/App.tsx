import React, { lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary'; // Error boundary for handling errors
import LoginPage from './pages/Login.jsx'; // Login page
import TradeDashboard from './pages/TradeDashboard.jsx'; // Trade dashboard
import FundTrading from './pages/FundTrading.jsx'; // Fund trading
import ProfilePage from './pages/ProfilePage.jsx'; // Profile page
import AccountSettings from './pages/AccountSettings.jsx'; // Account settings
import AdminContracts from './pages/AdminContracts.jsx'; // Admin contracts
import AdminFunds from './pages/AdminFunds.jsx'; // Admin funds
import AdminOptions from './pages/AdminOptions.jsx'; // Admin options
import AdminUsers from './pages/AdminUsers.jsx'; // Admin users
import ContractTrading from './pages/ContractTrading.jsx'; // Contract trading
import ErrorTest from './pages/ErrorTest.jsx'; // Error test
import FundLogs from './pages/FundLogs.jsx'; // Fund logs
import OptionTrading from './pages/OptionTrading.jsx'; // Option trading
import Positions from './pages/Positions.tsx'; // Positions
import TransactionHistory from './pages/TransactionHistory.tsx'; // Transaction history
// import { UserDashboard } from './pages/UserDashboard.jsx'; // Removed unused import
import MyDashboard from './pages/MyDashboard.tsx'; // My dashboard
import Home from './pages/Home.tsx'; // Home page (standard)
import Trade from './pages/Trade.tsx'; // Trade page (standard)
import Profile from './pages/Profile.tsx'; // Profile page (standard)
import { useAuth } from './store/useAuth'; // Authentication store
import { ProtectedRoute } from './components/ProtectedRoute.tsx'; // Protected route component
import { BottomNavigationBar } from './components/BottomNavigationBar.tsx'; // Bottom navigation bar

const LazyAdminDashboard = lazy(() =>
  import('./pages/AdminDashboard.tsx').then((module) => ({ default: module.AdminDashboard })),
);

// 包装主布局和导航的组件
const MainLayout: React.FC = () => {
  return (
    <>
      {/* <nav className="some-fixed-class">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-gray-300">首页</Link>
                    <Link to="/trade" className="hover:text-gray-300">交易</Link>
                    <Link to="/profile" className="hover:text-gray-300">个人中心</Link>
                </div>
                <div>
                    {user ? (
                        <span className="mr-4">欢迎, {user.username}</span>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">登录</Link>
                    )}
                    {user && (
                        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            退出
                        </button>
                    )}
                </div>
            </nav> */}
      <div className="flex-grow pt-16">
        {' '}
        {/* Add padding-top to prevent content from being hidden behind the fixed header */}
        <Outlet /> {/* 路由出口 */}
      </div>
      <BottomNavigationBar />
    </>
  );
};

function App() {
  const userType = useAuth((state) => state.user?.userType);

  return (
    <ErrorBoundary>
      {/* <Router> */}
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
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<MyDashboard />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/trade-dashboard" element={<TradeDashboard />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/funds" element={<FundTrading />} />
          <Route path="/contracts" element={<ContractTrading />} />
          <Route path="/options" element={<OptionTrading />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/fund-logs/:fundId" element={<FundLogs />} />
          <Route path="/error-test" element={<ErrorTest />} />

          {/* Admin Routes */}
          {userType === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<LazyAdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/funds" element={<AdminFunds />} />
              <Route path="/admin/contracts" element={<AdminContracts />} />
              <Route path="/admin/options" element={<AdminOptions />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      {/* </Router> */}
    </ErrorBoundary>
  );
}

export default App;
