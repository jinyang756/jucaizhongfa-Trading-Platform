import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { useToast } from '../components/Toast';

export const OptionTrading = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState(0);
  const [predict, setPredict] = useState('up');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // 加载期权产品
  const loadOptions = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        setOptions([
          {
            id: 1,
            option_code: 'OPT001',
            option_name: '1分钟涨跌期权',
            cycle: 1,
            yield_rate: 75,
            min_invest: 100,
          },
          {
            id: 2,
            option_code: 'OPT002',
            option_name: '5分钟涨跌期权',
            cycle: 5,
            yield_rate: 78,
            min_invest: 100,
          },
          {
            id: 3,
            option_code: 'OPT003',
            option_name: '10分钟涨跌期权',
            cycle: 10,
            yield_rate: 80,
            min_invest: 100,
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('options')
          .select('id, option_code, option_name, cycle, yield_rate, min_invest')
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
            predict: 'up',
            invest_amount: 500,
            profit_status: 'win',
            profit_amount: 375,
            start_time: new Date(Date.now() - 3600000).toISOString(),
            end_time: new Date(Date.now() - 3540000).toISOString(),
          },
          {
            id: 2,
            order_no: 'OPT20241201002',
            user_id: user.id,
            option_id: 2,
            predict: 'down',
            invest_amount: 300,
            profit_status: 'lose',
            profit_amount: -300,
            start_time: new Date(Date.now() - 7200000).toISOString(),
            end_time: new Date(Date.now() - 6900000).toISOString(),
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('option_orders')
          .select('*')
          .eq('user_id', user.id)
          .order('start_time', { ascending: false })
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

  // 验证交易限额
  const validateTradeLimit = (tradeAmount) => {
    if (!user?.limits) return false;

    // 检查单笔交易限额
    if (tradeAmount > user.limits.singleTradeMax) {
      setMsg(`交易金额超过单笔限额 ¥${user.limits.singleTradeMax.toLocaleString()}`);
      return false;
    }

    // 检查今日交易总额（简化版本，实际应该查询今日所有交易）
    const todayTotal = orders
      .filter((order) => {
        const orderDate = new Date(order.start_time).toDateString();
        const today = new Date().toDateString();
        return orderDate === today;
      })
      .reduce((sum, order) => sum + order.invest_amount, 0);

    if (todayTotal + tradeAmount > user.limits.dailyTradeMax) {
      setMsg(`今日交易总额将超过限额 ¥${user.limits.dailyTradeMax.toLocaleString()}`);
      return false;
    }

    return true;
  };

  // 下单
  const placeOrder = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅用户可下单');
      return;
    }
    if (!user.permissions?.option) {
      setMsg('您还未开通二元期权权限');
      return;
    }
    if (!selected) {
      setMsg('请选择期权');
      return;
    }
    if (!amount || amount <= 0) {
      setMsg('请输入有效金额');
      return;
    }

    // 验证交易限额
    if (!validateTradeLimit(amount)) {
      return;
    }

    // 检查最小投资额
    const selectedOption = options.find((o) => o.option_code === selected);
    if (selectedOption?.min_invest && amount < selectedOption.min_invest) {
      setMsg(`最小投资金额为 ¥${selectedOption.min_invest}`);
      return;
    }

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `OPT${Date.now()}`;
      const startTime = new Date().toISOString();

      if (!supabaseEnabled) {
        setMsg('下单成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          option_id: selectedOption?.id || 1,
          predict,
          invest_amount: amount,
          profit_status: 'pending',
          profit_amount: 0,
          start_time: startTime,
        };
        setOrders((prev) => [newOrder, ...prev]);
      } else {
        const { error } = await supabase.from('option_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          option_id: selectedOption?.id,
          predict,
          invest_amount: amount,
          profit_status: 'pending',
          profit_amount: 0,
          start_time: startTime,
        });
        if (error) throw error;
        showToast('下单成功', 'success');
        loadOrders(); // 重新加载订单历史
      }
      setAmount(0);
      setSelected('');
    } catch (e) {
      console.error(e);
      showToast('下单失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `¥${amount.toLocaleString()}`;
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getProfitStatusText = (status) => {
    switch (status) {
      case 'win':
        return '盈利';
      case 'lose':
        return '亏损';
      case 'pending':
        return '进行中';
      default:
        return status;
    }
  };

  const getProfitStatusColor = (status) => {
    switch (status) {
      case 'win':
        return 'text-green-600';
      case 'lose':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">二元期权交易</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {showHistory ? '隐藏历史' : '查看历史'}
        </button>
      </div>

      {msg && <div className="mb-3 text-sm text-gray-700">{msg}</div>}

      {/* 交易限额信息 */}
      {user?.limits && (
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
        </div>
      )}

      {/* 交易表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">下单交易</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择期权</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择期权</option>
              {options.map((o) => (
                <option key={o.id} value={o.option_code}>
                  {o.option_code} - {o.option_name}
                  {o.yield_rate && ` (${o.yield_rate}%)`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">投资金额</label>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="投资金额"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">预测方向</label>
            <select
              value={predict}
              onChange={(e) => setPredict(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="up">看涨 ↗</option>
              <option value="down">看跌 ↘</option>
            </select>
          </div>

          <button
            disabled={loading}
            onClick={placeOrder}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {loading ? '下单中...' : '下单'}
          </button>
        </div>

        {/* 显示选中期权的详细信息 */}
        {selected && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            {(() => {
              const selectedOption = options.find((o) => o.option_code === selected);
              return selectedOption ? (
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedOption.cycle && (
                      <div>
                        <span className="font-medium">周期：</span>
                        {selectedOption.cycle}分钟
                      </div>
                    )}
                    {selectedOption.yield_rate && (
                      <div>
                        <span className="font-medium">收益率：</span>
                        {selectedOption.yield_rate}%
                      </div>
                    )}
                    {selectedOption.min_invest && (
                      <div>
                        <span className="font-medium">最小投资：</span>
                        {formatCurrency(selectedOption.min_invest)}
                      </div>
                    )}
                    {amount > 0 && selectedOption.yield_rate && (
                      <div>
                        <span className="font-medium">预期收益：</span>
                        {formatCurrency((amount * selectedOption.yield_rate) / 100)}
                      </div>
                    )}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    预测
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    投资金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">
                    盈亏
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    开始时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    结束时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      暂无交易记录
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:table-cell">
                        {order.order_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/8">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.predict === 'up'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.predict === 'up' ? '看涨 ↗' : '看跌 ↘'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/8">
                        {formatCurrency(order.invest_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm w-1/8">
                        <span className={getProfitStatusColor(order.profit_status)}>
                          {getProfitStatusText(order.profit_status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm w-3/5">
                        <span
                          className={
                            order.profit_amount > 0
                              ? 'text-green-600'
                              : order.profit_amount < 0
                                ? 'text-red-600'
                                : 'text-gray-600'
                          }
                        >
                          {order.profit_amount !== 0 ? formatCurrency(order.profit_amount) : '--'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {formatDateTime(order.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.end_time ? formatDateTime(order.end_time) : '--'}
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
        <p>• 二元期权为高风险投资产品，请谨慎投资</p>
        <p>• 交易结果基于市场价格变动，盈亏自负</p>
      </div>
    </div>
  );
};

export default OptionTrading;
