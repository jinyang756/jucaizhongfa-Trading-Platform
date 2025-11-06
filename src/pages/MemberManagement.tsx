import { useState } from 'react';

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟会员数据
  const members = [
    {
      id: 1,
      username: 'investor123',
      email: 'investor123@example.com',
      status: 'active',
      registerDate: '2024-03-10',
      lastLogin: '2024-06-10 14:30:25',
      totalInvestment: '¥1,250,000',
      riskLevel: '中等',
    },
    {
      id: 2,
      username: 'trader456',
      email: 'trader456@example.com',
      status: 'active',
      registerDate: '2024-04-05',
      lastLogin: '2024-06-10 10:15:32',
      totalInvestment: '¥850,000',
      riskLevel: '积极',
    },
    {
      id: 3,
      username: 'conservative789',
      email: 'conservative789@example.com',
      status: 'inactive',
      registerDate: '2024-01-20',
      lastLogin: '2024-05-28 15:45:18',
      totalInvestment: '¥2,100,000',
      riskLevel: '保守',
    },
    {
      id: 4,
      username: 'balanced_user',
      email: 'balanced@example.com',
      status: 'active',
      registerDate: '2024-02-15',
      lastLogin: '2024-06-09 09:22:45',
      totalInvestment: '¥1,800,000',
      riskLevel: '稳健',
    },
  ];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMemberAction = (memberId: number, action: string) => {
    console.log(`Performing ${action} on member ${memberId}`);
    alert(`执行操作: ${action} 会员ID: ${memberId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">会员管理</h1>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-gray-300">搜索会员</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="用户名或邮箱"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">状态</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">全部状态</option>
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* 会员列表 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">会员列表</h2>
            <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              添加会员
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">用户ID</th>
                  <th className="text-left py-2">用户名</th>
                  <th className="text-left py-2">邮箱</th>
                  <th className="text-left py-2">状态</th>
                  <th className="text-left py-2">总投资</th>
                  <th className="text-left py-2">风险等级</th>
                  <th className="text-left py-2">注册日期</th>
                  <th className="text-left py-2">最后登录</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3">{member.id}</td>
                    <td className="py-3">{member.username}</td>
                    <td className="py-3">{member.email}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          member.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      >
                        {member.status === 'active' ? '活跃' : '非活跃'}
                      </span>
                    </td>
                    <td className="py-3">{member.totalInvestment}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          member.riskLevel === '保守'
                            ? 'bg-blue-600'
                            : member.riskLevel === '稳健'
                              ? 'bg-green-600'
                              : member.riskLevel === '中等'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                        }`}
                      >
                        {member.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{member.registerDate}</td>
                    <td className="py-3 text-gray-400">{member.lastLogin}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleMemberAction(member.id, '查看详情')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          查看
                        </button>
                        <button
                          onClick={() => handleMemberAction(member.id, '编辑')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleMemberAction(member.id, '禁用')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          禁用
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
              显示 1 到 {filteredMembers.length} 条，共 {members.length} 条记录
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

export default MemberManagement;
