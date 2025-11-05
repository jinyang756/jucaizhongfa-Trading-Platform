import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">个人中心</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">用户信息</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <p className="mt-1">user123</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <p className="mt-1">user@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">账户余额</label>
            <p className="mt-1">¥10,000.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
