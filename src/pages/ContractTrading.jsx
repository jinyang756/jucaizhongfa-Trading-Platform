import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const ContractTrading = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useState(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy'); // buy or sell
  const [leverage, setLeverage] = useState(10);

  // 模拟合约数据
  const contracts = [
    { id: 1, name: '沪深300期货', code: 'IF2406', price: 3850.2, change: 1.2, changePercent: 0.8 },
    { id: 2, name: '上证50期货', code: 'IH2406', price: 2750.5, change: -0.5, changePercent: -0.3 },
    { id: 3, name: '中证1000期货', code: 'IM2406', price: 6250.8, change: 2.1, changePercent: 1.5 },
    { id: 4, name: '黄金期货', code: 'AU2406', price: 425.6, change: 0.8, changePercent: 0.4 },
  ];

  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
  };

  const handleTrade = () => {
    if (!selectedContract || !tradeAmount) {
      alert('请选择合约并输入交易手数');
      return;
    }

    const amount = parseInt(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('请输入有效的交易手数');
      return;
    }

    alert(`${tradeType === 'buy' ? '做多' : '做空'} ${selectedContract.name} ${amount}手成功！`);
    setTradeAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">合约交易</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 合约列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">可交易合约</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">合约名称</th>
                      <th className="text-left py-2">合约代码</th>
                      <th className="text-left py-2">最新价</th>
                      <th className="text-left py-2">涨跌</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-3">{contract.name}</td>
                        <td className="py-3">{contract.code}</td>
                        <td className="py-3">{contract.price.toFixed(1)}</td>
                        <td
                          className={`py-3 ${contract.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {contract.change >= 0 ? '+' : ''}
                          {contract.change.toFixed(2)} ({contract.change >= 0 ? '+' : ''}
                          {contract.changePercent.toFixed(2)}%)
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleContractSelect(contract)}
                            className="bg-indigo-600 hover:bg-indigo-700 py-1 px-3 rounded text-sm transition-colors"
                          >
                            交易
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧 - 交易面板 */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">交易面板</h2>

              {selectedContract ? (
                <div className="space-y-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedContract.name}</h3>
                    <p className="text-gray-400 text-sm">合约代码: {selectedContract.code}</p>
                    <p className="text-lg mt-2">最新价: {selectedContract.price.toFixed(1)}</p>
                    <p
                      className={`mt-1 ${selectedContract.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {selectedContract.change >= 0 ? '+' : ''}
                      {selectedContract.change.toFixed(2)} (
                      {selectedContract.change >= 0 ? '+' : ''}
                      {selectedContract.changePercent.toFixed(2)}%)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">交易方向</label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTradeType('buy')}
                          className={`flex-1 py-2 rounded ${tradeType === 'buy' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          做多
                        </button>
                        <button
                          onClick={() => setTradeType('sell')}
                          className={`flex-1 py-2 rounded ${tradeType === 'sell' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          做空
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2">交易手数</label>
                      <input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="请输入交易手数"
                      />
                    </div>

                    <div>
                      <label className="block mb-2">杠杆倍数: {leverage}x</label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={leverage}
                        onChange={(e) => setLeverage(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>1x</span>
                        <span>100x</span>
                      </div>
                    </div>

                    <div className="bg-gray-750 p-3 rounded">
                      <div className="flex justify-between">
                        <span>所需保证金:</span>
                        <span>
                          ¥
                          {(
                            (selectedContract?.price * 300 * leverage * (tradeAmount || 0)) /
                            10000
                          ).toFixed(2)}
                          万
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>预期盈亏:</span>
                        <span className="text-green-400">
                          ¥
                          {(
                            (selectedContract?.price || 0) *
                            300 *
                            (tradeAmount || 0) *
                            0.01
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleTrade}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        tradeType === 'buy'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {tradeType === 'buy' ? '做多' : '做空'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>请选择要交易的合约</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="font-semibold mb-2">账户信息</h3>
                <p>可用余额: ¥{user.currentBalance.toFixed(2)}</p>
                <button
                  onClick={() => navigate('/positions')}
                  className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  查看持仓 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTrading;
