import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserProfile {
  username: string;
  current_balance: number;
  fund_permission: boolean;
  option_permission: boolean;
  sh_contract_permission: boolean;
  hk_contract_permission: boolean;
  single_trade_max: number;
  daily_trade_max: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    if (!supabaseEnabled || !user) {
      // Fallback for demo or if supabase is not enabled
      setProfile({
        username: user?.username || 'DemoUser',
        current_balance: 100000.00,
        fund_permission: true,
        option_permission: true,
        sh_contract_permission: true,
        hk_contract_permission: true,
        single_trade_max: 10000.00,
        daily_trade_max: 50000.00,
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('username, current_balance, fund_permission, option_permission, sh_contract_permission, hk_contract_permission, single_trade_max, daily_trade_max')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }
      setProfile(data);
      setFormData(data);
    } catch (error: any) {
      toast.error('加载用户资料失败: ' + error.message);
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : parseFloat(value) || value,
      };
    });
  };

  const handleSave = async () => {
    if (!formData || !user) return;

    if (!supabaseEnabled) {
      toast.info('Supabase未启用，无法保存更改。');
      setProfile(formData);
      setEditing(false);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          single_trade_max: formData.single_trade_max,
          daily_trade_max: formData.daily_trade_max,
          // Permissions are typically managed by admin, not user directly
          // fund_permission: formData.fund_permission,
          // option_permission: formData.option_permission,
          // sh_contract_permission: formData.sh_contract_permission,
          // hk_contract_permission: formData.hk_contract_permission,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }
      setProfile(formData);
      setEditing(false);
      toast.success('用户资料更新成功！');
    } catch (error: any) {
      toast.error('更新用户资料失败: ' + error.message);
      console.error('Error updating profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 max-w-6xl mx-auto">加载中...</div>;
  }

  if (!profile) {
    return <div className="p-6 max-w-6xl mx-auto">未能加载用户资料。</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className="text-2xl font-semibold mb-4">账户设置</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">用户名</label>
            <p className="mt-1 text-lg text-gray-900">{profile.username}</p>
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
    </div>
  );
}
