import { useState } from 'react';
import { useAuth } from '../store/useAuth';

const AccountSettings = () => {
  const { user, sendVerificationCode, verifyEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState(user?.email || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleSaveProfile = () => {
    // 这里应该是调用API保存用户信息
    console.log('Saving profile:', tempUser);
    setIsEditing(false);
    alert('个人信息已保存');
  };

  const handleSendCode = async () => {
    if (!email) {
      alert('请输入邮箱地址');
      return;
    }

    const result = await sendVerificationCode(email);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || '发送验证码失败');
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      alert('请输入验证码');
      return;
    }

    const result = await verifyEmail(verificationCode);
    if (result.success) {
      alert(result.message);
      setVerificationCode('');
    } else {
      alert(result.message || '验证失败');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">账户设置</h1>

        {/* 标签页 */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            个人信息
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-4 font-medium ${activeTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            安全设置
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`py-2 px-4 font-medium ${activeTab === 'notification' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            通知设置
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">个人信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-300">用户名</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempUser.username}
                    onChange={(e) => setTempUser({ ...tempUser, username: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-lg">{user?.username}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-300">用户ID</label>
                <p className="text-lg">{user?.id}</p>
              </div>

              <div>
                <label className="block mb-2 text-gray-300">用户类型</label>
                <p className="text-lg">{user?.userType === 'admin' ? '基金管理人' : '普通用户'}</p>
              </div>

              <div>
                <label className="block mb-2 text-gray-300">邮箱地址</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempUser.email}
                    onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-lg">{user?.email || '未绑定'}</p>
                )}
              </div>

              <div className="pt-4">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition-colors"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                  >
                    编辑信息
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">安全设置</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">邮箱绑定</h3>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入邮箱地址"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendCode}
                    className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                  >
                    发送验证码
                  </button>
                </div>

                <div className="flex space-x-3 mt-3">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleVerifyEmail}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors"
                  >
                    验证邮箱
                  </button>
                </div>

                {user?.email && (
                  <div className="mt-3">
                    <p className="text-gray-400">当前绑定邮箱: {user.email}</p>
                    <p
                      className={`text-sm ${user.isEmailVerified ? 'text-green-400' : 'text-yellow-400'}`}
                    >
                      {user.isEmailVerified ? '✓ 已验证' : '⚠ 未验证'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">修改密码</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block mb-2 text-gray-300">当前密码</label>
                    <input
                      type="password"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="请输入当前密码"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300">新密码</label>
                    <input
                      type="password"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="请输入新密码"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-300">确认新密码</label>
                    <input
                      type="password"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="请再次输入新密码"
                    />
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
                    修改密码
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notification' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">通知设置</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">交易通知</h3>
                  <p className="text-gray-400 text-sm">订单成交、撤单等交易相关通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">系统通知</h3>
                  <p className="text-gray-400 text-sm">系统维护、公告等通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">市场资讯</h3>
                  <p className="text-gray-400 text-sm">重要市场资讯和分析报告</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
