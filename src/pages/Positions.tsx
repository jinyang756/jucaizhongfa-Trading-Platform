import { useEffect, useState } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { useAuth } from '../store/useAuth.js';

interface Position {
  id: string | number;
  type: 'fund' | 'option' | 'contract';
  code: string;
  name: string;
  amount: number;
  shares: number;
  nav: number;
  current_value: number;
  profit_loss: number;
  profit_loss_ratio: number;
  purchase_date: string;
}

export const Positions = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'fund', 'option', 'contract'

  const loadPositions = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      if (!supabaseEnabled) {
        // Mock data for demonstration
        setPositions([
          {
            id: 1,
            type: 'fund',
            code: 'F0001',
            name: '稳健增长基金',
            amount: 10000,
            shares: 8547.01,
            nav: 1.1698,
            current_value: 10500,
            profit_loss: 500,
            profit_loss_ratio: 0.05,
            purchase_date: '2023-01-15T10:00:00Z',
          },
          {
            id: 2,
            type: 'option',
            code: 'AAPL2406C150',
            name: '苹果看涨期权',
            amount: 500,
            shares: 10,
            nav: 50,
            current_value: 600,
            profit_loss: 100,
            profit_loss_ratio: 0.2,
            purchase_date: '2024-05-01T14:30:00Z',
          },
          {
            id: 3,
            type: 'contract',
            code: 'BTCUSDT',
            name: '比特币永续合约',
            amount: 2000,
            shares: 0.03,
            nav: 65000,
            current_value: 1950,
            profit_loss: -50,
            profit_loss_ratio: -0.025,
            purchase_date: '2024-05-10T08:00:00Z',
          },
        ]);
      } else {
        const { data: fundOrders, error: fundError } = await supabase
          .from('fund_orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('order_status', 'holding');
        if (fundError) throw fundError;

        const { data: optionOrders, error: optionError } = await supabase
          .from('option_orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('order_status', 'holding');
        if (optionError) throw optionError;

        const { data: contractOrders, error: contractError } = await supabase
          .from('contract_orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('order_status', 'holding');
        if (contractError) throw contractError;

        const allPositions: Position[] = [];

        fundOrders.forEach((order) => {
          allPositions.push({
            id: `fund-${order.id}`,
            type: 'fund',
            code: order.fund_code,
            name: order.fund_name || order.fund_code,
            amount: order.amount,
            shares: order.shares,
            nav: order.nav,
            current_value: order.shares * order.nav, // Simplified for mock
            profit_loss: order.profit_amount,
            profit_loss_ratio: order.profit_amount / order.amount,
            purchase_date: order.created_at,
          });
        });

        optionOrders.forEach((order) => {
          allPositions.push({
            id: `option-${order.id}`,
            type: 'option',
            code: order.option_code,
            name: order.option_name || order.option_code,
            amount: order.amount,
            shares: order.shares,
            nav: order.nav,
            current_value: order.shares * order.nav, // Simplified for mock
            profit_loss: order.profit_loss,
            profit_loss_ratio: order.profit_loss_ratio,
            purchase_date: order.created_at,
          });
        });

        contractOrders.forEach((order) => {
          allPositions.push({
            id: `contract-${order.id}`,
            type: 'contract',
            code: order.contract_code,
            name: order.contract_name || order.contract_code,
            amount: order.amount,
            shares: order.shares,
            nav: order.nav,
            current_value: order.shares * order.nav, // Simplified for mock
            profit_loss: order.profit_loss,
            profit_loss_ratio: order.profit_loss_ratio,
            purchase_date: order.created_at,
          });
        });

        setPositions(allPositions);
      }
    } catch (e) {
      console.error('Error loading positions:', e);
      setError('加载持仓失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPositions();
  }, [user, filter]);

  const filteredPositions =
    filter === 'all' ? positions : positions.filter((p) => p.type === filter);

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (ratio: number) => {
    return `${(ratio * 100).toFixed(2)}%`;
  };

  const getProfitLossColor = (value: number) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getPositionTypeColor = (type: 'fund' | 'option' | 'contract') => {
    switch (type) {
      case 'fund':
        return 'bg-blue-100 text-blue-800';
      case 'option':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">我的持仓</h1>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('fund')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'fund' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          基金
        </button>
        <button
          onClick={() => setFilter('option')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'option' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          期权
        </button>
        <button
          onClick={() => setFilter('contract')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'contract' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          合约
        </button>
      </div>

      {loading && <p className="text-gray-600">加载中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredPositions.length === 0 && (
        <p className="text-gray-600">暂无持仓数据。</p>
      )}

      {!loading && !error && filteredPositions.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  类型
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  代码/名称
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  持仓金额
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  当前价值
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  盈亏
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  盈亏率
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  购买日期
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPositions.map((position) => (
                <tr key={position.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPositionTypeColor(position.type)}`}
                    >
                      {position.type === 'fund'
                        ? '基金'
                        : position.type === 'option'
                          ? '期权'
                          : '合约'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="text-sm font-medium text-gray-900">{position.code}</div>
                    <div className="text-sm text-gray-500">{position.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(position.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(position.current_value)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${getProfitLossColor(position.profit_loss)}`}
                  >
                    {formatCurrency(position.profit_loss)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${getProfitLossColor(position.profit_loss)}`}
                  >
                    {formatPercentage(position.profit_loss_ratio)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(position.purchase_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
