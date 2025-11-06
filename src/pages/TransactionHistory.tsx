import { useState } from 'react';

const TransactionHistory = () => {
  const [dateRange, setDateRange] = useState('7d'); // 7d, 30d, 90d

  // 模拟交易历史数据
  const transactions = [
    {
      id: 1,
      name: '沪深300指数基金',
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
      name: 'IF2406期货',
      code: 'IF2406',
      type: '期货',
      direction: '卖出',
      amount: 5,
      price: 3850.2,
      total: 192510,
      time: '2024-06-09 11:15:42',
      status: '已成交',
    },
    {
      id: 3,
      name: '50ETF购6月3.5',
      code: '10003503',
      type: '期权',
      direction: '买入',
      amount: 10,
      price: 0.125,
      total: 1250,
      time: '2024-06-08 10:22:18',
      status: '已成交',
    },
    {
      id: 4,
      name: '创业板指数基金',
      code: '160132',
      type: '基金',
      direction: '卖出',
      amount: 5000,
      price: 2.95,
      total: 14750,
      time: '2024-06-07 15:45:33',
      status: '已成交',
    },
    {
      id: 5,
      name: '黄金期货',
      code: 'AU2406',
      type: '期货',
      direction: '买入',
      amount: 2,
      price: 420.5,
      total: 84100,
      time: '2024-06-06 09:35:17',
      status: '已成交',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">交易历史</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-3 py-1 rounded ${dateRange === '7d' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              近7天
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-3 py-1 rounded ${dateRange === '30d' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              近30天
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`px-3 py-1 rounded ${dateRange === '90d' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              近90天
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">产品名称</th>
                    <th className="text-left py-2">产品代码</th>
                    <th className="text-left py-2">类型</th>
                    <th className="text-left py-2">方向</th>
                    <th className="text-left py-2">数量</th>
                    <th className="text-left py-2">价格</th>
                    <th className="text-left py-2">金额</th>
                    <th className="text-left py-2">时间</th>
                    <th className="text-left py-2">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3">{transaction.name}</td>
                      <td className="py-3">{transaction.code}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded text-xs bg-indigo-600">
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${transaction.direction === '买入' ? 'bg-green-600' : 'bg-red-600'}`}
                        >
                          {transaction.direction}
                        </span>
                      </td>
                      <td className="py-3">{transaction.amount.toLocaleString()}</td>
                      <td className="py-3">
                        ¥
                        {transaction.price.toFixed(
                          transaction.type === '基金' ? 4 : transaction.type === '期权' ? 3 : 1,
                        )}
                      </td>
                      <td className="py-3">¥{transaction.total.toLocaleString()}</td>
                      <td className="py-3 text-gray-400">{transaction.time}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            transaction.status === '已成交' ? 'bg-green-600' : 'bg-gray-600'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>暂无交易记录</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">统计概览</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-gray-400">总交易笔数</p>
              <p className="text-2xl font-semibold">{transactions.length}</p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-gray-400">买入总额</p>
              <p className="text-2xl font-semibold">
                ¥
                {transactions
                  .filter((t) => t.direction === '买入')
                  .reduce((sum, t) => sum + t.total, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-gray-400">卖出总额</p>
              <p className="text-2xl font-semibold">
                ¥
                {transactions
                  .filter((t) => t.direction === '卖出')
                  .reduce((sum, t) => sum + t.total, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-750 p-4 rounded-lg">
              <p className="text-gray-400">净交易额</p>
              <p className="text-2xl font-semibold">
                ¥
                {(
                  transactions
                    .filter((t) => t.direction === '卖出')
                    .reduce((sum, t) => sum + t.total, 0) -
                  transactions
                    .filter((t) => t.direction === '买入')
                    .reduce((sum, t) => sum + t.total, 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
