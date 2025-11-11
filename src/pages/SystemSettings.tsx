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

  const activeTabStyle = {
    borderBottom: '2px solid var(--primary-color)',
    color: 'var(--primary-color)',
  };

  const inactiveTabStyle = {
    color: 'var(--text-color-dark)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background-base)',
        color: 'var(--text-color-light)',
      }}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">系统设置</h1>

        {/* 标签页 */}
        <div
          className="flex border-b mb-6"
          style={{ borderColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)' }}
        >
          <button
            onClick={() => setActiveTab('general')}
            className="py-2 px-4 font-medium"
            style={activeTab === 'general' ? activeTabStyle : inactiveTabStyle}
          >
            基本设置
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className="py-2 px-4 font-medium"
            style={activeTab === 'notifications' ? activeTabStyle : inactiveTabStyle}
          >
            通知设置
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className="py-2 px-4 font-medium"
            style={activeTab === 'security' ? activeTabStyle : inactiveTabStyle}
          >
            安全设置
          </button>
        </div>

        {activeTab === 'general' && (
          <div style={{ backgroundColor: 'var(--glass-background)' }} className="rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">基本设置</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text-color-dark)' }}>
                    网站名称
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    style={{
                      backgroundColor: 'var(--background-base)',
                      border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text-color-dark)' }}>
                    网站描述
                  </label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    style={{
                      backgroundColor: 'var(--background-base)',
                      border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text-color-dark)' }}>
                    时区
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    style={{
                      backgroundColor: 'var(--background-base)',
                      border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                    }}
                  >
                    <option value="Asia/Shanghai">亚洲/上海</option>
                    <option value="Asia/Tokyo">亚洲/东京</option>
                    <option value="Europe/London">欧洲/伦敦</option>
                    <option value="America/New_York">美洲/纽约</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: 'var(--text-color-dark)' }}>
                    语言
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    style={{
                      backgroundColor: 'var(--background-base)',
                      border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                    }}
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>
              </div>

              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <div>
                  <h3 className="font-medium">维护模式</h3>
                  <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                    启用后网站将显示维护页面
                  </p>
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
                  <div
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: settings.maintenanceMode
                        ? 'var(--primary-color)'
                        : 'var(--background-base)',
                    }}
                  ></div>
                </label>
              </div>

              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <div>
                  <h3 className="font-medium">主题</h3>
                  <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                    选择网站主题
                  </p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                  className="rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  style={{
                    backgroundColor: 'var(--background-base)',
                    border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                  }}
                >
                  <option value="dark">深色主题</option>
                  <option value="light">浅色主题</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="py-2 px-4 rounded transition-colors btn btn-primary"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{ backgroundColor: 'var(--glass-background)' }} className="rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">通知设置</h2>
            <div className="space-y-6">
              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <div>
                  <h3 className="font-medium">邮件通知</h3>
                  <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                    启用邮件通知功能
                  </p>
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
                  <div
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: settings.emailNotifications
                        ? 'var(--primary-color)'
                        : 'var(--background-base)',
                    }}
                  ></div>
                </label>
              </div>

              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <div>
                  <h3 className="font-medium">短信通知</h3>
                  <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                    启用短信通知功能
                  </p>
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
                  <div
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: settings.smsNotifications
                        ? 'var(--primary-color)'
                        : 'var(--background-base)',
                    }}
                  ></div>
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium mb-3">通知类型</h3>
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
                  >
                    <div>
                      <p className="font-medium">交易通知</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        订单成交、撤单等交易相关通知
                      </p>
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
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          backgroundColor: settings.tradeNotifications
                            ? 'var(--primary-color)'
                            : 'var(--background-base)',
                        }}
                      ></div>
                    </label>
                  </div>

                  <div
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
                  >
                    <div>
                      <p className="font-medium">系统通知</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        系统维护、公告等通知
                      </p>
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
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          backgroundColor: settings.systemNotifications
                            ? 'var(--primary-color)'
                            : 'var(--background-base)',
                        }}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">测试通知</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={handleTestEmail}
                    className="py-2 px-4 rounded transition-colors btn btn-primary"
                  >
                    测试邮件通知
                  </button>
                  <button
                    onClick={handleTestSMS}
                    className="py-2 px-4 rounded transition-colors btn btn-success"
                  >
                    测试短信通知
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="py-2 px-4 rounded transition-colors btn btn-primary"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ backgroundColor: 'var(--glass-background)' }} className="rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">安全设置</h2>
            <div className="space-y-6">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <h3 className="font-medium mb-3">IP白名单</h3>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="输入IP地址"
                      className="flex-1 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                      style={{
                        backgroundColor: 'var(--background-base)',
                        border: '1px solid rgba(var(--primary-color-rgb, 99, 102, 241), 0.3)',
                      }}
                    />
                    <button className="py-2 px-4 rounded transition-colors btn btn-success">
                      添加
                    </button>
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-color-dark)' }}>
                    <p>当前白名单IP:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>192.168.1.100</li>
                      <li>10.0.0.50</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <h3 className="font-medium mb-3">登录安全</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">双因素认证</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        为管理员账户启用双因素认证
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      ></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">登录失败限制</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        连续失败5次后锁定账户30分钟
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--primary-color-rgb, 99, 102, 241), 0.1)' }}
              >
                <h3 className="font-medium mb-3">数据安全</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">数据加密</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        启用数据库数据加密
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      ></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">自动备份</p>
                      <p style={{ color: 'var(--text-color-dark)' }} className="text-sm">
                        每日自动备份数据库
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="py-2 px-4 rounded transition-colors btn btn-primary"
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
