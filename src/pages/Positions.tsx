import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, supabaseEnabled } from '../utils/supabase';

type PositionType = 'fund' | 'option' | 'contract';

interface PositionItem {
  id: string;
  orderNo?: string;
  type: PositionType;
  amount: number;
  status: string;
  openTime: string;
}

const demoPositions: PositionItem[] = [
  { id: 'F-1001', orderNo: 'F20241001', type: 'fund', amount: 10000, status: 'holding', openTime: new Date().toISOString() },
  { id: 'O-2001', orderNo: 'O20241002', type: 'option', amount: 5000, status: 'pending', openTime: new Date().toISOString() },
  { id: 'C-3001', orderNo: 'C20241003', type: 'contract', amount: 8000, status: 'open', openTime: new Date().toISOString() },
];

export default function Positions() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | PositionType>('all');
  const [positions, setPositions] = useState<PositionItem[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabaseEnabled || !user) {
        setPositions(demoPositions);
      } else {
        const [fundRes, optionRes, contractRes] = await Promise.all([
          supabase.from('fund_orders').select('*').eq('user_id', user.id).eq('order_status', 'holding').order('created_at', { ascending: false }).limit(50),
          supabase.from('option_orders').select('*').eq('user_id', user.id).eq('profit_status', 'pending').order('start_time', { ascending: false }).limit(50),
          supabase.from('contract_orders').select('*').eq('user_id', user.id).eq('order_status', 'open').order('open_time', { ascending: false }).limit(50),
        ]);

        const fundItems: PositionItem[] = (fundRes.data || []).map((o: any) => ({
          id: String(o.id ?? o.order_id ?? o.orderNo ?? Math.random()),
          orderNo: String(o.order_no ?? o.orderNo ?? ''),
          type: 'fund',
          amount: Number(o.invest_amount ?? o.amount ?? 0),
          status: String(o.order_status ?? 'holding'),
          openTime: new Date(o.created_at ?? o.invest_time ?? Date.now()).toISOString(),
        }));

        const optionItems: PositionItem[] = (optionRes.data || []).map((o: any) => ({
          id: String(o.id ?? o.order_id ?? o.orderNo ?? Math.random()),
          orderNo: String(o.order_no ?? o.orderNo ?? ''),
          type: 'option',
          amount: Number(o.invest_amount ?? o.amount ?? 0),
          status: String(o.profit_status ?? 'pending'),
          openTime: new Date(o.start_time ?? Date.now()).toISOString(),
        }));

        const contractItems: PositionItem[] = (contractRes.data || []).map((o: any) => ({
          id: String(o.id ?? o.order_id ?? o.orderNo ?? Math.random()),
          orderNo: String(o.order_no ?? o.orderNo ?? ''),
          type: 'contract',
          amount: Number(o.margin_amount ?? o.order_amount ?? o.amount ?? 0),
          status: String(o.order_status ?? 'open'),
          openTime: new Date(o.open_time ?? Date.now()).toISOString(),
        }));

        setPositions([...fundItems, ...optionItems, ...contractItems]);
      }
    } catch (e: any) {
      setError(e?.message ?? '加载持仓数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseEnabled, user?.id]);

  const filtered = useMemo(() => {
    if (filter === 'all') return positions;
    return positions.filter(p => p.type === filter);
  }, [positions, filter]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">持仓查询</h1>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-gray-600">类型筛选</label>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
        >
          <option value="all">全部</option>
          <option value="fund">基金</option>
          <option value="option">期权</option>
          <option value="contract">合约</option>
        </select>
        <button
          className="ml-auto px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={loadData}
          disabled={loading}
        >{loading ? '刷新中...' : '刷新'}</button>
      </div>

      {error && (
        <div className="mb-3 text-red-600 text-sm">{error}</div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-3 py-2 text-left">订单号</th>
              <th className="px-3 py-2 text-left">类型</th>
              <th className="px-3 py-2 text-left">金额</th>
              <th className="px-3 py-2 text-left">状态</th>
              <th className="px-3 py-2 text-left">建仓时间</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-center" colSpan={5}>暂无持仓数据</td>
              </tr>
            ) : (
              filtered.map(item => (
                <tr key={`${item.type}-${item.id}`} className="border-t">
                  <td className="px-3 py-2">{item.orderNo || '-'}</td>
                  <td className="px-3 py-2">{item.type}</td>
                  <td className="px-3 py-2">{item.amount.toLocaleString()}</td>
                  <td className="px-3 py-2">{item.status}</td>
                  <td className="px-3 py-2">{new Date(item.openTime).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
