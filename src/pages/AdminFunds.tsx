import { useState } from 'react';

const AdminFunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟基金数据
  const funds = [
    {
      id: 1,
      name: '沪深300指数基金',
      code: '160130',
      type: '指数型',
      status: 'active',
      nav: 4.25,
      change: 1.2,
      manager: '张三',
      createTime: '2024-01-15',
    },
    {
      id: 2,
      name: '中证500指数基金',
      code: '160131',
      type: '指数型',
      status: 'active',
      nav: 3.85,
      change: -0.5,
      manager: '李四',
      createTime: '2024-02-20',
    },
    {
      id: 3,
      name: '创业板指数基金',
      code: '160132',
      type: '指数型',
      status: 'inactive',
      nav: 2.95,
      change: 2.1,
      manager: '王五',
      createTime: '2024-03-10',
    },
    {
      id: 4,
      name: '黄金ETF',
      code: '160133',
      type: '商品型',
      status: 'active',
      nav: 3.65,
      change: 0.8,
      manager: '赵六',
      createTime: '2024-04-05',
    },
  ];

  const filteredFunds = funds.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFundAction = (fundId: number, action: string) => {
    console.log(`Performing ${action} on fund ${fundId}`);
    alert(`执行操作: ${action} 基金ID: ${fundId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">基金管理</h1>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-gray-300">搜索基金</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="基金名称或代码"
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

        {/* 基金列表 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">基金列表</h2>
            <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              添加基金
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">基金代码</th>
                  <th className="text-left py-2">基金名称</th>
                  <th className="text-left py-2">类型</th>
                  <th className="text-left py-2">净值</th>
                  <th className="text-left py-2">涨跌</th>
                  <th className="text-left py-2">基金经理</th>
                  <th className="text-left py-2">状态</th>
                  <th className="text-left py-2">创建时间</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunds.map((fund) => (
                  <tr key={fund.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 font-mono">{fund.code}</td>
                    <td className="py-3">{fund.name}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded text-xs bg-blue-600">{fund.type}</span>
                    </td>
                    <td className="py-3">¥{fund.nav.toFixed(4)}</td>
                    <td className={`py-3 ${fund.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {fund.change >= 0 ? '+' : ''}
                      {fund.change.toFixed(2)}%
                    </td>
                    <td className="py-3">{fund.manager}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          fund.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      >
                        {fund.status === 'active' ? '活跃' : '非活跃'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{fund.createTime}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFundAction(fund.id, '编辑')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleFundAction(fund.id, '禁用')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          {fund.status === 'active' ? '禁用' : '启用'}
                        </button>
                        <button
                          onClick={() => handleFundAction(fund.id, '删除')}
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
              显示 1 到 {filteredFunds.length} 条，共 {funds.length} 条记录
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

export default AdminFunds;
