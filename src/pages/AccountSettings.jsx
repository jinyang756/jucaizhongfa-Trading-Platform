import { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuth.js';
import { useToast } from '../components/Toast'; // Import useToast

const PREF_KEY = 'user_preferences';

export default function AccountSettings() {
  const { user, permissions, limits } = useAuth();
  const [prefs, setPrefs] = useState({ notifications: true, riskWarnings: true });
  const { showToast } = useToast(); // Destructure showToast

  // Define profile based on user and limits
  const profile = {
    username: user?.username || 'N/A',
    current_balance: user?.currentBalance || 0,
    fund_permission: permissions?.fund || false,
    option_permission: permissions?.option || false,
    sh_contract_permission: permissions?.contract || false, // Assuming contract covers both SH and HK
    hk_contract_permission: permissions?.contract || false, // Assuming contract covers both SH and HK
    single_trade_max: limits?.singleTradeMax || 0,
    daily_trade_max: limits?.dailyTradeMax || 0,
    min_trade_amount: limits?.minTradeAmount || 0,
  };

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    setFormData(profile);
  }, [user, limits]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSave = () => {
    // Here you would typically send formData to your backend to update user settings
    console.log('Saving form data:', formData);
    showToast('设置已保存', 'success');
    setEditing(false);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREF_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  const updatePref = (key, value) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try { localStorage.setItem(PREF_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">账户设置</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <p className="mt-1 text-lg text-gray-900">{profile.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">邮箱</label>
            <p className="mt-1 text-lg text-gray-900">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">当前余额</label>
            <p className="mt-1 text-lg text-gray-900">¥ {profile.current_balance.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">基金交易权限</label>
            <p className="mt-1 text-lg text-gray-900">{profile.fund_permission ? '有' : '无'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">期权交易权限</label>
            <p className="mt-1 text-lg text-gray-900">{profile.option_permission ? '有' : '无'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">沪深合约权限</label>
            <p className="mt-1 text-lg text-gray-900">{profile.sh_contract_permission ? '有' : '无'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">港股合约权限</label>
            <p className="mt-1 text-lg text-gray-900">{profile.hk_contract_permission ? '有' : '无'}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">交易偏好设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="single_trade_max" className="block text-sm font-medium text-gray-700">单笔交易最大金额</label>
              {editing ? (
                <input
                  type="number"
                  name="single_trade_max"
                  id="single_trade_max"
                  value={formData?.single_trade_max || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">¥ {profile.single_trade_max.toLocaleString()}</p>
              )}
            </div>
            <div>
              <label htmlFor="daily_trade_max" className="block text-sm font-medium text-gray-700">每日交易最大金额</label>
              {editing ? (
                <input
                  type="number"
                  name="daily_trade_max"
                  id="daily_trade_max"
                  value={formData?.daily_trade_max || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-lg text-gray-900">¥ {profile.daily_trade_max.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setFormData(profile); }}
                  className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  保存
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                编辑
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-medium mb-3">基础信息</h2>
        <div className="space-y-2 text-sm">
          <div><span className="text-gray-600">用户ID：</span>{user?.id || '-'}</div>
          <div><span className="text-gray-600">用户名：</span>{user?.username || user?.email || '-'}</div>
          <div><span className="text-gray-600">关联管理员：</span>{user?.relatedAdmin || '-'}</div>
          <div><span className="text-gray-600">当前余额：</span>{(user?.currentBalance ?? 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-medium mb-3">交易权限与限额</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">基金交易：</span>
            <span className={`px-2 py-0.5 rounded text-white ${permissions?.fund ? 'bg-green-600' : 'bg-gray-500'}`}>{permissions?.fund ? '已开通' : '未开通'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">期权交易：</span>
            <span className={`px-2 py-0.5 rounded text-white ${permissions?.option ? 'bg-green-600' : 'bg-gray-500'}`}>{permissions?.option ? '已开通' : '未开通'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">合约交易：</span>
            <span className={`px-2 py-0.5 rounded text-white ${permissions?.contract ? 'bg-green-600' : 'bg-gray-500'}`}>{permissions?.contract ? '已开通' : '未开通'}</span>
          </div>
          <div className="pt-2">
            <div><span className="text-gray-600">单笔限额：</span>{(limits?.singleTradeMax ?? 0).toLocaleString()}</div>
            <div><span className="text-gray-600">日累计限额：</span>{(limits?.dailyTradeMax ?? 0).toLocaleString()}</div>
            <div><span className="text-gray-600">最低交易额：</span>{(limits?.minTradeAmount ?? 0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4 md:col-span-2">
        <h2 className="text-lg font-medium mb-3">偏好设置</h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={prefs.notifications}
              onChange={e => updatePref('notifications', e.target.checked)}
            />
            接收交易通知（本地保存）
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={prefs.riskWarnings}
              onChange={e => updatePref('riskWarnings', e.target.checked)}
            />
            显示风险提醒（本地保存）
          </label>
        </div>

        <div className="mt-4 text-xs text-gray-600">
          提示：偏好设置目前保存在浏览器本地，不影响后端数据。
        </div>
      </div>
    </div>
  );
}