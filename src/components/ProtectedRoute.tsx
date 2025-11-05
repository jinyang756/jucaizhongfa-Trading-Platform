import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/useAuth.js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'admin' | 'user';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
  redirectTo = '/login',
}) => {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const user = useAuth((state) => state.user);
  const location = useLocation();

  // 未登录重定向到登录页
  if (!isLoggedIn || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 检查用户类型权限
  if (requiredUserType && user.userType !== requiredUserType) {
    // 如果是管理员访问用户页面，重定向到管理员首页
    if (user.userType === 'admin') {
      return <Navigate to="/manager" replace />;
    }
    // 如果是用户访问管理员页面，重定向到用户首页
    if (user.userType === 'user') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// 公共路由组件（已登录用户不能访问，如登录页）
interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const user = useAuth((state) => state.user);

  // 已登录用户重定向到对应首页
  if (isLoggedIn && user) {
    if (user.userType === 'admin') {
      return <Navigate to="/manager" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
