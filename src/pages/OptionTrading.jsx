import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const OptionTrading = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy'); // buy or sell

  // 模拟期权数据
  const options = [
    {
      id: 1,
      name: '50ETF购6月3.5',
      code: '10003503',
      price: 0.125,
      change: 1.2,
      changePercent: 5.2,
      type: 'call',
      strike: 3.5,
      expiry: '2024-06-21',
    },
    {
      id: 2,
      name: '50ETF沽6月3.5',
      code: '10003504',
      price: 0.085,
      change: -0.5,
      changePercent: -3.3,
      type: 'put',
      strike: 3.5,
      expiry: '2024-06-21',
    },
    {
      id: 3,
      name: '沪深300购6月4.0',
      code: '10003505',
      price: 0.225,
      change: 2.1,
      changePercent: 8.5,
      type: 'call',
      strike: 4.0,
      expiry: '2024-06-21',
    },
    {
      id: 4,
      name: '沪深300沽6月4.0',
      code: '10003506',
      price: 0.065,
      change: 0.8,
      changePercent: 4.4,
      type: 'put',
      strike: 4.0,
      expiry: '2024-06-21',
    },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleTrade = () => {
    if (!selectedOption || !tradeAmount) {
      alert('请选择期权并输入交易手数');
      return;
    }

    const amount = parseInt(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('请输入有效的交易手数');
      return;
    }

    const totalCost = selectedOption.price * 10000 * amount;
    if (tradeType === 'buy' && totalCost > user.currentBalance) {
      alert('余额不足');
      return;
    }

    alert(`${tradeType === 'buy' ? '买入' : '卖出'} ${selectedOption.name} ${amount}手成功！`);
    setTradeAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">期权交易</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 期权列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">可交易期权</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">期权名称</th>
                      <th className="text-left py-2">期权代码</th>
                      <th className="text-left py-2">最新价</th>
                      <th className="text-left py-2">涨跌</th>
                      <th className="text-left py-2">行权价</th>
                      <th className="text-left py-2">到期日</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.map((option) => (
                      <tr key={option.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-3">
                          <div className="flex items-center">
                            <span
                              className={`mr-2 px-2 py-1 rounded text-xs ${
                                option.type === 'call' ? 'bg-green-600' : 'bg-red-600'
                              }`}
                            >
                              {option.type === 'call' ? '认购' : '认沽'}
                            </span>
                            <span>{option.name}</span>
                          </div>
                        </td>
                        <td className="py-3">{option.code}</td>
                        <td className="py-3">{option.price.toFixed(3)}</td>
                        <td
                          className={`py-3 ${option.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {option.change >= 0 ? '+' : ''}
                          {option.change.toFixed(2)} ({option.change >= 0 ? '+' : ''}
                          {option.changePercent.toFixed(2)}%)
                        </td>
                        <td className="py-3">{option.strike.toFixed(1)}</td>
                        <td className="py-3">{option.expiry}</td>
                        <td className="py-3">
                          <button
                            onClick={() => handleOptionSelect(option)}
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

              {selectedOption ? (
                <div className="space-y-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span
                        className={`mr-2 px-2 py-1 rounded text-xs ${
                          selectedOption.type === 'call' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {selectedOption.type === 'call' ? '认购' : '认沽'}
                      </span>
                      <h3 className="font-semibold">{selectedOption.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">期权代码: {selectedOption.code}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-gray-400 text-sm">最新价</p>
                        <p className="text-lg">{selectedOption.price.toFixed(3)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">涨跌幅</p>
                        <p
                          className={`text-lg ${selectedOption.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {selectedOption.change >= 0 ? '+' : ''}
                          {selectedOption.changePercent.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">行权价</p>
                        <p className="text-lg">{selectedOption.strike.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">到期日</p>
                        <p className="text-lg">{selectedOption.expiry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">交易方向</label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTradeType('buy')}
                          className={`flex-1 py-2 rounded ${tradeType === 'buy' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          买入
                        </button>
                        <button
                          onClick={() => setTradeType('sell')}
                          className={`flex-1 py-2 rounded ${tradeType === 'sell' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                          卖出
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

                    <div className="bg-gray-750 p-3 rounded">
                      <div className="flex justify-between">
                        <span>交易金额:</span>
                        <span>
                          ¥{(selectedOption?.price * 10000 * (tradeAmount || 0)).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>权利金:</span>
                        <span>
                          ¥{(selectedOption?.price * 10000 * (tradeAmount || 0)).toFixed(2)}
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
                      {tradeType === 'buy' ? '买入开仓' : '卖出开仓'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>请选择要交易的期权</p>
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

export default OptionTrading;
