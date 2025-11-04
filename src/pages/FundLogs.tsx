import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { format } from 'date-fns';

interface FundLogRow {
  id?: number;
  admin_username: string;
  amount: number;
  operate_type: string;
  remark?: string;
  operate_time: string;
}

const currency = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const FundLogs: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState<FundLogRow[]>([]);

  async function loadLogs() {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      if (supabaseEnabled) {
        const { data, error } = await supabase
          .from('fund_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('operate_time', { ascending: false });
        if (error) throw error;
        const mapped = (data || []).map((l: any) => ({
          id: l.id,
          admin_username: String(l.admin_username || '-'),
          amount: Number(l.amount || 0),
          operate_type: String(l.operate_type || '-'),
          remark: String(l.remark || ''),
          operate_time: format(new Date(l.operate_time), 'yyyy-MM-dd HH:mm:ss'),
        }));
        setLogs(mapped);
      } else {
        const demo: FundLogRow[] = [
          { admin_username: 'admin001', amount: 5000, operate_type: 'deposit', remark: '演示数据', operate_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
          { admin_username: 'admin001', amount: -800, operate_type: 'withdraw', remark: '演示数据', operate_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        ];
        setLogs(demo);
      }
    } catch (e: any) {
      setError(e?.message || '加载资金明细失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">资金明细</h1>

      <div className="mb-4 flex items-center">
        <button className="ml-auto px-3 py-1 rounded bg-gray-100" onClick={loadLogs}>刷新</button>
      </div>

      {error && <div className="mb-3 p-3 bg-danger-50 text-danger-700 rounded">{error}</div>}
      {loading && <div className="mb-3">加载中...</div>}

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">操作时间</th>
              <th className="p-3">类型</th>
              <th className="p-3">金额</th>
              <th className="p-3">管理员</th>
              <th className="p-3">备注</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l, idx) => (
              <tr key={`${l.admin_username}-${idx}`} className="border-t">
                <td className="p-3">{l.operate_time}</td>
                <td className="p-3">{l.operate_type}</td>
                <td className="p-3">{currency(l.amount)}</td>
                <td className="p-3">{l.admin_username}</td>
                <td className="p-3">{l.remark || '-'}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>暂无记录</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundLogs;

