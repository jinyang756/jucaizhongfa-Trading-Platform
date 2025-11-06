import { useState } from 'react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: '聚财众发量化交易平台',
    siteDescription: '专业的量化交易和金融产品平台',
    maintenanceMode: false,
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    theme: 'dark',
    emailNotifications: true,
    smsNotifications: true,
    tradeNotifications: true,
    systemNotifications: true,
  });

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('系统设置已保存');
  };

  const handleTestEmail = () => {
    alert('邮件通知测试已发送');
  };

  const handleTestSMS = () => {
    alert('短信通知测试已发送');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">系统设置</h1>

        {/* 标签页 */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2 px-4 font-medium ${activeTab === 'general' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            基本设置
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-4 font-medium ${activeTab === 'notifications' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            通知设置
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-4 font-medium ${activeTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            安全设置
          </button>
        </div>

        {activeTab === 'general' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">基本设置</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-300">网站名称</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">网站描述</label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">时区</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Asia/Shanghai">亚洲/上海</option>
                    <option value="Asia/Tokyo">亚洲/东京</option>
                    <option value="Europe/London">欧洲/伦敦</option>
                    <option value="America/New_York">美洲/纽约</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-300">语言</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">维护模式</h3>
                  <p className="text-gray-400 text-sm">启用后网站将显示维护页面</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) =>
                      setSettings({ ...settings, maintenanceMode: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">主题</h3>
                  <p className="text-gray-400 text-sm">选择网站主题</p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="dark">深色主题</option>
                  <option value="light">浅色主题</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">通知设置</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">邮件通知</h3>
                  <p className="text-gray-400 text-sm">启用邮件通知功能</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, emailNotifications: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                <div>
                  <h3 className="font-medium">短信通知</h3>
                  <p className="text-gray-400 text-sm">启用短信通知功能</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      setSettings({ ...settings, smsNotifications: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium mb-3">通知类型</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div>
                      <p className="font-medium">交易通知</p>
                      <p className="text-gray-400 text-sm">订单成交、撤单等交易相关通知</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.tradeNotifications}
                        onChange={(e) =>
                          setSettings({ ...settings, tradeNotifications: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div>
                      <p className="font-medium">系统通知</p>
                      <p className="text-gray-400 text-sm">系统维护、公告等通知</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.systemNotifications}
                        onChange={(e) =>
                          setSettings({ ...settings, systemNotifications: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">测试通知</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={handleTestEmail}
                    className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                  >
                    测试邮件通知
                  </button>
                  <button
                    onClick={handleTestSMS}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors"
                  >
                    测试短信通知
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">安全设置</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-750 rounded-lg">
                <h3 className="font-medium mb-3">IP白名单</h3>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="输入IP地址"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded transition-colors">
                      添加
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>当前白名单IP:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>192.168.1.100</li>
                      <li>10.0.0.50</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-750 rounded-lg">
                <h3 className="font-medium mb-3">登录安全</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">双因素认证</p>
                      <p className="text-gray-400 text-sm">为管理员账户启用双因素认证</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">登录失败限制</p>
                      <p className="text-gray-400 text-sm">连续失败5次后锁定账户30分钟</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-750 rounded-lg">
                <h3 className="font-medium mb-3">数据安全</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">数据加密</p>
                      <p className="text-gray-400 text-sm">启用数据库数据加密</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">自动备份</p>
                      <p className="text-gray-400 text-sm">每日自动备份数据库</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;
