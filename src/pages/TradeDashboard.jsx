import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import MarketDashboard from '../components/MarketDashboard';
import RealTimeChart from '../components/RealTimeChart';

const TradeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">交易仪表板</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 市场概览 */}
          <div className="lg:col-span-1">
            <MarketDashboard />
          </div>

          {/* 中间 - 快捷交易入口 */}
          <div className="lg:col-span-2 space-y-6">
            <MarketDashboard />

            {/* 快捷交易入口 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">快捷交易</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleNavigation('/funds')}
                  className="bg-indigo-600 hover:bg-indigo-700 py-3 px-4 rounded-lg transition-colors"
                >
                  基金交易
                </button>
                <button
                  onClick={() => handleNavigation('/contracts')}
                  className="bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg transition-colors"
                >
                  合约交易
                </button>
                <button
                  onClick={() => handleNavigation('/options')}
                  className="bg-yellow-600 hover:bg-yellow-700 py-3 px-4 rounded-lg transition-colors"
                >
                  期权交易
                </button>
                <button
                  onClick={() => handleNavigation('/block-trading')}
                  className="bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg transition-colors"
                >
                  大宗交易
                </button>
              </div>
            </div>
          </div>

          {/* 右侧 - 实时行情 */}
          <div className="space-y-6">
            <RealTimeChart />

            {/* 持仓信息 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">我的持仓</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>沪深300</span>
                  <span className="text-green-400">+2.3%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span>中证500</span>
                  <span className="text-red-400">-0.8%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>创业板指</span>
                  <span className="text-green-400">+1.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDashboard;
