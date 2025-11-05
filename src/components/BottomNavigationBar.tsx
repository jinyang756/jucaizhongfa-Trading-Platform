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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          }
          label="首页"
        />
        <NavItem
          to="/market"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125l7.246-7.246a4.5 4.5 0 016.364 0l.493.492-.75.75a.75.75 0 00-.01.99l2.25 2.25a.75.75 0 00.99-.01l.75-.75.493.493a4.5 4.5 0 010 6.364L12 21.75l-4.687-4.688a.75.75 0 00-.99.01l-2.25 2.25a.75.75 0 00-.01-.99l.75-.75-.493-.493a4.5 4.5 0 010-6.364z" />
            </svg>
          }
          label="行情"
        />
        <NavItem
          to="/trade"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182L12 10.5M12 18V9.75M12 18a3 3 0 003-3V9.75a3 3 0 00-3-3H9.257A3.75 3.75 0 0112 6.75h1.75A2.25 2.25 0 0116 9v3.625m-10.255-4.131A4.5 4.5 0 019 9.75V12h3.75m-3.75 0V6.75m0 0H5.625m0 0a2.25 2.25 0 01-2.25-2.25V4.5m1.5 2.25h1.5m-1.5 0A2.25 2.25 0 005.625 9v1.5m-4.125-9H15.75V4.5a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 009.75 4.5v1.125m-9 0L5.625 4.5M7.5 7.5h9" />
            </svg>
          }
          label="交易"
        />
        <NavItem
          to="/my"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
          label="我的"
        />
      </div>
    </nav>
  );
};