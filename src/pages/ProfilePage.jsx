import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">个人资料</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-400">用户ID: {user.id}</p>
              <p className="text-gray-400">
                用户类型: {user.userType === 'admin' ? '基金管理人' : '普通用户'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">账户余额</h3>
              <p className="text-2xl text-green-400">¥{user.currentBalance.toFixed(2)}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">权限信息</h3>
              <ul className="text-sm space-y-1">
                <li className={user.permissions.fund ? 'text-green-400' : 'text-red-400'}>
                  基金交易: {user.permissions.fund ? '允许' : '禁止'}
                </li>
                <li className={user.permissions.option ? 'text-green-400' : 'text-red-400'}>
                  期权交易: {user.permissions.option ? '允许' : '禁止'}
                </li>
                <li className={user.permissions.contract ? 'text-green-400' : 'text-red-400'}>
                  合约交易: {user.permissions.contract ? '允许' : '禁止'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">账户设置</h2>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/settings')}
              className="w-full bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg text-left transition-colors"
            >
              账户设置
            </button>
            <button
              onClick={() => navigate('/history')}
              className="w-full bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg text-left transition-colors"
            >
              交易历史
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg text-left transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
