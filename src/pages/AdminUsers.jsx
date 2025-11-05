import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase.js';
import { exportToExcel } from '../utils/exportExcel.ts';
import { useToast } from '../hooks/useToast'; // Import useToast
import { validateUserPermissions } from '../utils/tradeValidation.js';

export const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [balanceAdjustment, setBalanceAdjustment] = useState({ userId: null, amount: 0 });

  // 加载会员列表
  const loadUsers = async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        // 模拟数据
        setUsers([
          {
            id: 1,
            username: 'testuser1',
            related_admin: 'admin1',
            current_balance: 100000,
            user_type: 'user',
          },
          {
            id: 2,
            username: 'testuser2',
            related_admin: 'admin1',
            current_balance: 50000,
            user_type: 'user',
          },
          {
            id: 3,
            username: 'testuser3',
            related_admin: 'admin2',
            current_balance: 75000,
            user_type: 'user',
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('users')
          .select('id, username, related_admin, current_balance, user_type')
          .order('id');
        if (error) throw error;
        setUsers(data || []);
      }
    } catch (e) {
      console.error(e);
      showToast('加载会员列表失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 上下分功能
  const adjustBalance = async () => {
    if (!currentUser || currentUser.userType !== 'admin') {
      showToast('只有管理员可以进行上下分', 'warning');
      return;
    }

    if (!balanceAdjustment.userId || !balanceAdjustment.amount) {
      showToast('请选择会员和输入调整金额', 'warning');
      return;
    }

    try {
      setLoading(true);
      if (!supabaseEnabled) {
        // 模拟操作
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === balanceAdjustment.userId
              ? {
                  ...user,
                  current_balance: user.current_balance + parseFloat(balanceAdjustment.amount),
                }
              : user,
          ),
        );
        showToast('余额调整成功（本地演示）', 'success');
      } else {
        // 实际更新数据库
        const { data, error } = await supabase.rpc('adjust_user_balance', {
          user_id: balanceAdjustment.userId,
          adjustment_amount: parseFloat(balanceAdjustment.amount),
        });

        if (error) throw error;
        showToast('余额调整成功', 'success');
        loadUsers(); // 重新加载数据
      }
    } catch (e) {
      console.error(e);
      showToast('余额调整失败', 'error');
    } finally {
      setLoading(false);
      setBalanceAdjustment({ userId: null, amount: 0 });
    }
  };

  // 筛选会员
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 导出为Excel
  const handleExport = () => {
    exportToExcel(
      filteredUsers,
      [
        { key: 'id', header: '会员ID' },
        { key: 'username', header: '会员名' },
        { key: 'related_admin', header: '关联管理员' },
        { key: 'current_balance', header: '当前余额' },
        { key: 'user_type', header: '用户类型' },
      ],
      { filename: '会员列表.xlsx', sheetName: 'Users' },
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-xl font-semibold">会员管理（上下分）</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center mt-4 md:mt-0">
          <div className="relative mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="搜索会员名"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            导出Excel
          </button>
        </div>
      </div>

      {/* 上下分表单 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">余额调整</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择会员</label>
            <select
              value={balanceAdjustment.userId || ''}
              onChange={(e) =>
                setBalanceAdjustment({
                  ...balanceAdjustment,
                  userId: parseInt(e.target.value) || null,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择会员</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} (余额: ¥{user.current_balance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">调整金额</label>
            <input
              type="number"
              value={balanceAdjustment.amount}
              onChange={(e) =>
                setBalanceAdjustment({ ...balanceAdjustment, amount: e.target.value })
              }
              placeholder="输入调整金额"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={adjustBalance}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '处理中...' : '确认调整'}
            </button>
          </div>
        </div>
      </div>

      {/* 会员列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  会员ID
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  会员名
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  管理员
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  当前余额
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户类型
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-900">{user.id}</td>
                  <td className="p-3 text-sm text-gray-900">{user.username}</td>
                  <td className="p-3 text-sm text-gray-900 hidden md:table-cell">
                    {user.related_admin}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    ¥{user.current_balance.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.user_type === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.user_type === 'admin' ? '管理员' : '普通会员'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? '未找到匹配的会员' : '暂无会员数据'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
