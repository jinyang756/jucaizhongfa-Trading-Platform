import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Preferences {
  notifications: boolean;
  riskWarnings: boolean;
}

const PREF_KEY = 'user_preferences';

export default function AccountSettings() {
  const { user, permissions, limits } = useAuth();
  const [prefs, setPrefs] = useState<Preferences>({ notifications: true, riskWarnings: true });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREF_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  const updatePref = (key: keyof Preferences, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try { localStorage.setItem(PREF_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">账户设置</h1>

      <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
}

