
import { useState, useEffect } from 'react';

export interface FundRow {
  id?: number;
  fund_name: string;
  fund_code: string;
  fund_type: string;
  initial_value: number;
  current_value: number;
  created_at?: string;
};


import { validateForm, required, maxLength } from '../utils/validation';
import { exportToExcel } from '../utils/exportExcel';
import { useToast } from '../components/Toast';
import { useFundsApi } from '../api/funds';

const AdminFunds = () => {
  const { data: funds, loading, error, getAllFunds, createFund, updateFund, deleteFund: deleteFundApi } = useFundsApi();
  const [form, setForm] = useState<FundRow>({ fund_code: '', fund_name: '', fund_type: '股票型', initial_value: 0, current_value: 0 });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FundRow, string>>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getAllFunds();
  }, []);

  const create = async () => {
    const validationRules = {
      fund_code: { rules: [required, maxLength(10)], label: '基金代码' },
      fund_name: { rules: [required, maxLength(50)], label: '基金名称' },
      fund_type: { rules: [required], label: '基金类型' },
      initial_value: { rules: [required], label: '初始价值' },
    };
    
    const { isValid, errors } = validateForm(form, validationRules);
    setFormErrors(errors);
    
    if (!isValid) {
      showToast(Object.values(errors)[0], 'error');
      return;
    }
    
    try {
      await createFund(form);
      showToast('创建成功', 'success');
      setForm({ fund_code: '', fund_name: '', fund_type: '股票型', initial_value: 0, current_value: 0 });
      getAllFunds(); // Refresh the list
    } catch (e: any) {
      console.error(e);
      showToast('创建失败', 'error');
    }
  };

  const update = async (id: number, updatedData: Partial<FundRow>) => {
    const dataToValidate = {
      fund_code: updatedData.fund_code || '',
      fund_name: updatedData.fund_name || '',
      fund_type: updatedData.fund_type || '',
      initial_value: updatedData.initial_value || 0,
    };
    
    const validationRules: Partial<Record<keyof FundRow, any>> = {};
    if (updatedData.fund_code) {
      validationRules.fund_code = { rules: [required, maxLength(10)], label: '基金代码' };
    }
    if (updatedData.fund_name) {
      validationRules.fund_name = { rules: [required, maxLength(50)], label: '基金名称' };
    }
    if (updatedData.fund_type) {
      validationRules.fund_type = { rules: [required], label: '基金类型' };
    }
    if (updatedData.initial_value) {
      validationRules.initial_value = { rules: [required], label: '初始价值' };
    }
    
    const { isValid, errors } = validateForm(dataToValidate, validationRules);
    if (!isValid) {
      showToast(Object.values(errors)[0], 'error');
      return;
    }
    
    try {
      await updateFund(id, updatedData);
      showToast('更新成功', 'success');
      setEditingId(null);
      getAllFunds(); // Refresh the list
    } catch (e: any) {
      console.error(e);
      showToast('更新失败', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFundApi(id);
      showToast('删除成功', 'success');
      getAllFunds(); // Refresh the list
    } catch (e: any) {
      console.error(e);
      showToast('删除失败', 'error');
    }
  };

  const handleExport = async () => {
    await exportToExcel(funds || [], [
      { key: 'id', header: 'ID' },
      { key: 'fund_code', header: '基金代码' },
      { key: 'fund_name', header: '基金名称' },
      { key: 'fund_type', header: '基金类型' },
      { key: 'initial_value', header: '初始价值' },
      { key: 'current_value', header: '当前价值' },
      { key: 'created_at', header: '创建时间' },
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
          onChange={e=>setForm((f: FundRow)=>({ ...f, fund_code: e.target.value }))} 
          placeholder="基金代码" 
          className={`px-3 py-2 border rounded ${formErrors.fund_code ? 'border-red-500' : ''}`} 
        />
        <input 
          value={form.fund_name} 
          onChange={e=>setForm((f: FundRow)=>({ ...f, fund_name: e.target.value }))} 
          placeholder="基金名称" 
          className={`px-3 py-2 border rounded ${formErrors.fund_name ? 'border-red-500' : ''}`} 
        />
        <input 
          value={form.fund_type} 
          onChange={e=>setForm((f: FundRow)=>({ ...f, fund_type: e.target.value }))} 
          placeholder="基金类型" 
          className={`px-3 py-2 border rounded ${formErrors.fund_type ? 'border-red-500' : ''}`} 
        />
        <input 
          type="number"
          value={form.initial_value} 
          onChange={e=>setForm((f: FundRow)=>({ ...f, initial_value: parseFloat(e.target.value) }))} 
          placeholder="初始价值" 
          className={`px-3 py-2 border rounded ${formErrors.initial_value ? 'border-red-500' : ''}`} 
        />
        <button disabled={loading} onClick={create} className="px-4 py-2 rounded bg-primary-600 text-white">创建</button>
      </div>
      {error && <div className="text-red-500 mb-4">加载基金失败: {typeof error === 'string' ? error : (error as any).message}</div>}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 hidden md:table-cell">ID</th>
              <th className="p-3">代码</th>
              <th className="p-3">名称</th>
              <th className="p-3">类型</th>
              <th className="p-3">初始价值</th>
              <th className="p-3">当前价值</th>
              <th className="p-3">创建时间</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3 text-center" colSpan={8}>加载中...</td></tr>
            ) : (funds && funds.length === 0) ? (
              <tr><td className="p-3 text-center" colSpan={8}>无数据</td></tr>
            ) : (
              (funds || []).map((f: FundRow) => (
                <tr key={f.id} className="border-t">
                  <td className="p-3 hidden md:table-cell">{f.id}</td>
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
                    {editingId === f.id ? (
                      <input 
                        defaultValue={f.fund_type}
                        onBlur={(e) => update(f.id!, { fund_type: e.target.value })}
                        className="px-2 py-1 border rounded text-sm"
                      />
                    ) : (
                      f.fund_type
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === f.id ? (
                      <input 
                        type="number"
                        defaultValue={f.initial_value}
                        onBlur={(e) => update(f.id!, { initial_value: parseFloat(e.target.value) })}
                        className="px-2 py-1 border rounded text-sm"
                      />
                    ) : (
                      f.initial_value
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === f.id ? (
                      <input 
                        type="number"
                        defaultValue={f.current_value}
                        onBlur={(e) => update(f.id!, { current_value: parseFloat(e.target.value) })}
                        className="px-2 py-1 border rounded text-sm"
                      />
                    ) : (
                      f.current_value
                    )}
                  </td>
                  <td className="p-3">{f.created_at}</td>
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
                            onClick={() => handleDelete(f.id!)}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFunds;