import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { useSimEngineStore } from '../utils/simEngine';
import { useSweetAlert } from '../hooks/useSweetAlert';

interface Fund {
  fund_code: string;
  fund_name: string;
  nav: number;
}

const FundTrading = () => {
  const { user } = useAuth();
  const { fundProducts, fetchFundProducts, subscribeFund, redeemFund } = useSimEngineStore();
  const { success, error, info } = useSweetAlert();
  const navigate = useNavigate();
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    fetchFundProducts();
    const interval = setInterval(fetchFundProducts, 10000);
    return () => clearInterval(interval);
  }, [fetchFundProducts]);

  const handleFundSelect = (fund: Fund) => {
    setSelectedFund(fund);
  };

  const handleTrade = async () => {
    if (!user) {
      error('认证失败', '用户未登录');
      return;
    }
    if (!selectedFund || !tradeAmount) {
      info('操作提示', '请选择基金并输入交易金额');
      return;
    }
    const amount = parseFloat(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      error('输入错误', '请输入有效的交易金额');
      return;
    }
    if (tradeType === 'buy' && amount > (user.currentBalance ?? 0)) {
      error('交易失败', '账户可用余额不足');
      return;
    }

    try {
      const result =
        tradeType === 'buy'
          ? await subscribeFund(user.id.toString(), selectedFund.fund_code, amount)
          : await redeemFund(user.id.toString(), selectedFund.fund_code, amount / selectedFund.nav);

      if (result) {
        success(
          '交易成功',
          `${tradeType === 'buy' ? '买入' : '卖出'} ${selectedFund.fund_name} ${amount}元成功！`,
        );
        setTradeAmount('');
      } else {
        error('交易失败', `${tradeType === 'buy' ? '买入' : '卖出'}失败`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '发生未知错误';
      error('系统错误', `交易执行时发生错误: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">基金交易</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundProducts.map((fund: Fund) => (
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
                            className="bg-indigo-600 hover:bg-indigo-700 py-1 px-3 rounded text-sm"
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
                        className="w-full bg-gray-700 rounded px-3 py-2"
                        placeholder="请输入交易金额"
                      />
                    </div>
                    <button
                      onClick={handleTrade}
                      className={`w-full py-3 rounded-lg font-semibold ${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
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
                <p>可用余额: ¥{user?.currentBalance?.toFixed(2) ?? '0.00'}</p>
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
