import { useState } from 'react';

const TradeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟交易数据
  const trades = [
    {
      id: 1,
      username: 'investor123',
      product: '沪深300指数基金',
      code: '160130',
      type: '基金',
      direction: '买入',
      amount: 10000,
      price: 4.2,
      total: 42000,
      time: '2024-06-10 14:30:25',
      status: '已成交',
    },
    {
      id: 2,
      username: 'trader456',
      product: 'IF2406期货',
      code: 'IF2406',
      type: '期货',
      direction: '卖出',
      amount: 5,
      price: 3850.2,
      total: 192510,
      time: '2024-06-10 11:15:42',
      status: '已成交',
    },
    {
      id: 3,
      username: 'conservative789',
      product: '50ETF购6月3.5',
      code: '10003503',
      type: '期权',
      direction: '买入',
      amount: 10,
      price: 0.125,
      total: 1250,
      time: '2024-06-10 10:22:18',
      status: '已成交',
    },
    {
      id: 4,
      username: 'balanced_user',
      product: '创业板指数基金',
      code: '160132',
      type: '基金',
      direction: '卖出',
      amount: 5000,
      price: 2.95,
      total: 14750,
      time: '2024-06-10 09:45:33',
      status: '已成交',
    },
  ];

  const filteredTrades = trades.filter((t) => {
    const matchesSearch =
      t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleTradeAction = (tradeId: number, action: string) => {
    console.log(`Performing ${action} on trade ${tradeId}`);
    alert(`执行操作: ${action} 交易ID: ${tradeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">交易管理</h1>

        {/* 搜索和筛选 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 text-gray-300">搜索交易</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="用户名、产品名称或代码"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">交易类型</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">全部类型</option>
                <option value="基金">基金</option>
                <option value="期货">期货</option>
                <option value="期权">期权</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-300">状态</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">全部状态</option>
                <option value="已成交">已成交</option>
                <option value="未成交">未成交</option>
                <option value="已撤单">已撤单</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* 交易列表 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">交易列表</h2>
            <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
              导出数据
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">交易ID</th>
                  <th className="text-left py-2">用户名</th>
                  <th className="text-left py-2">产品名称</th>
                  <th className="text-left py-2">产品代码</th>
                  <th className="text-left py-2">类型</th>
                  <th className="text-left py-2">方向</th>
                  <th className="text-left py-2">数量</th>
                  <th className="text-left py-2">价格</th>
                  <th className="text-left py-2">金额</th>
                  <th className="text-left py-2">时间</th>
                  <th className="text-left py-2">状态</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3">{trade.id}</td>
                    <td className="py-3">{trade.username}</td>
                    <td className="py-3">{trade.product}</td>
                    <td className="py-3 font-mono">{trade.code}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded text-xs bg-indigo-600">{trade.type}</span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${trade.direction === '买入' ? 'bg-green-600' : 'bg-red-600'}`}
                      >
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3">{trade.amount.toLocaleString()}</td>
                    <td className="py-3">
                      ¥
                      {trade.price.toFixed(
                        trade.type === '基金' ? 4 : trade.type === '期权' ? 3 : 1,
                      )}
                    </td>
                    <td className="py-3">¥{trade.total.toLocaleString()}</td>
                    <td className="py-3 text-gray-400">{trade.time}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          trade.status === '已成交'
                            ? 'bg-green-600'
                            : trade.status === '未成交'
                              ? 'bg-yellow-600'
                              : 'bg-gray-600'
                        }`}
                      >
                        {trade.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTradeAction(trade.id, '查看详情')}
                          className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                          查看
                        </button>
                        <button
                          onClick={() => handleTradeAction(trade.id, '撤单')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          撤单
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
              显示 1 到 {filteredTrades.length} 条，共 {trades.length} 条记录
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

export default TradeManagement;
