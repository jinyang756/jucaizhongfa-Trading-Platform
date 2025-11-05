import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast'; // Import useToast
import { formatCurrency } from '../utils/helpers';
import { mockBlockTradingProducts } from '../utils/mockProducts';

export const BlockTrading = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [blockTrades, setBlockTrades] = useState([]);
  const [selected, setSelected] = useState('');
  const [msg, setMsg] = useState('');
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadBlockTrades = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        setBlockTrades([
          {
            id: 1,
            trade_code: 'BT0001',
            trade_name: '沪深300大宗交易',
            market: 'SH',
            min_amount: 1000000,
            fee_rate: 0.001,
          },
          {
            id: 2,
            trade_code: 'BT0002',
            trade_name: '上证50大宗交易',
            market: 'SH',
            min_amount: 500000,
            fee_rate: 0.001,
          },
          {
            id: 3,
            trade_code: 'BT0003',
            trade_name: '恒生指数大宗交易',
            market: 'HK',
            min_amount: 2000000,
            fee_rate: 0.0015,
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('block_trades')
          .select('id, trade_code, trade_name, market, min_amount, fee_rate')
          .order('id');
        if (error) throw error;
        setBlockTrades(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载大宗交易品种失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载订单历史
  const loadOrders = async () => {
    if (!user) return;

    try {
      if (!supabaseEnabled) {
        // 演示数据
        setOrders([
          {
            id: 1,
            order_no: 'BLK20241201001',
            user_id: user.id,
            trade_id: 1,
            trade_code: 'BT0001',
            order_price: 4200,
            order_amount: 1000000,
            fee_amount: 1000,
            order_status: 'completed',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            completed_at: new Date(Date.now() - 82800000).toISOString(),
          },
          {
            id: 2,
            order_no: 'BLK20241201002',
            user_id: user.id,
            trade_id: 2,
            trade_code: 'BT0002',
            order_price: 2800,
            order_amount: 500000,
            fee_amount: 500,
            order_status: 'pending',
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('block_orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);
        if (error) throw error;
        setOrders(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载订单历史失败');
    }
  };

  useEffect(() => {
    loadBlockTrades();
    loadOrders();
  }, [user]);

  // 验证交易权限
  const validatePermissions = () => {
    const result = validateUserPermissions(user, 'block');
    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证交易限额
  const validateTradeLimit = () => {
    const todayBlockOrders = orders.filter((order) => {
      const orderDate = new Date(order.created_at).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    });
    const result = validateTradeLimits(user, orderAmount, todayBlockOrders, 'block');
    if (!result.isValid) {
      setMsg(result.message);
    }
    return result.isValid;
  };

  // 计算手续费
  const calculateFee = () => {
    if (!orderAmount) return 0;
    const selectedTrade = blockTrades.find((t) => t.trade_code === selected);
    return orderAmount * (selectedTrade?.fee_rate || 0.001);
  };

  // 下单
  const placeOrder = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅会员可下单');
      return;
    }

    if (!validatePermissions()) return;

    if (!selected) {
      setMsg('请选择交易品种');
      return;
    }
    if (!orderPrice || orderPrice <= 0) {
      setMsg('请输入有效价格');
      return;
    }
    if (!orderAmount || orderAmount <= 0) {
      setMsg('请输入有效金额');
      return;
    }

    // 验证最低交易金额
    const selectedTrade = blockTrades.find((t) => t.trade_code === selected);
    if (selectedTrade?.min_amount && orderAmount < selectedTrade.min_amount) {
      setMsg(`交易金额不能低于最低金额 ¥${selectedTrade.min_amount.toLocaleString()}`);
      return;
    }

    // 验证交易限额
    if (!validateTradeLimit()) return;

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `BLK${Date.now()}`;
      const currentTime = new Date().toISOString();
      const feeAmount = calculateFee();

      if (!supabaseEnabled) {
        setMsg('下单成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          trade_id: selectedTrade?.id || 1,
          trade_code: selected,
          order_price: orderPrice,
          order_amount: orderAmount,
          fee_amount: feeAmount,
          order_status: 'pending',
          created_at: currentTime,
        };
        setOrders((prev) => [newOrder, ...prev]);
      } else {
        const { error } = await supabase.from('block_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          trade_id: selectedTrade?.id,
          trade_code: selected,
          order_price: orderPrice,
          order_amount: orderAmount,
          fee_amount: feeAmount,
          order_status: 'pending',
          created_at: currentTime,
        });
        if (error) throw error;
        showToast('下单成功', 'success');
        loadOrders(); // 重新加载订单历史
      }

      // 重置表单
      setOrderPrice(0);
      setOrderAmount(0);
      setSelected('');
    } catch (e) {
      console.error(e);
      showToast('下单失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getOrderStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待撮合';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'completed':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 pt-20">
      <TopNavigationBar title="大宗交易" />

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {showHistory ? '隐藏历史' : '查看历史'}
        </button>
      </div>

      {msg && <div className="mb-3 text-sm text-gray-700">{msg}</div>}

      {/* 交易限额信息 */}
      {user?.permissions && user?.limits && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">交易限额</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">单笔限额：</span>
              <span className="font-medium">{formatCurrency(user.limits.singleTradeMax)}</span>
            </div>
            <div>
              <span className="text-blue-600">日交易限额：</span>
              <span className="font-medium">{formatCurrency(user.limits.dailyTradeMax)}</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            <span>大宗交易权限：</span>
            <span className={user.permissions.block ? 'text-green-600' : 'text-red-600'}>
              {user.permissions.block ? '已开通' : '未开通'}
            </span>
          </div>
        </div>
      )}

      {/* 交易表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">大宗交易下单</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择交易品种</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择交易品种</option>
              {blockTrades.map((t) => (
                <option key={t.id} value={t.trade_code}>
                  {t.trade_code} - {t.trade_name} ({t.market})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">交易金额</label>
            <input
              type="number"
              value={orderAmount || ''}
              onChange={(e) => setOrderAmount(parseFloat(e.target.value))}
              placeholder="交易金额"
              step="10000"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">价格</label>
            <input
              type="number"
              value={orderPrice || ''}
              onChange={(e) => setOrderPrice(parseFloat(e.target.value))}
              placeholder="订单价格"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">手续费</label>
            <div className="w-full px-3 py-2 border rounded-lg bg-gray-50">
              {formatCurrency(calculateFee())}
            </div>
          </div>
        </div>

        {/* 显示选中交易品种的详细信息 */}
        {selected && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            {(() => {
              const selectedTrade = blockTrades.find((t) => t.trade_code === selected);
              return selectedTrade ? (
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <span className="font-medium">市场：</span>
                      {selectedTrade.market}
                    </div>
                    {selectedTrade.min_amount && (
                      <div>
                        <span className="font-medium">最低交易金额：</span>
                        {formatCurrency(selectedTrade.min_amount)}
                      </div>
                    )}
                    {selectedTrade.fee_rate && (
                      <div>
                        <span className="font-medium">手续费率：</span>
                        {(selectedTrade.fee_rate * 100).toFixed(3)}%
                      </div>
                    )}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">大宗交易为大额撮合交易，请确保资金充足</div>
          <button
            disabled={loading || !orderPrice || !orderAmount || !selected}
            onClick={placeOrder}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {loading ? '下单中...' : '下单'}
          </button>
        </div>
      </div>

      {/* 订单历史 */}
      {showHistory && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">交易历史</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    订单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易品种
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    价格
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    手续费
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    完成时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      暂无交易记录
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:table-cell">
                        {order.order_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.trade_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.order_price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.order_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.fee_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={getOrderStatusColor(order.order_status)}>
                          {getOrderStatusText(order.order_status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.completed_at ? formatDateTime(order.completed_at) : '--'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>• 大宗交易为大额撮合交易，通常有最低交易金额要求</p>
        <p>• 大宗交易撮合时间可能较长，请耐心等待</p>
        <p>• 大宗交易手续费率通常低于普通交易</p>
      </div>
    </div>
  );
};

export default BlockTrading;
