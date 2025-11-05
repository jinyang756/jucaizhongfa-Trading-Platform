import React from 'react';
import { NavLink } from 'react-router-dom';

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
        `flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors duration-200 \
        ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`
      }
    >
      <div className="text-xl mb-1">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

export const BottomNavigationBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around h-16">
        <NavItem
          to="/home"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          }
          label="首页"
        />
        <NavItem
          to="/trade"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125l7.246-7.246a4.5 4.5 0 016.364 0l.493.492-.75.75a.75.75 0 00-.01.99l2.25 2.25a.75 0 00.99-.01l.75-.75.493.493a4.5 4.5 0 010 6.364L12 21.75l-4.687-4.688a.75.75 0 00-.99.01l-2.25 2.25a.75 0 00-.01-.99l.75-.75-.493-.493a4.5 4.5 0 010-6.364z"
              />
            </svg>
          }
          label="交易大厅"
        />
        <NavItem
          to="/profile"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          }
          label="个人中心"
        />
      </div>
    </nav>
  );
};