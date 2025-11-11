import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { useSimEngineStore } from '../utils/simEngine';
import { useNotification } from '../contexts/NotificationContext.tsx'; // Import the notification hook

const FundTrading = () => {
  const { user } = useAuth();
  const { fundProducts, fetchFundProducts, subscribeFund, redeemFund } = useSimEngineStore();
  const { addNotification } = useNotification(); // Get the notification function
  const navigate = useNavigate();
  const [selectedFund, setSelectedFund] = useState(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy'); // buy or sell

  useEffect(() => {
    // 获取基金产品数据
    fetchFundProducts();

    // 设置定时器定期更新数据
    const interval = setInterval(() => {
      fetchFundProducts();
    }, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, [fetchFundProducts]);

  const handleFundSelect = (fund) => {
    setSelectedFund(fund);
  };

  const handleTrade = async () => {
    if (!selectedFund || !tradeAmount) {
      addNotification({ message: '请选择基金并输入交易金额', type: 'warning' });
      return;
    }

    const amount = parseFloat(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      addNotification({ message: '请输入有效的交易金额', type: 'warning' });
      return;
    }

    if (tradeType === 'buy' && amount > user.currentBalance) {
      addNotification({ message: '余额不足', type: 'error' });
      return;
    }

    // 使用 jcf-sim-engine 执行交易
    try {
      let result;
      if (tradeType === 'buy') {
        result = await subscribeFund(user.id.toString(), selectedFund.fund_code, amount);
      } else {
        // 对于卖出，我们需要份额而不是金额，这里简化处理
        const shares = amount / selectedFund.nav;
        result = await redeemFund(user.id.toString(), selectedFund.fund_code, shares);
      }

      if (result) {
        addNotification({
          message: `${tradeType === 'buy' ? '买入' : '卖出'} ${selectedFund.fund_name} ${amount}元成功！`,
          type: 'success',
        });
        setTradeAmount('');
      } else {
        addNotification({ message: `${tradeType === 'buy' ? '买入' : '卖出'}失败`, type: 'error' });
      }
    } catch (error) {
      addNotification({ message: `交易失败: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">基金交易</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 基金列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">可交易基金</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">基金名称</th>
                      <th className="text-left py-2">基金代码</th>
                      <th className="text-left py-2">净值</th>
                      <th className="text-left py-2">涨跌</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundProducts.map((fund) => (
                      <tr
                        key={fund.fund_code}
                        className="border-b border-gray-700 hover:bg-gray-750"
                      >
                        <td className="py-3">{fund.fund_name}</td>
                        <td className="py-3">{fund.fund_code}</td>
                        <td className="py-3">¥{fund.nav.toFixed(4)}</td>
                        <td className="py-3">
                          <button
                            onClick={() => handleFundSelect(fund)}
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

              {selectedFund ? (
                <div className="space-y-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedFund.fund_name}</h3>
                    <p className="text-gray-400 text-sm">基金代码: {selectedFund.fund_code}</p>
                    <p className="text-lg mt-2">净值: ¥{selectedFund.nav.toFixed(4)}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">交易类型</label>
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
                      <label className="block mb-2">交易金额 (¥)</label>
                      <input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="请输入交易金额"
                      />
                    </div>

                    <button
                      onClick={handleTrade}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        tradeType === 'buy'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {tradeType === 'buy' ? '买入' : '卖出'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>请选择要交易的基金</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="font-semibold mb-2">账户信息</h3>
                <p>可用余额: ¥{user.currentBalance.toFixed(2)}</p>
                <button
                  onClick={() => navigate('/fund-logs/1')}
                  className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  查看交易记录 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTrading;
