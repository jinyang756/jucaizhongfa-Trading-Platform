import { useState } from 'react';

const DataIntegration = () => {
  const [activeTab, setActiveTab] = useState('sources');
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'market',
    apiKey: '',
    status: 'active',
  });

  // 模拟数据源
  const dataSources = [
    {
      id: 1,
      name: '东方财富',
      type: 'market',
      status: 'active',
      lastSync: '2024-06-10 15:30:00',
      syncFrequency: '实时',
    },
    {
      id: 2,
      name: '同花顺',
      type: 'market',
      status: 'active',
      lastSync: '2024-06-10 15:29:45',
      syncFrequency: '实时',
    },
    {
      id: 3,
      name: 'Wind资讯',
      type: 'market',
      status: 'inactive',
      lastSync: '2024-06-10 14:00:00',
      syncFrequency: '每小时',
    },
    {
      id: 4,
      name: '基金公司API',
      type: 'fund',
      status: 'active',
      lastSync: '2024-06-10 09:00:00',
      syncFrequency: '每日',
    },
  ];

  // 模拟同步日志
  const syncLogs = [
    {
      id: 1,
      source: '东方财富',
      status: 'success',
      message: '数据同步成功',
      time: '2024-06-10 15:30:00',
    },
    {
      id: 2,
      source: '同花顺',
      status: 'success',
      message: '数据同步成功',
      time: '2024-06-10 15:29:45',
    },
    {
      id: 3,
      source: 'Wind资讯',
      status: 'failed',
      message: 'API连接超时',
      time: '2024-06-10 14:00:00',
    },
    {
      id: 4,
      source: '基金公司API',
      status: 'success',
      message: '净值数据更新完成',
      time: '2024-06-10 09:00:00',
    },
  ];

  const handleAddSource = () => {
    if (!newSource.name || !newSource.apiKey) {
      alert('请填写数据源名称和API密钥');
      return;
    }

    console.log('Adding new data source:', newSource);
    alert(`添加数据源: ${newSource.name}`);
    setNewSource({ name: '', type: 'market', apiKey: '', status: 'active' });
  };

  const handleSourceAction = (sourceId: number, action: string) => {
    console.log(`Performing ${action} on data source ${sourceId}`);
    alert(`执行操作: ${action} 数据源ID: ${sourceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">数据集成</h1>

        {/* 标签页 */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-2 px-4 font-medium ${activeTab === 'sources' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            数据源管理
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-4 font-medium ${activeTab === 'logs' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            同步日志
          </button>
        </div>

        {activeTab === 'sources' && (
          <div className="space-y-6">
            {/* 添加数据源 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">添加数据源</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-gray-300">数据源名称</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    placeholder="请输入数据源名称"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">数据源类型</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="market">行情数据</option>
                    <option value="fund">基金数据</option>
                    <option value="news">资讯数据</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">API密钥</label>
                  <input
                    type="password"
                    value={newSource.apiKey}
                    onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                    placeholder="请输入API密钥"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddSource}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors w-full"
                  >
                    添加数据源
                  </button>
                </div>
              </div>
            </div>

            {/* 数据源列表 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">数据源列表</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">数据源名称</th>
                      <th className="text-left py-2">类型</th>
                      <th className="text-left py-2">状态</th>
                      <th className="text-left py-2">最后同步</th>
                      <th className="text-left py-2">同步频率</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSources.map((source) => (
                      <tr key={source.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-3">{source.name}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded text-xs bg-blue-600">
                            {source.type === 'market'
                              ? '行情数据'
                              : source.type === 'fund'
                                ? '基金数据'
                                : '资讯数据'}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              source.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                            }`}
                          >
                            {source.status === 'active' ? '活跃' : '非活跃'}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400">{source.lastSync}</td>
                        <td className="py-3">{source.syncFrequency}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSourceAction(source.id, '编辑')}
                              className="text-indigo-400 hover:text-indigo-300 text-sm"
                            >
                              编辑
                            </button>
                            <button
                              onClick={() =>
                                handleSourceAction(
                                  source.id,
                                  source.status === 'active' ? '禁用' : '启用',
                                )
                              }
                              className="text-yellow-400 hover:text-yellow-300 text-sm"
                            >
                              {source.status === 'active' ? '禁用' : '启用'}
                            </button>
                            <button
                              onClick={() => handleSourceAction(source.id, '删除')}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              删除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">同步日志</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">数据源</th>
                    <th className="text-left py-2">状态</th>
                    <th className="text-left py-2">消息</th>
                    <th className="text-left py-2">时间</th>
                  </tr>
                </thead>
                <tbody>
                  {syncLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3">{log.source}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            log.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        >
                          {log.status === 'success' ? '成功' : '失败'}
                        </span>
                      </td>
                      <td className="py-3">{log.message}</td>
                      <td className="py-3 text-gray-400">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页 */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-400">
                显示 1 到 {syncLogs.length} 条，共 {syncLogs.length} 条记录
              </p>
              <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded transition-colors">
                  上一页
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 py-2 px-3 rounded transition-colors">
                  下一页
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataIntegration;
