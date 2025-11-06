import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const FundLogs = () => {
  const { fundId } = useParams();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('30d'); // 7d, 30d, 90d

  // 模拟基金信息
  const fundInfo = {
    id: fundId,
    name: '沪深300指数基金',
    code: '160130',
    nav: 4.25,
    change: 1.2,
    changePercent: 0.8,
  };

  // 模拟基金交易记录
  const fundLogs = [
    {
      id: 1,
      type: '买入',
      amount: 10000,
      nav: 4.2,
      total: 42000,
      time: '2024-06-10 14:30:25',
      status: '已成交',
    },
    {
      id: 2,
      type: '卖出',
      amount: 5000,
      nav: 4.15,
      total: 20750,
      time: '2024-06-05 10:15:32',
      status: '已成交',
    },
    {
      id: 3,
      type: '买入',
      amount: 8000,
      nav: 4.18,
      total: 33440,
      time: '2024-06-01 09:45:18',
      status: '已成交',
    },
    {
      id: 4,
      type: '分红',
      amount: 0,
      nav: 0,
      total: 1200,
      time: '2024-05-28 15:00:00',
      status: '已到账',
    },
  ];

  // 计算总收益
  const totalProfit =
    fundLogs.filter((log) => log.type === '卖出').reduce((sum, log) => sum + log.total, 0) -
    fundLogs.filter((log) => log.type === '买入').reduce((sum, log) => sum + log.total, 0) +
    fundLogs.filter((log) => log.type === '分红').reduce((sum, log) => sum + log.total, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">基金交易记录</h1>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded transition-colors"
          >
            返回
          </button>
        </div>

        {/* 基金基本信息 */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{fundInfo.name}</h2>
              <p className="text-gray-400">基金代码: {fundInfo.code}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">¥{fundInfo.nav.toFixed(4)}</p>
              <p className={`text-lg ${fundInfo.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {fundInfo.change >= 0 ? '+' : ''}
                {fundInfo.change.toFixed(2)} ({fundInfo.change >= 0 ? '+' : ''}
                {fundInfo.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400">持有份额</p>
            <p className="text-xl font-semibold">10,000份</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400">持仓成本</p>
            <p className="text-xl font-semibold">¥4.20</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400">当前价值</p>
            <p className="text-xl font-semibold">¥{fundInfo.nav * 10000}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400">累计收益</p>
            <p
              className={`text-xl font-semibold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {totalProfit >= 0 ? '+' : ''}
              {totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* 交易记录 */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">交易记录</h2>
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

          {fundLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">类型</th>
                    <th className="text-left py-2">份额</th>
                    <th className="text-left py-2">净值</th>
                    <th className="text-left py-2">金额</th>
                    <th className="text-left py-2">时间</th>
                    <th className="text-left py-2">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {fundLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            log.type === '买入'
                              ? 'bg-green-600'
                              : log.type === '卖出'
                                ? 'bg-red-600'
                                : 'bg-yellow-600'
                          }`}
                        >
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3">{log.amount > 0 ? log.amount.toLocaleString() : '-'}</td>
                      <td className="py-3">{log.nav > 0 ? `¥${log.nav.toFixed(4)}` : '-'}</td>
                      <td className="py-3">
                        {log.total > 0
                          ? `¥${log.total.toLocaleString()}`
                          : `¥${Math.abs(log.total).toLocaleString()}`}
                      </td>
                      <td className="py-3 text-gray-400">{log.time}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            log.status === '已成交' || log.status === '已到账'
                              ? 'bg-green-600'
                              : 'bg-gray-600'
                          }`}
                        >
                          {log.status}
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
      </div>
    </div>
  );
};

export default FundLogs;
