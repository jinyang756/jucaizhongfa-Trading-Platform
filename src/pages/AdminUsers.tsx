import { useState } from 'react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');

  // 模拟用户数据
  const users = [
    {
      id: 1,
      username: 'admin001',
      email: 'admin001@example.com',
      userType: 'admin',
      status: 'active',
      registerDate: '2024-01-15',
      lastLogin: '2024-06-10 14:30:25',
    },
    {
      id: 2,
      username: 'testuser01',
      email: 'testuser01@example.com',
      userType: 'user',
      status: 'active',
      registerDate: '2024-02-20',
      lastLogin: '2024-06-10 10:15:32',
    },
    {
      id: 3,
      username: 'investor123',
      email: 'investor123@example.com',
      userType: 'user',
      status: 'inactive',
      registerDate: '2024-03-10',
      lastLogin: '2024-05-28 15:45:18',
    },
    {
      id: 4,
      username: 'trader456',
      email: 'trader456@example.com',
      userType: 'user',
      status: 'active',
      registerDate: '2024-04-05',
      lastLogin: '2024-06-09 09:22:45',
    },
    {
      id: 5,
      username: 'admin002',
      email: 'admin002@example.com',
      userType: 'admin',
      status: 'active',
      registerDate: '2024-01-20',
      lastLogin: '2024-06-10 08:30:12',
    },
  ];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'all' || u.userType === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleUserAction = (userId: number, action: string) => {
    console.log(`Performing ${action} on user ${userId}`);
    alert(`执行操作: ${action} 用户ID: ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">用户管理</h1>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-gray-300">搜索用户</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="用户名或邮箱"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">用户类型</label>
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">全部用户</option>
                <option value="admin">基金管理人</option>
                <option value="user">普通用户</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">用户列表</h2>
            <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              添加用户
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">用户ID</th>
                  <th className="text-left py-2">用户名</th>
                  <th className="text-left py-2">邮箱</th>
                  <th className="text-left py-2">用户类型</th>
                  <th className="text-left py-2">状态</th>
                  <th className="text-left py-2">注册日期</th>
                  <th className="text-left py-2">最后登录</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3">{u.id}</td>
                    <td className="py-3">{u.username}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          u.userType === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                        }`}
                      >
                        {u.userType === 'admin' ? '基金管理人' : '普通用户'}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          u.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      >
                        {u.status === 'active' ? '活跃' : '非活跃'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{u.registerDate}</td>
                    <td className="py-3 text-gray-400">{u.lastLogin}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUserAction(u.id, '编辑')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleUserAction(u.id, '禁用')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          禁用
                        </button>
                        <button
                          onClick={() => handleUserAction(u.id, '删除')}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-400">
              显示 1 到 {filteredUsers.length} 条，共 {users.length} 条记录
            </p>
            <div className="flex space-x-2">
              <button className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded transition-colors">
                上一页
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-3 rounded transition-colors">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
