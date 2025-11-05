import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { format } from 'date-fns';

type OrderType = 'fund' | 'option' | 'contract';

interface UnifiedOrder {
  id?: number;
  order_no: string;
  type: OrderType;
  amount: number;
  status: string;
  time: string;
}

const currency = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const TransactionHistory = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<UnifiedOrder[]>([]);
  const [filter, setFilter] = useState<OrderType | 'all'>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => (filter === 'all' ? true : o.type === filter));
  }, [orders, filter]);

  async function loadOrders() {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      if (supabaseEnabled) {
        const [fundRes, optRes, ctrRes] = await Promise.all([
          supabase.from('fund_orders').select('*').eq('user_id', user.id).order('invest_time', { ascending: false }),
          supabase.from('option_orders').select('*').eq('user_id', user.id).order('start_time', { ascending: false }),
          supabase.from('contract_orders').select('*').eq('user_id', user.id).order('open_time', { ascending: false }),
        ]);

        const fundOrders: UnifiedOrder[] = (fundRes.data || []).map((o) => ({
          id: o.id,
          order_no: o.order_no,
          type: 'fund' as OrderType,
          amount: Number(o.invest_amount || 0),
          status: String(o.order_status || 'holding'),
          time: format(new Date(o.invest_time), 'yyyy-MM-dd HH:mm:ss'),
        }));

        const optionOrders: UnifiedOrder[] = (optRes.data || []).map((o) => ({
          id: o.id,
          order_no: o.order_no,
          type: 'option' as OrderType,
          amount: Number(o.invest_amount || 0),
          status: String(o.profit_status || 'pending'),
          time: format(new Date(o.start_time), 'yyyy-MM-dd HH:mm:ss'),
        }));

        const contractOrders: UnifiedOrder[] = (ctrRes.data || []).map((o) => ({
          id: o.id,
          order_no: o.order_no,
          type: 'contract' as OrderType,
          amount: Number(o.margin_amount || 0),
          status: String(o.order_status || 'open'),
          time: format(new Date(o.open_time), 'yyyy-MM-dd HH:mm:ss'),
        }));

        setOrders([...fundOrders, ...optionOrders, ...contractOrders]);
      } else {
        const demo: UnifiedOrder[] = [
          { order_no: `F${Date.now() - 100000}`, type: 'fund' as OrderType, amount: 2000, status: 'holding', time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
          { order_no: `O${Date.now() - 80000}`, type: 'option' as OrderType, amount: 300, status: 'win', time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
          { order_no: `C${Date.now() - 60000}`, type: 'contract' as OrderType, amount: 1200, status: 'closed', time: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        ];
        setOrders(demo);
      }
    } catch (e: any) {
      setError(e?.message || '加载交易记录失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">交易记录</h1>

      <div className="flex items-center gap-2 mb-4">
        <button className={`px-3 py-1 rounded ${filter==='all'?'bg-primary-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('all')}>全部</button>
        <button className={`px-3 py-1 rounded ${filter==='fund'?'bg-primary-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('fund')}>基金</button>
        <button className={`px-3 py-1 rounded ${filter==='option'?'bg-primary-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('option')}>期权</button>
        <button className={`px-3 py-1 rounded ${filter==='contract'?'bg-primary-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('contract')}>合约</button>
        <button className="ml-auto px-3 py-1 rounded bg-gray-100" onClick={loadOrders}>刷新</button>
      </div>

      {error && <div className="mb-3 p-3 bg-danger-50 text-danger-700 rounded">{error}</div>}
      {loading && <div className="mb-3">加载中...</div>}

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 hidden md:table-cell">订单号</th>
              <th className="p-3">类型</th>
              <th className="p-3">金额</th>
              <th className="p-3">状态</th>
              <th className="p-3 hidden md:table-cell">时间</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o, idx) => (
              <tr key={`${o.order_no}-${idx}`} className="border-t">
                <td className="p-3 font-mono hidden md:table-cell">{o.order_no}</td>
                <td className="p-3">{o.type === 'fund' ? '基金' : o.type === 'option' ? '期权' : '合约'}</td>
                <td className="p-3">{currency(o.amount)}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3 hide-on-sm">{o.time}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
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

export default TransactionHistory;