import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { exportToExcel } from '../utils/exportExcel';
import { useToast } from '../components/Toast';
import { isNumber, min, validateForm, required } from '../utils/validation';
import UserBalanceModal from '../components/UserBalanceModal'; // 导入新的模态框组件

export const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { showToast } = useToast();

  // 新增状态用于控制模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  // 处理打开模态框
  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setIsModalOpen(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setModalType(null);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        // 本地演示数据
        setUsers([
          {
            id: 1001,
            username: 'testuser01',
            related_admin: 'admin001',
            current_balance: 10000,
            status: 'active',
            permissions: {
              fundPermission: true,
              optionPermission: false,
              shContractPermission: true,
              hkContractPermission: false,
              singleTradeMax: 1000,
              dailyTradeMax: 5000,
            },
          },
          {
            id: 1002,
            username: 'testuser02',
            related_admin: 'admin001',
            current_balance: 5000,
            status: 'active',
            permissions: {
              fundPermission: false,
              optionPermission: true,
              shContractPermission: false,
              hkContractPermission: true,
              singleTradeMax: 2000,
              dailyTradeMax: 10000,
            },
          },
        ]);
      } else {
        const query = supabase
          .from('users')
          .select('id, username, related_admin, current_balance, status, permissions') // 增加 permissions 字段
          .order('id', { ascending: true });
        const { data, error } = await query;
        if (error) throw error;
        setUsers(
          (data || []).map((u) => ({
            id: u.id,
            username: u.username,
            related_admin: u.related_admin,
            current_balance:
              typeof u.current_balance === 'number'
                ? u.current_balance
                : parseFloat(u.current_balance),
            status: u.status,
          })),
        );
      }
    } catch (err) {
      console.error(err);
      showToast('加载用户列表失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const applyChange = async (target, type, amount) => {
    const { isValid, errors } = validateForm(
      { amount },
      {
        amount: { rules: [required, isNumber, min(0.01)], label: '金额' },
      },
    );
    if (!isValid) {
      showToast(errors.amount, 'error');
      return;
    }
    if (!user || user.userType !== 'admin') {
      showToast('只有管理员可以进行上下分', 'warning');
      return;
    }
    setLoading(true);
    try {
      let newBalance = (target.current_balance || 0) + (type === 'deposit' ? amount : -amount);
      if (newBalance < 0) {
        showToast('提现金额超过当前余额', 'warning');
        return;
      }
      if (!supabaseEnabled) {
        // 本地演示直接更新内存
        setUsers((prev) =>
          prev.map((u) => (u.id === target.id ? { ...u, current_balance: newBalance } : u)),
        );
        showToast(`${type === 'deposit' ? '上分' : '下分'}成功（本地演示）`, 'success');
      } else {
        const { error: updateError } = await supabase
          .from('users')
          .update({ current_balance: newBalance })
          .eq('id', target.id);
        if (updateError) throw updateError;

        // 记录日志
        const { error: logError } = await supabase.from('fund_logs').insert({
          user_id: target.id,
          operate_type: type,
          amount,
          related_admin: user.username,
          created_at: new Date().toISOString(),
        });
        if (logError) throw logError;
        showToast(`${type === 'deposit' ? '上分' : '下分'}成功`, 'success');
        await fetchUsers();
      }
      handleCloseModal(); // 操作成功后关闭模态框
    } catch (err) {
      console.error(err);
      showToast(`${type === 'deposit' ? '上分' : '下分'}失败`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(
    (u) => !keyword.trim() || u.username.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleExport = async () => {
    await exportToExcel(
      filtered,
      [
        { key: 'id', header: '用户ID' },
        { key: 'username', header: '用户名' },
        { key: 'related_admin', header: '关联管理员' },
        { key: 'current_balance', header: '当前余额', transform: (v) => Number(v || 0).toFixed(2) },
        { key: 'status', header: '状态' },
      ],
      { filename: '用户列表.xlsx', sheetName: 'Users' },
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">用户管理（上下分）</h1>
        <div className="flex gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索用户名"
            className="px-3 py-2 border rounded"
          />
          {/* 移除直接的金额输入框和按钮，因为将通过模态框处理 */}
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            导出Excel
          </button>
        </div>
      </div>
      {/* 统一使用Toast，移除旧消息展示 */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 hidden md:table-cell">ID</th>
              <th className="p-3">用户名</th>
              <th className="p-3 hidden md:table-cell">管理员</th>
              <th className="p-3">余额</th>
              <th className="p-3">状态</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3 hidden md:table-cell">{u.id}</td>
                <td className="p-3">{u.username}</td>
                <td className="p-3 hidden md:table-cell">{u.related_admin || '-'}</td>
                <td className="p-3">{(u.current_balance || 0).toFixed(2)}</td>
                <td className="p-3">{u.status || '-'}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      disabled={loading}
                      className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50"
                      onClick={() => handleOpenModal(u, 'deposit')}
                    >
                      上分
                    </button>
                    <button
                      disabled={loading}
                      className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50"
                      onClick={() => handleOpenModal(u, 'withdraw')}
                    >
                      下分
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-3" colSpan={6}>
                  无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && modalType && (
        <UserBalanceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          type={modalType}
          onConfirm={applyChange}
        />
      )}
    </div>
  );
};

export default AdminUsers;
