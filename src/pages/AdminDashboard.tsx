import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 管理员统计数据
  const stats = [
    { title: '总用户数', value: '1,248', change: '+12%' },
    { title: '活跃用户', value: '856', change: '+5%' },
    { title: '总交易额', value: '¥2.4亿', change: '+18%' },
    { title: '今日订单', value: '1,240', change: '+8%' },
  ];

  // 最近活动
  const recentActivities = [
    { id: 1, user: '张三', action: '基金买入', amount: '¥50,000', time: '2分钟前' },
    { id: 2, user: '李四', action: '期货交易', amount: '¥120,000', time: '15分钟前' },
    { id: 3, user: '王五', action: '期权交易', amount: '¥30,000', time: '1小时前' },
    { id: 4, user: '赵六', action: '大宗交易', amount: '¥500,000', time: '2小时前' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">管理员仪表盘</h1>

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
          {/* 左侧 - 图表区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 交易趋势图 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">交易趋势</h2>
                <select className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm">
                  <option>近7天</option>
                  <option>近30天</option>
                  <option>近90天</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center text-gray-500">
                [交易趋势图表占位图]
              </div>
            </div>

            {/* 用户分布 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">用户分布</h2>
              <div className="h-64 flex items-center justify-center text-gray-500">
                [用户分布图表占位图]
              </div>
            </div>
          </div>

          {/* 右侧 - 活动和快捷操作 */}
          <div className="space-y-6">
            {/* 最近活动 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">最近活动</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between pb-3 border-b border-gray-700 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-400">
                        {activity.action} {activity.amount}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">快捷操作</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/admin/users')}
                  className="bg-indigo-600 hover:bg-indigo-700 py-3 px-4 rounded-lg transition-colors"
                >
                  用户管理
                </button>
                <button
                  onClick={() => navigate('/admin/funds')}
                  className="bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg transition-colors"
                >
                  基金管理
                </button>
                <button
                  onClick={() => navigate('/admin/contracts')}
                  className="bg-yellow-600 hover:bg-yellow-700 py-3 px-4 rounded-lg transition-colors"
                >
                  合约管理
                </button>
                <button
                  onClick={() => navigate('/admin/options')}
                  className="bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg transition-colors"
                >
                  期权管理
                </button>
              </div>
            </div>

            {/* 系统状态 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">系统状态</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>系统运行</span>
                  <span className="text-green-400">正常</span>
                </div>
                <div className="flex justify-between">
                  <span>数据库连接</span>
                  <span className="text-green-400">正常</span>
                </div>
                <div className="flex justify-between">
                  <span>API响应</span>
                  <span className="text-green-400">正常</span>
                </div>
                <div className="flex justify-between">
                  <span>在线用户</span>
                  <span>1,248</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
