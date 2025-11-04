import { useEffect, useState } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { exportToExcel } from '../utils/exportExcel';
import { useToast } from '../components/Toast';
import { validateForm, required, maxLength } from '../utils/validation';

interface FundRow { id?: number; fund_code: string; fund_name: string; status?: string }

export default function AdminFunds() {
  const [funds, setFunds] = useState<FundRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FundRow>({ fund_code: '', fund_name: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setFunds([{ id: 1, fund_code: 'F0001', fund_name: '演示基金' }]);
      } else {
        const { data, error } = await supabase.from('funds').select('*').order('id');
        if (error) throw error;
        setFunds(data || []);
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
    // 使用表单校验
    const validationRules = {
      fund_code: { rules: [required, maxLength(10)], label: '基金代码' },
      fund_name: { rules: [required, maxLength(50)], label: '基金名称' }
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
        setFunds(prev => [{ id: Date.now(), ...form }, ...prev]);
        showToast('创建成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('funds').insert({ fund_code: form.fund_code, fund_name: form.fund_name });
        if (error) throw error;
        showToast('创建成功', 'success');
        await load();
      }
      setForm({ fund_code: '', fund_name: '' });
    } catch (e) {
      console.error(e);
      showToast('创建失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, updatedData: Partial<FundRow>) => {
    // 验证更新数据
    if (updatedData.fund_code || updatedData.fund_name) {
      const dataToValidate = {
        fund_code: updatedData.fund_code || '',
        fund_name: updatedData.fund_name || ''
      };
      
      const validationRules: any = {};
      if (updatedData.fund_code) {
        validationRules.fund_code = { rules: [required, maxLength(10)], label: '基金代码' };
      }
      if (updatedData.fund_name) {
        validationRules.fund_name = { rules: [required, maxLength(50)], label: '基金名称' };
      }
      
      const { isValid, errors } = validateForm(dataToValidate, validationRules);
      if (!isValid) {
        showToast(Object.values(errors)[0], 'error');
        return;
      }
    }
    
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setFunds(prev => prev.map(o => o.id === id ? { ...o, ...updatedData } : o));
        showToast('更新成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('funds').update(updatedData).eq('id', id);
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

  const deleteFund = async (id: number) => {
    setLoading(true);
    try {
      if (!supabaseEnabled) {
        setFunds(prev => prev.filter(o => o.id !== id));
        showToast('删除成功（本地演示）', 'success');
      } else {
        const { error } = await supabase.from('funds').delete().eq('id', id);
        if (error) throw error;
        showToast('删除成功', 'success');
        await load();
      }
    } catch (e) {
      console.error(e);
      showToast('删除失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    await exportToExcel<FundRow>(funds, [
      { key: 'id', header: 'ID' },
      { key: 'fund_code', header: '基金代码' },
      { key: 'fund_name', header: '基金名称' },
      { key: 'status', header: '状态' },
    ], { filename: '基金列表.xlsx', sheetName: 'Funds' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">基金管理</h1>
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >导出Excel</button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <input 
          value={form.fund_code} 
          onChange={e=>setForm(f=>({ ...f, fund_code: e.target.value }))} 
          placeholder="基金代码" 
          className={`px-3 py-2 border rounded ${formErrors.fund_code ? 'border-red-500' : ''}`} 
        />
        <input 
          value={form.fund_name} 
          onChange={e=>setForm(f=>({ ...f, fund_name: e.target.value }))} 
          placeholder="基金名称" 
          className={`px-3 py-2 border rounded ${formErrors.fund_name ? 'border-red-500' : ''}`} 
        />
        <button disabled={loading} onClick={create} className="px-4 py-2 rounded bg-primary-600 text-white">创建</button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">代码</th>
              <th className="p-3">名称</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {funds.map(f => (
              <tr key={f.id} className="border-t">
                <td className="p-3">{f.id}</td>
                <td className="p-3">
                  {editingId === f.id ? (
                    <input 
                      defaultValue={f.fund_code}
                      onBlur={(e) => update(f.id!, { fund_code: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    f.fund_code
                  )}
                </td>
                <td className="p-3">
                  {editingId === f.id ? (
                    <input 
                      defaultValue={f.fund_name}
                      onBlur={(e) => update(f.id!, { fund_name: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    f.fund_name
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {editingId === f.id ? (
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        取消
                      </button>
                    ) : (
                      <button 
                        onClick={() => setEditingId(f.id!)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        编辑
                      </button>
                    )}
                    {showDeleteConfirm === f.id ? (
                      <div className="flex gap-1">
                        <button 
                          onClick={() => deleteFund(f.id!)}
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
                        onClick={() => setShowDeleteConfirm(f.id!)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {funds.length === 0 && (
              <tr><td className="p-3" colSpan={4}>无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { AdminFunds };
