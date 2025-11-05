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

// 新增的页面组件
import BlockTrading from './pages/BlockTrading.jsx'; // 大宗交易
import IPOSubscription from './pages/IPOSubscription.jsx'; // 新股申购

// 基金管理人相关页面组件
import ManagerDashboard from './pages/ManagerDashboard.tsx'; // 基金管理人首页
import MemberManagement from './pages/MemberManagement.tsx'; // 会员管理
import TradeManagement from './pages/TradeManagement.tsx'; // 交易管理
import DataIntegration from './pages/DataIntegration.tsx'; // 数据集成
import SystemSettings from './pages/SystemSettings.tsx'; // 系统设置

const LazyAdminDashboard = lazy(() =>
  import('./pages/AdminDashboard.tsx').then((module) => ({ default: module.default })),
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
          <Route path="/block-trading" element={<BlockTrading />} />
          <Route path="/ipo-subscription" element={<IPOSubscription />} />
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
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/users" element={<MemberManagement />} />
          <Route path="/manager/trades" element={<TradeManagement />} />
          <Route path="/manager/data" element={<DataIntegration />} />
          <Route path="/manager/settings" element={<SystemSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      {/* </Router> */}
    </ErrorBoundary>
  );
}

export default App;
