import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 基金管理人统计数据
  const stats = [
    { title: '管理基金数', value: '12', change: '+2' },
    { title: '基金总规模', value: '¥45.2亿', change: '+5.2%' },
    { title: '年化收益', value: '12.8%', change: '+1.5%' },
    { title: '持有人数', value: '24,568', change: '+3.2%' },
  ];

  // 基金表现
  const fundPerformance = [
    {
      id: 1,
      name: '沪深300指数基金',
      code: '160130',
      nav: 4.25,
      change: 1.2,
      changePercent: 0.8,
      ytd: 8.5,
    },
    {
      id: 2,
      name: '中证500指数基金',
      code: '160131',
      nav: 3.85,
      change: -0.5,
      changePercent: -0.3,
      ytd: 12.3,
    },
    {
      id: 3,
      name: '创业板指数基金',
      code: '160132',
      nav: 2.95,
      change: 2.1,
      changePercent: 1.5,
      ytd: 15.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">基金管理人首页</h1>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-400 mb-2">{stat.title}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <span className="text-green-400 text-sm">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 基金表现 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">基金表现</h2>
                <button
                  onClick={() => navigate('/manager/funds')}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  查看全部 →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">基金名称</th>
                      <th className="text-left py-2">基金代码</th>
                      <th className="text-left py-2">最新净值</th>
                      <th className="text-left py-2">日涨跌</th>
                      <th className="text-left py-2">年至今</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundPerformance.map((fund) => (
                      <tr key={fund.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-3">{fund.name}</td>
                        <td className="py-3 font-mono">{fund.code}</td>
                        <td className="py-3">¥{fund.nav.toFixed(4)}</td>
                        <td
                          className={`py-3 ${fund.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {fund.change >= 0 ? '+' : ''}
                          {fund.change.toFixed(2)} ({fund.change >= 0 ? '+' : ''}
                          {fund.changePercent.toFixed(2)}%)
                        </td>
                        <td className={`py-3 ${fund.ytd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {fund.ytd >= 0 ? '+' : ''}
                          {fund.ytd.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 市场动态 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">市场动态</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h3 className="font-medium mb-2">沪深300指数上涨1.2%</h3>
                  <p className="text-gray-400 text-sm">
                    受科技股带动，市场情绪回暖，沪深300指数今日上涨1.2%，成交量有所放大。
                  </p>
                  <p className="text-gray-500 text-xs mt-2">2024-06-10 15:30</p>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h3 className="font-medium mb-2">央行开展1000亿元逆回购操作</h3>
                  <p className="text-gray-400 text-sm">
                    为维护银行体系流动性合理充裕，央行今日开展1000亿元7天期逆回购操作。
                  </p>
                  <p className="text-gray-500 text-xs mt-2">2024-06-10 09:15</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧 - 快捷操作和通知 */}
          <div className="space-y-6">
            {/* 快捷操作 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">快捷操作</h2>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => navigate('/manager/users')}
                  className="bg-indigo-600 hover:bg-indigo-700 py-3 px-4 rounded-lg transition-colors text-left"
                >
                  会员管理
                </button>
                <button
                  onClick={() => navigate('/manager/trades')}
                  className="bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg transition-colors text-left"
                >
                  交易管理
                </button>
                <button
                  onClick={() => navigate('/manager/data')}
                  className="bg-yellow-600 hover:bg-yellow-700 py-3 px-4 rounded-lg transition-colors text-left"
                >
                  数据集成
                </button>
                <button
                  onClick={() => navigate('/manager/settings')}
                  className="bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg transition-colors text-left"
                >
                  系统设置
                </button>
              </div>
            </div>

            {/* 重要通知 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">重要通知</h2>
              <div className="space-y-4">
                <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-800/50">
                  <h3 className="font-medium text-blue-400">净值披露提醒</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    请于今日18:00前完成所有基金净值披露工作。
                  </p>
                </div>
                <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-800/50">
                  <h3 className="font-medium text-yellow-400">系统维护通知</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    本周末将进行系统升级维护，届时服务可能短暂中断。
                  </p>
                </div>
              </div>
            </div>

            {/* 个人资料 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">个人资料</h2>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-gray-400 text-sm">基金管理人</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded transition-colors"
              >
                查看个人资料
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
