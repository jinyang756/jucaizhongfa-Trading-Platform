import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast'; // Import useToast
import RealTimeChart from '../components/RealTimeChart';
import { formatCurrency } from '../utils/helpers';
import { mockOptionProducts } from '../utils/mockProducts';
import { useAuth } from '../store/useAuth';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { validateUserPermissions, validateTradeLimits } from '../utils/tradeValidation';

export const OptionTrading = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [msg, setMsg] = useState('');
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadOptions = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        setOptions(mockOptionProducts);
      } else {
        const { data, error } = await supabase
          .from('options')
          .select('id, option_code, option_name, underlying_asset, option_type, strike_price, expiry_date, min_amount')
          .order('id');
        if (error) throw error;
        setOptions(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载期权失败');
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
            order_no: 'OPT20241201001',
            user_id: user.id,
            option_id: 1,
            option_code: 'OP0001',
            order_price: 150,
            order_amount: 10,
            premium: 1500,
            order_status: 'holding',
            order_type: 'buy',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            profit_amount: 250,
          },
          {
            id: 2,
            order_no: 'OPT20241201002',
            user_id: user.id,
            option_id: 2,
            option_code: 'OP0002',
            order_price: 80,
            order_amount: 5,
            premium: 400,
            order_status: 'expired',
            order_type: 'buy',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            profit_amount: -400,
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('option_orders')
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
    loadOptions();
    loadOrders();
  }, [user]);

  // 验证交易权限
  const validatePermissions = () => {
    const result = validateUserPermissions(user, 'option');
    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证交易限额
  const validateTradeLimit = () => {
    const premium = orderPrice * orderAmount;
    const todayOptionOrders = orders.filter((order) => {
      const orderDate = new Date(order.created_at).toDateString();
      const today = new Date().toDateString();
      return orderDate === today && order.order_type === 'buy';
    });
    const result = validateTradeLimits(user, premium, todayOptionOrders, 'option');
    if (!result.isValid) {
      setMsg(result.message);
    }
    return result.isValid;
  };

  // 下单
  const placeOrder = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅会员可下单');
      return;
    }

    if (!validatePermissions()) return;

    if (!selected) {
      setMsg('请选择期权');
      return;
    }
    if (!orderPrice || orderPrice <= 0) {
      setMsg('请输入有效价格');
      return;
    }
    if (!orderAmount || orderAmount <= 0) {
      setMsg('请输入有效数量');
      return;
    }

    // 验证最低交易数量
    const selectedOption = options.find((o) => o.option_code === selected);
    if (selectedOption?.min_amount && orderAmount < selectedOption.min_amount) {
      setMsg(`交易数量不能低于最低数量 ${selectedOption.min_amount}`);
      return;
    }

    // 验证交易限额
    if (!validateTradeLimit()) return;

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `OPT${Date.now()}`;
      const currentTime = new Date().toISOString();
      const premium = orderPrice * orderAmount;

      if (!supabaseEnabled) {
        setMsg('下单成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          option_id: selectedOption?.id || 1,
          option_code: selected,
          order_price: orderPrice,
          order_amount: orderAmount,
          premium: premium,
          order_status: 'holding',
          order_type: 'buy',
          created_at: currentTime,
        };
        setOrders([newOrder, ...orders]);
      } else {
        const { data, error } = await supabase.from('option_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          option_id: selectedOption?.id || 1,
          order_price: orderPrice,
          order_amount: orderAmount,
          premium: premium,
          order_status: 'holding',
          order_type: 'buy',
        });

        if (error) throw error;
        setMsg('下单成功');
        loadOrders(); // 重新加载订单
      }
    } catch (e) {
      console.error(e);
      setMsg('下单失败');
    } finally {
      setLoading(false);
    }
  };

  // 计算权利金
  const calculatePremium = () => {
    return orderPrice * orderAmount;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">期权交易</h1>

      {msg && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{msg}</div>}

      {/* 期权选择和下单表单 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">期权下单</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择期权</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择期权</option>
              {options.map((option) => (
                <option key={option.id} value={option.option_code}>
                  {option.option_name} ({option.option_code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">价格</label>
            <input
              type="number"
              value={orderPrice}
              onChange={(e) => setOrderPrice(parseFloat(e.target.value))}
              placeholder="期权价格"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">数量</label>
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => setOrderAmount(parseInt(e.target.value))}
              placeholder="期权数量"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '下单中...' : '买入期权'}
            </button>
          </div>
        </div>

        {selected && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-600">
              <p>权利金: {formatCurrency(calculatePremium())}</p>
              <p>期权详情: {options.find((o) => o.option_code === selected)?.option_name}</p>
            </div>
          </div>
        )}
      </div>

      {/* 实时行情图表 */}
      {selected && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">实时行情</h2>
          <RealTimeChart symbol={selected} />
        </div>
      )}

      {/* AI 决策助理 */}
      <div className="bg-gradient-to-r from-indigo-900/70 to-purple-900/70 p-3 rounded-lg border border-indigo-500/50 mb-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-bold text-yellow-300 flex items-center">
            <i className="fas fa-robot mr-2 pulse"></i> AI 决策助理
          </h4>
          <span className="text-xs text-green-400">信号准确率: 76.2%</span>
        </div>
        <p className="mt-1 text-sm text-gray-200">
          【上证50看涨期权 OP0001】 → **技术形态良好，建议买入**。请关注下方AI风控止盈线。
        </p>
      </div>

      {/* 订单历史 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">订单历史</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {showHistory ? '隐藏' : '显示'}
          </button>
        </div>

        {showHistory && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    期权
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    价格
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    数量
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    权利金
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    收益
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_no}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.option_code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.order_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.premium)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.order_status === 'holding'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.order_status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.order_status === 'holding' ? '持仓' : order.order_status === 'completed' ? '已完成' : '已过期'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={order.profit_amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {order.profit_amount >= 0 ? '+' : ''}
                        {formatCurrency(order.profit_amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!showHistory && (
          <div className="text-center py-4 text-gray-500">
            点击"显示"查看订单历史
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>• 期权交易具有高风险，请充分了解期权特性后再进行交易</p>
        <p>• 期权价格会根据标的资产价格波动而变化</p>
        <p>• 期权到期日为最后交易日，请及时平仓或行权</p>
      </div>
    </div>
  );
};

export default OptionTrading;