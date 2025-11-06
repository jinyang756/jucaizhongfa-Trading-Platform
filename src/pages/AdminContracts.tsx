import { useState } from 'react';

const AdminContracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟合约数据
  const contracts = [
    {
      id: 1,
      name: '沪深300期货',
      code: 'IF2406',
      type: '股指期货',
      status: 'active',
      price: 3850.2,
      change: 1.2,
      expiry: '2024-06-21',
      createTime: '2024-01-15',
    },
    {
      id: 2,
      name: '上证50期货',
      code: 'IH2406',
      type: '股指期货',
      status: 'active',
      price: 2750.5,
      change: -0.5,
      expiry: '2024-06-21',
      createTime: '2024-02-20',
    },
    {
      id: 3,
      name: '中证1000期货',
      code: 'IM2406',
      type: '股指期货',
      status: 'inactive',
      price: 6250.8,
      change: 2.1,
      expiry: '2024-06-21',
      createTime: '2024-03-10',
    },
    {
      id: 4,
      name: '黄金期货',
      code: 'AU2406',
      type: '商品期货',
      status: 'active',
      price: 425.6,
      change: 0.8,
      expiry: '2024-06-21',
      createTime: '2024-04-05',
    },
  ];

  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleContractAction = (contractId: number, action: string) => {
    console.log(`Performing ${action} on contract ${contractId}`);
    alert(`执行操作: ${action} 合约ID: ${contractId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">合约管理</h1>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-gray-300">搜索合约</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="合约名称或代码"
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

        {/* 合约列表 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">合约列表</h2>
            <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              添加合约
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">合约代码</th>
                  <th className="text-left py-2">合约名称</th>
                  <th className="text-left py-2">类型</th>
                  <th className="text-left py-2">最新价</th>
                  <th className="text-left py-2">涨跌</th>
                  <th className="text-left py-2">到期日</th>
                  <th className="text-left py-2">状态</th>
                  <th className="text-left py-2">创建时间</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 font-mono">{contract.code}</td>
                    <td className="py-3">{contract.name}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded text-xs bg-blue-600">{contract.type}</span>
                    </td>
                    <td className="py-3">{contract.price.toFixed(1)}</td>
                    <td
                      className={`py-3 ${contract.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {contract.change >= 0 ? '+' : ''}
                      {contract.change.toFixed(2)}%
                    </td>
                    <td className="py-3">{contract.expiry}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          contract.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      >
                        {contract.status === 'active' ? '活跃' : '非活跃'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{contract.createTime}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleContractAction(contract.id, '编辑')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleContractAction(contract.id, '禁用')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          {contract.status === 'active' ? '禁用' : '启用'}
                        </button>
                        <button
                          onClick={() => handleContractAction(contract.id, '删除')}
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
              显示 1 到 {filteredContracts.length} 条，共 {contracts.length} 条记录
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

export default AdminContracts;
