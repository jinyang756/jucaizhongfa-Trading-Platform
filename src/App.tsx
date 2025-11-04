import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import { ToastProvider } from './components/Toast';
import ThemeProvider from './components/ThemeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminFunds } from './pages/AdminFunds';
import { AdminOptions } from './pages/AdminOptions';
import { AdminContracts } from './pages/AdminContracts';
import { UserDashboard } from './pages/UserDashboard';
import ErrorTest from './pages/ErrorTest';
import { TradeDashboard } from './pages/TradeDashboard';
import { MyDashboard } from './pages/MyDashboard';
import MarketDashboard from './components/MarketDashboard';
import { BottomNavigationBar } from './components/BottomNavigationBar';
import { ProfilePage } from './pages/ProfilePage'; // 导入 ProfilePage

// ✅ 智能重定向组件必须在 Router 内部使用
const RootRedirect = () => {
  const { user, isLoading } = useAuth();
  
  // 加载时显示空白或加载状态，防止闪烁
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  if (user.userType === 'admin') return <Navigate to="/manager" replace />;
  return <Navigate to="/home" replace />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Router>
              <div className="App flex flex-col min-h-screen">
                <div className="flex-grow pb-16">
                  <Routes>
                    {/* ============= 公共路由 ============= */}
                    <Route 
                      path="/login" 
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      } 
                    />

                    {/* ============= 管理员路由 ============= */}
                    {/* 管理员首页 */}
                    <Route 
                      path="/manager" 
                      element={
                        <ProtectedRoute requiredUserType="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 管理员 - 用户管理 */}
                    <Route 
                      path="/manager/users" 
                      element={
                        <ProtectedRoute requiredUserType="admin">
                          <AdminUsers />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 管理员 - 基金管理 */}
                    <Route 
                      path="/manager/funds" 
                      element={
                        <ProtectedRoute requiredUserType="admin">
                          <AdminFunds />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 管理员 - 期权管理 */}
                    <Route 
                      path="/manager/options" 
                      element={
                        <ProtectedRoute requiredUserType="admin">
                          <AdminOptions />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 管理员 - 合约管理 */}
                    <Route 
                      path="/manager/contracts" 
                      element={
                        <ProtectedRoute requiredUserType="admin">
                          <AdminContracts />
                        </ProtectedRoute>
                      } 
                    />

                    {/* ============= 用户路由 ============= */}
                    {/* 用户首页 */}
                    <Route 
                      path="/home" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <UserDashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 行情页面 */}
                    <Route 
                      path="/market" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <MarketDashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 交易中心首页 */}
                    <Route 
                      path="/trade" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <TradeDashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 交易 - 基金交易（临时占位符） */}
                    <Route 
                      path="/trade/funds" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <div className="min-h-screen bg-gray-50 p-6">
                            <h1 className="text-2xl font-bold">基金交易页面</h1>
                            <p className="mt-4 text-gray-600">开发中...</p>
                          </div>
                        </ProtectedRoute>
                      } 
                    />

                    {/* 交易 - 期权交易（临时占位符） */}
                    <Route 
                      path="/trade/options" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <div className="min-h-screen bg-gray-50 p-6">
                            <h1 className="text-2xl font-bold">期权交易页面</h1>
                            <p className="mt-4 text-gray-600">开发中...</p>
                          </div>
                        </ProtectedRoute>
                      } 
                    />

                    {/* 交易 - 合约交易（临时占位符） */}
                    <Route 
                      path="/trade/contracts" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <div className="min-h-screen bg-gray-50 p-6">
                            <h1 className="text-2xl font-bold">合约交易页面</h1>
                            <p className="mt-4 text-gray-600">开发中...</p>
                          </div>
                        </ProtectedRoute>
                      } 
                    />

                    {/* 我的页面 */}
                    <Route 
                      path="/my" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <MyDashboard />
                        </ProtectedRoute>
                      } 
                    />

                    {/* 账户设置页面 */}
                    <Route 
                      path="/user/profile" 
                      element={
                        <ProtectedRoute requiredUserType="user">
                          <ProfilePage />
                        </ProtectedRoute>
                      } 
                    />

                    {/* ============= 其他路由 ============= */}
                    {/* 错误测试页面 */}
                    <Route path="/error-test" element={<ErrorTest />} />

                    {/* 默认路由 - 智能重定向 */}
                    <Route path="/" element={<RootRedirect />} />
                    
                    {/* 404 页面 - 智能重定向 */}
                    <Route path="*" element={<RootRedirect />} />
                  </Routes>
                </div>
                <AuthDependentBottomNav />
              </div>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

const AuthDependentBottomNav = () => {
  const { user } = useAuth();
  if (user && user.userType === 'user') {
    return <BottomNavigationBar />;
  }
  return null;
};

export default App;