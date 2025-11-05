import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '../store/useAuth';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors duration-200 \
        ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`
      }
    >
      <div className="text-xl mb-1">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

export const ManagerNavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around h-16">
        <NavItem to="/manager/dashboard" icon={<HomeOutlined />} label="首页" />
        <NavItem to="/manager/users" icon={<UserOutlined />} label="会员管理" />
        <NavItem to="/manager/trades" icon={<DollarCircleOutlined />} label="交易管理" />
        <NavItem to="/manager/data" icon={<BarChartOutlined />} label="数据集成" />
        <NavItem to="/manager/settings" icon={<SettingOutlined />} label="系统设置" />
        <div
          className="flex flex-col items-center justify-center py-2 text-xs font-medium text-slate-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
          onClick={handleLogout}
        >
          <div className="text-xl mb-1">
            <LogoutOutlined />
          </div>
          <span>退出</span>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNavigationBar;
