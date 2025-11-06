import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, HomeOutlined, BellOutlined } from '@ant-design/icons';

const TopNavigationBar = ({ title, showBackButton = true, showHomeButton = true, showNotificationButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="返回"
          >
            <ArrowLeftOutlined className="text-xl text-gray-600" />
          </button>
        )}
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-800 truncate px-4">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        {showHomeButton && (
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="首页"
          >
            <HomeOutlined className="text-xl text-gray-600" />
          </button>
        )}
        
        {showNotificationButton && (
          <button
            onClick={() => navigate('/notifications')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="消息通知"
          >
            <BellOutlined className="text-xl text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopNavigationBar;