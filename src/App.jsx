import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import TradeDashboard from './pages/TradeDashboard.jsx';
import FundTrading from './pages/FundTrading.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import AdminContracts from './pages/AdminContracts.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import AdminFunds from './pages/AdminFunds.jsx';
import AdminOptions from './pages/AdminOptions.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import ContractTrading from './pages/ContractTrading.jsx';
import ErrorTest from './pages/ErrorTest.jsx';
import FundLogs from './pages/FundLogs.jsx';
import OptionTrading from './pages/OptionTrading.jsx';
import Positions from './pages/Positions.jsx';
import TransactionHistory from './pages/TransactionHistory.jsx';
import { UserDashboard } from './pages/UserDashboard.jsx';
import { useAuth } from './store/useAuth.js';

const LazyAdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx').then(module => ({ default: module.AdminDashboard })));

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 包装主布局和导航的组件
const MainLayout = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 p-4 text-white flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-gray-800 shadow-md' : 'bg-transparent'}`}>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-gray-300">首页</Link>
                    <Link to="/trade" className="hover:text-gray-300">交易</Link>
                    <Link to="/profile" className="hover:text-gray-300">个人中心</Link>
                </div>
                <div>
                    {user ? (
                        <span className="mr-4">欢迎, {user.name}</span>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">登录</Link>
                    )}
                    {user && (
                        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            退出
                        </button>
                    )}
                </div>
            </nav>
            <div className="flex-grow pt-16"> {/* Add padding-top to prevent content from being hidden behind the fixed header */}
                <Outlet /> {/* 路由出口 */}
            </div>
            {/* 底部导航条（移动端） - Placeholder for now */}
            <footer className="bg-gray-800 p-4 text-white text-center">
                © 2023 QuantumX Trading Platform
            </footer>
        </>
    );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<TradeDashboard />} />
          <Route path="trade" element={<FundTrading />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="admin-contracts" element={<AdminContracts />} />
          <Route path="admin-dashboard" element={<Suspense fallback={<div>加载管理面板中...</div>}><LazyAdminDashboard /></Suspense>} />
          <Route path="admin-funds" element={<AdminFunds />} />
          <Route path="admin-options" element={<AdminOptions />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="contract-trading" element={<ContractTrading />} />
          <Route path="error-test" element={<ErrorTest />} />
          <Route path="fund-logs" element={<FundLogs />} />
          <Route path="fund-trading" element={<FundTrading />} />
          <Route path="option-trading" element={<OptionTrading />} />
          <Route path="positions" element={<Positions />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route path="user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;