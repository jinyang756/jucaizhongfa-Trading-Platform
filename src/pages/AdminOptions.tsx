import React, { useEffect, useState } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { exportToExcel } from '../utils/exportExcel';
import { useToast } from '../components/Toast';
import { validateForm, required, maxLength } from '../utils/validation';
import { debounce } from '../utils/helpers';

interface OptionRow { id?: number; option_code: string; option_name: string; status?: string }

export const AdminOptions: React.FC = () => {
  const [options, setOptions] = useState<OptionRow[]>([]);
  const [form, setForm] = useState<OptionRow>({ option_code: '', option_name: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { showToast } = useToast();

  // 防抖更新函数
  const debouncedUpdate = debounce(async (id: number, updatedData: Partial<OptionRow>) => {
    // 局部字段校验
    if (updatedData.option_code || updatedData.option_name) {
      const dataToValidate = {
        option_code: updatedData.option_code ?? '',
        option_name: updatedData.option_name ?? ''
      };
      const rules: any = {};
      if (updatedData.option_code !== undefined) {
        rules.option_code = { rules: [required, maxLength(10)], label: '期权代码' };
      }
      if (updatedData.option_name !== undefined) {
        rules.option_name = { rules: [required, maxLength(50)], label: '期权名称' };
      }
      const { isValid, errors } = validateForm(dataToValidate, rules);
      if (!isValid) {
        showToast(Object.values(errors)[0], 'error');
        return;
      }
    }
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setOptions(prev => prev.map(o => o.id === id ? { ...o, ...updatedData } : o));
        showToast('更新成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('options').update(updatedData).eq('id', id);
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
  }, 500); // 500ms 防抖

  const load = async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setOptions([{ id: 1, option_code: 'OPT001', option_name: '演示期权' }]);
      } else {
        const { data, error } = await supabase.from('options').select('*').order('id');
        if (error) throw error;
        setOptions(data || []);
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
      option_code: { rules: [required, maxLength(10)], label: '期权代码' },
      option_name: { rules: [required, maxLength(50)], label: '期权名称' }
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
        setOptions(prev => [{ id: Date.now(), ...form }, ...prev]);
        showToast('创建成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('options').insert({ option_code: form.option_code, option_name: form.option_name });
        if (error) throw error;
        showToast('创建成功', 'success');
        await load();
      }
      setForm({ option_code: '', option_name: '' });
    } catch (e) {
      console.error(e);
      showToast('创建失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteOption = async (id: number) => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setOptions(prev => prev.filter(o => o.id !== id));
        showToast('删除成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('options').delete().eq('id', id);
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
    await exportToExcel<OptionRow>(options, [
      { key: 'id', header: 'ID' },
      { key: 'option_code', header: '期权代码' },
      { key: 'option_name', header: '期权名称' },
      { key: 'status', header: '状态' },
    ], { filename: '期权列表.xlsx', sheetName: 'Options' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">期权管理</h1>
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >导出Excel</button>
      </div>
      {/* 统一使用Toast，移除旧消息展示 */}
      <div className="flex gap-2 mb-4">
        <input value={form.option_code} onChange={e=>setForm(f=>({ ...f, option_code: e.target.value }))} placeholder="期权代码" className={`px-3 py-2 border rounded ${formErrors.option_code ? 'border-red-500' : ''}`} />
        <input value={form.option_name} onChange={e=>setForm(f=>({ ...f, option_name: e.target.value }))} placeholder="期权名称" className={`px-3 py-2 border rounded ${formErrors.option_name ? 'border-red-500' : ''}`} />
        <button disabled={loading} onClick={create} className="px-4 py-2 rounded bg-primary-600 text-white">创建</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 hidden md:table-cell">ID</th>
              <th className="p-3">代码</th>
              <th className="p-3">名称</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {options.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-3 hidden md:table-cell">{o.id}</td>
                <td className="p-3">
                  {editingId === o.id ? (
                    <input 
                      defaultValue={o.option_code}
                      onChange={(e) => debouncedUpdate(o.id!, { option_code: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    o.option_code
                  )}
                </td>
                <td className="p-3">
                  {editingId === o.id ? (
                    <input 
                      defaultValue={o.option_name}
                      onChange={(e) => debouncedUpdate(o.id!, { option_name: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    o.option_name
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {editingId === o.id ? (
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        取消
                      </button>
                    ) : (
                      <button 
                        onClick={() => setEditingId(o.id!)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        编辑
                      </button>
                    )}
                    {showDeleteConfirm === o.id ? (
                      <div className="flex gap-1">
                        <button 
                          onClick={() => deleteOption(o.id!)}
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
                        onClick={() => setShowDeleteConfirm(o.id!)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {options.length === 0 && (
              <tr><td className="p-3" colSpan={4}>无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOptions;