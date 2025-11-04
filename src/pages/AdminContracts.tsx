import React, { useEffect, useState } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { exportToExcel } from '../utils/exportExcel';
import { useToast } from '../components/Toast';
import { validateForm, required, maxLength } from '../utils/validation';

interface ContractRow { id?: number; contract_code: string; contract_name: string; market?: string }

export const AdminContracts: React.FC = () => {
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [form, setForm] = useState<ContractRow>({ contract_code: '', contract_name: '', market: 'SH' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setContracts([{ id: 1, contract_code: 'SH0001', contract_name: '演示合约', market: 'SH' }]);
      } else {
        const { data, error } = await supabase.from('contracts').select('*').order('id');
        if (error) throw error;
        setContracts(data || []);
      }
    } catch (e) {
      console.error(e);
      showToast('加载失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    // 表单校验
    const validationRules = {
      contract_code: { rules: [required, maxLength(10)], label: '合约代码' },
      contract_name: { rules: [required, maxLength(50)], label: '合约名称' },
      market: { rules: [required], label: '市场' }
    };
    const { isValid, errors } = validateForm(form, validationRules);
    setFormErrors(errors);
    if (!isValid) {
      showToast(Object.values(errors)[0], 'error');
      return;
    }
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setContracts(prev => [{ id: Date.now(), ...form }, ...prev]);
        showToast('创建成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('contracts').insert({ contract_code: form.contract_code, contract_name: form.contract_name, market: form.market });
        if (error) throw error;
        showToast('创建成功', 'success');
        await load();
      }
      setForm({ contract_code: '', contract_name: '', market: 'SH' });
    } catch (e) {
      console.error(e);
      showToast('创建失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, updatedData: Partial<ContractRow>) => {
    // 局部字段校验
    const dataToValidate: Record<string, any> = {};
    const rules: any = {};
    if (updatedData.contract_code !== undefined) {
      dataToValidate.contract_code = updatedData.contract_code ?? '';
      rules.contract_code = { rules: [required, maxLength(10)], label: '合约代码' };
    }
    if (updatedData.contract_name !== undefined) {
      dataToValidate.contract_name = updatedData.contract_name ?? '';
      rules.contract_name = { rules: [required, maxLength(50)], label: '合约名称' };
    }
    if (updatedData.market !== undefined) {
      dataToValidate.market = updatedData.market ?? '';
      rules.market = { rules: [required], label: '市场' };
    }
    if (Object.keys(rules).length > 0) {
      const { isValid, errors } = validateForm(dataToValidate, rules);
      if (!isValid) {
        showToast(Object.values(errors)[0], 'error');
        return;
      }
    }
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setContracts(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
        showToast('更新成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('contracts').update(updatedData).eq('id', id);
        if (error) throw error;
        showToast('更新成功', 'success');
        await load();
      }
      setEditingId(null);
    } catch (e) {
      console.error(e);
      showToast('更新失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteContract = async (id: number) => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setContracts(prev => prev.filter(c => c.id !== id));
        showToast('删除成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('contracts').delete().eq('id', id);
        if (error) throw error;
        showToast('删除成功', 'success');
        await load();
      }
      setShowDeleteConfirm(null);
    } catch (e) {
      console.error(e);
      showToast('删除失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    await exportToExcel<ContractRow>(contracts, [
      { key: 'id', header: 'ID' },
      { key: 'contract_code', header: '合约代码' },
      { key: 'contract_name', header: '合约名称' },
      { key: 'market', header: '市场' },
    ], { filename: '合约列表.xlsx', sheetName: 'Contracts' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">合约管理</h1>
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >导出Excel</button>
      </div>
      {/* 统一使用Toast，移除旧消息展示 */}
      <div className="flex gap-2 mb-4">
        <input value={form.contract_code} onChange={e=>setForm(f=>({ ...f, contract_code: e.target.value }))} placeholder="合约代码" className={`px-3 py-2 border rounded ${formErrors.contract_code ? 'border-red-500' : ''}`} />
        <input value={form.contract_name} onChange={e=>setForm(f=>({ ...f, contract_name: e.target.value }))} placeholder="合约名称" className={`px-3 py-2 border rounded ${formErrors.contract_name ? 'border-red-500' : ''}`} />
        <select value={form.market} onChange={e=>setForm(f=>({ ...f, market: e.target.value }))} className={`px-3 py-2 border rounded ${formErrors.market ? 'border-red-500' : ''}`}>
          <option value="SH">SH</option>
          <option value="HK">HK</option>
        </select>
        <button disabled={loading} onClick={create} className="px-4 py-2 rounded bg-primary-600 text-white">创建</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">代码</th>
              <th className="p-3">名称</th>
              <th className="p-3">市场</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.id}</td>
                <td className="p-3">
                  {editingId === c.id ? (
                    <input 
                      defaultValue={c.contract_code}
                      onBlur={(e) => update(c.id!, { contract_code: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    c.contract_code
                  )}
                </td>
                <td className="p-3">
                  {editingId === c.id ? (
                    <input 
                      defaultValue={c.contract_name}
                      onBlur={(e) => update(c.id!, { contract_name: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    c.contract_name
                  )}
                </td>
                <td className="p-3">
                  {editingId === c.id ? (
                    <select 
                      defaultValue={c.market}
                      onChange={(e) => update(c.id!, { market: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="SH">SH</option>
                      <option value="HK">HK</option>
                      <option value="US">US</option>
                    </select>
                  ) : (
                    c.market
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {editingId === c.id ? (
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        取消
                      </button>
                    ) : (
                      <button 
                        onClick={() => setEditingId(c.id!)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        编辑
                      </button>
                    )}
                    {showDeleteConfirm === c.id ? (
                      <div className="flex gap-1">
                        <button 
                          onClick={() => deleteContract(c.id!)}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          确认
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowDeleteConfirm(c.id!)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {contracts.length === 0 && (
              <tr><td className="p-3" colSpan={5}>无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContracts;
