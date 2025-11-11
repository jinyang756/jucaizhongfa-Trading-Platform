import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { useSimEngineStore, type IPOStock } from '../utils/simEngine';

const IPOSubscription = () => {
  const { user } = useAuth();
  const { ipoStocks, fetchIpoStocks, subscribeToIpo } = useSimEngineStore();
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<IPOStock | null>(null);
  const [shares, setShares] = useState('');

  useEffect(() => {
    // 获取新股数据
    fetchIpoStocks();

    // 设置定时器定期更新数据
    const interval = setInterval(() => {
      fetchIpoStocks();
    }, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, [fetchIpoStocks]);

  const handleStockSelect = (stock: IPOStock) => {
    setSelectedStock(stock);
  };

  const handleSubscribe = async () => {
    if (!selectedStock || !shares) {
      alert('请选择股票并输入申购股数');
      return;
    }

    const shareCount = parseInt(shares);
    if (isNaN(shareCount) || shareCount <= 0) {
      alert('请输入有效的股数');
      return;
    }

    if (shareCount > selectedStock.subscription_quota) {
      alert('申购股数超过配售额度');
      return;
    }

    // 使用 jcf-sim-engine 执行申购
    try {
      const result = await subscribeToIpo(selectedStock.stock_id, shareCount);

      if (result) {
        alert(`申购 ${selectedStock.stock_name} ${shareCount}股成功！`);
        setShares('');
      } else {
        alert('申购失败');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`申购失败: ${error.message}`);
      } else {
        alert('申购失败: 发生未知错误');
      }
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      upcoming: '即将发行',
      subscription: '申购中',
      allocated: '已配售',
      trading: '交易中',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      upcoming: 'blue',
      subscription: 'green',
      allocated: 'orange',
      trading: 'purple',
    };
    return colorMap[status] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">新股申购</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 新股列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">可申购新股</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">股票代码</th>
                      <th className="text-left py-2">股票名称</th>
                      <th className="text-left py-2">发行价</th>
                      <th className="text-left py-2">市场价</th>
                      <th className="text-left py-2">状态</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ipoStocks.map((stock) => (
                      <tr
                        key={stock.stock_id}
                        className="border-b border-gray-700 hover:bg-gray-750"
                      >
                        <td className="py-3">{stock.stock_code}</td>
                        <td className="py-3">{stock.stock_name}</td>
                        <td className="py-3">¥{stock.issue_price.toFixed(2)}</td>
                        <td className="py-3">¥{stock.market_price.toFixed(2)}</td>
                        <td className="py-3">
                          <span style={{ color: getStatusColor(stock.status) }}>
                            {getStatusText(stock.status)}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleStockSelect(stock)}
                            className="bg-indigo-600 hover:bg-indigo-700 py-1 px-3 rounded text-sm transition-colors"
                            disabled={stock.status !== 'subscription'}
                          >
                            申购
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧 - 申购面板 */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">申购面板</h2>

              {selectedStock ? (
                <div className="space-y-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="font-semibold">{selectedStock.stock_name}</h3>
                    <p className="text-gray-400 text-sm">股票代码: {selectedStock.stock_code}</p>
                    <p className="text-lg mt-2">发行价: ¥{selectedStock.issue_price.toFixed(2)}</p>
                    <p className="mt-1">市场价: ¥{selectedStock.market_price.toFixed(2)}</p>
                    <p className="mt-1">中签率: {selectedStock.win_rate.toFixed(2)}%</p>
                    <p className="mt-1">
                      <span style={{ color: getStatusColor(selectedStock.status) }}>
                        状态: {getStatusText(selectedStock.status)}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">申购股数</label>
                      <input
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="请输入申购股数"
                        disabled={selectedStock.status !== 'subscription'}
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        配售额度: {selectedStock.subscription_quota}股
                      </p>
                    </div>

                    <button
                      onClick={handleSubscribe}
                      className="w-full py-3 rounded-lg font-semibold transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                      disabled={selectedStock.status !== 'subscription'}
                    >
                      申购
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>请选择要申购的股票</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="font-semibold mb-2">账户信息</h3>
                {user && <p>可用余额: ¥{user.currentBalance.toFixed(2)}</p>}
                <button
                  onClick={() => navigate('/fund-logs/1')}
                  className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  查看申购记录 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPOSubscription;
