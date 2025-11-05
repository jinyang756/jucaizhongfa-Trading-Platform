import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { validateUserPermissions, validateTradeLimits } from '../utils/tradeValidation';
import { useToast } from '../components/Toast';
import { validateForm, required, isNumber, min } from '../utils/validation';

const RealTimeChart = React.lazy(() => import('../components/RealTimeChart'));

export const ContractTrading = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [contracts, setContracts] = useState([]);
  const [selected, setSelected] = useState('');
  const [msg, setMsg] = useState('');
  const [lever, setLever] = useState(1);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderAmount, setOrderAmount] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadContracts = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        setContracts([
          {
            id: 1,
            contract_code: 'SH0001',
            contract_name: '上海原油合约',
            market: 'SH',
            lever_min: 1,
            lever_max: 20,
            margin_ratio: 5.0,
          },
          {
            id: 2,
            contract_code: 'HK0001',
            contract_name: '香港恒生合约',
            market: 'HK',
            lever_min: 1,
            lever_max: 20,
            margin_ratio: 5.0,
          },
          {
            id: 3,
            contract_code: 'SH0002',
            contract_name: '上海黄金合约',
            market: 'SH',
            lever_min: 1,
            lever_max: 15,
            margin_ratio: 8.0,
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('contracts')
          .select('id, contract_code, contract_name, market, lever_min, lever_max, margin_ratio')
          .order('id');
        if (error) throw error;
        setContracts(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载合约失败');
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
            order_no: 'CON20241201001',
            user_id: user.id,
            contract_id: 1,
            order_type: 'market',
            direction: 'buy',
            lever: 10,
            order_price: 35000,
            order_amount: 2,
            margin_amount: 7000,
            stop_loss: 34000,
            take_profit: 36000,
            order_status: 'closed',
            open_time: new Date(Date.now() - 86400000).toISOString(),
            close_time: new Date(Date.now() - 82800000).toISOString(),
            profit_amount: 1500,
          },
          {
            id: 2,
            order_no: 'CON20241201002',
            user_id: user.id,
            contract_id: 2,
            order_type: 'limit',
            direction: 'sell',
            lever: 5,
            order_price: 28000,
            order_amount: 1,
            margin_amount: 5600,
            order_status: 'holding',
            open_time: new Date(Date.now() - 3600000).toISOString(),
            profit_amount: -200,
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('contract_orders')
          .select('*')
          .eq('user_id', user.id)
          .order('open_time', { ascending: false })
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
    loadContracts();
    loadOrders();
  }, [user]);

  // 验证交易权限
  const validatePermissions = () => {
    if (!user?.permissions) return false;

    const selectedContract = contracts.find((c) => c.contract_code === selected);
    if (!selectedContract) return false;

    let result;
    if (selectedContract.market === 'SH') {
      result = validateUserPermissions(user, 'shContract');
    } else if (selectedContract.market === 'HK') {
      result = validateUserPermissions(user, 'hkContract');
    } else {
      result = { isValid: false, message: '未知合约市场' };
    }

    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证交易限额
  const validateTradeLimit = () => {
    const marginAmount = calculateMarginAmount();
    const todayContractOrders = orders.filter((order) => {
      const orderDate = new Date(order.open_time).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    });
    const result = validateTradeLimits(user, marginAmount, todayContractOrders, 'contract');
    if (!result.isValid) {
      setMsg(result.message);
    }
    return result.isValid;
  };

  // 计算保证金
  const calculateMarginAmount = () => {
    if (!orderPrice || !orderAmount || !lever) return 0;
    return (orderPrice * orderAmount) / lever;
  };

  // 下单
  const placeOrder = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅用户可下单');
      return;
    }

    if (!validatePermissions()) return;

    if (!selected) {
      setMsg('请选择合约');
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

    // 验证杠杆范围
    const selectedContract = contracts.find((c) => c.contract_code === selected);
    if (selectedContract) {
      if (selectedContract.lever_min && lever < selectedContract.lever_min) {
        setMsg(`杠杆倍数不能小于 ${selectedContract.lever_min}`);
        return;
      }
      if (selectedContract.lever_max && lever > selectedContract.lever_max) {
        setMsg(`杠杆倍数不能大于 ${selectedContract.lever_max}`);
        return;
      }
    }

    // 验证交易限额
    if (!validateTradeLimit()) return;

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `CON${Date.now()}`;
      const openTime = new Date().toISOString();
      const marginAmount = calculateMarginAmount();

      if (!supabaseEnabled) {
        setMsg('下单成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          contract_id: selectedContract?.id || 1,
          order_type: orderType,
          direction,
          lever,
          order_price: orderPrice,
          order_amount: orderAmount,
          margin_amount: marginAmount,
          stop_loss: stopLoss || undefined,
          take_profit: takeProfit || undefined,
          order_status: 'holding',
          open_time: openTime,
          profit_amount: 0,
        };
        setOrders((prev) => [newOrder, ...prev]);
      } else {
        const { error } = await supabase.from('contract_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          contract_id: selectedContract?.id,
          order_type: orderType,
          direction,
          lever,
          order_price: orderPrice,
          order_amount: orderAmount,
          margin_amount: marginAmount,
          stop_loss: stopLoss || null,
          take_profit: takeProfit || null,
          order_status: 'holding',
          open_time: openTime,
          profit_amount: 0,
        });
        if (error) throw error;
        setMsg('下单成功');
        loadOrders(); // 重新加载订单历史
      }

      // 重置表单
      setOrderPrice(0);
      setOrderAmount(0);
      setStopLoss(0);
      setTakeProfit(0);
      setSelected('');
    } catch (e) {
      console.error(e);
      setMsg('下单失败');
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

  const getOrderStatusText = (status) => {
    switch (status) {
      case 'holding':
        return '持仓中';
      case 'closed':
        return '已平仓';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'holding':
        return 'text-blue-600';
      case 'closed':
        return 'text-gray-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">合约交易</h1>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span>沪深权限：</span>
                <span className={user.permissions.shContract ? 'text-green-600' : 'text-red-600'}>
                  {user.permissions.shContract ? '已开通' : '未开通'}
                </span>
              </div>
              <div>
                <span>港股权权：</span>
                <span className={user.permissions.hkContract ? 'text-green-600' : 'text-red-600'}>
                  {user.permissions.hkContract ? '已开通' : '未开通'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交易表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">下单交易</h3>

        {/* 第一行：基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择合约</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择合约</option>
              {contracts.map((c) => (
                <option key={c.id} value={c.contract_code}>
                  {c.contract_code} - {c.contract_name} ({c.market})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">订单类型</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="market">市价单</option>
              <option value="limit">限价单</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">交易方向</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="buy">买入 (做多)</option>
              <option value="sell">卖出 (做空)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">杠杆倍数</label>
            <input
              type="number"
              value={lever || ''}
              onChange={(e) => setLever(parseInt(e.target.value))}
              placeholder="杠杆倍数"
              min="1"
              max="100"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 第二行：价格和数量 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">数量</label>
            <input
              type="number"
              value={orderAmount || ''}
              onChange={(e) => setOrderAmount(parseFloat(e.target.value))}
              placeholder="订单数量"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">止损价格 (可选)</label>
            <input
              type="number"
              value={stopLoss || ''}
              onChange={(e) => setStopLoss(parseFloat(e.target.value))}
              placeholder="止损价格"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">止盈价格 (可选)</label>
            <input
              type="number"
              value={takeProfit || ''}
              onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
              placeholder="止盈价格"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 计算信息和下单按钮 */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {orderPrice && orderAmount && lever ? (
              <div className="space-y-1">
                <div>
                  <span className="font-medium">合约价值：</span>
                  {formatCurrency(orderPrice * orderAmount)}
                </div>
                <div>
                  <span className="font-medium">所需保证金：</span>
                  {formatCurrency(calculateMarginAmount())}
                </div>
              </div>
            ) : (
              <div className="text-gray-400">请填写价格、数量和杠杆倍数</div>
            )}
          </div>

          <button
            disabled={loading || !orderPrice || !orderAmount || !lever || !selected}
            onClick={placeOrder}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {loading ? '下单中...' : '下单'}
          </button>
        </div>

        {/* 显示选中合约的详细信息 */}
        {selected && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            {(() => {
              const selectedContract = contracts.find((c) => c.contract_code === selected);
              return selectedContract ? (
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <span className="font-medium">市场：</span>
                      {selectedContract.market}
                    </div>
                    {selectedContract.lever_min && selectedContract.lever_max && (
                      <div>
                        <span className="font-medium">杠杆范围：</span>
                        {selectedContract.lever_min}-{selectedContract.lever_max}倍
                      </div>
                    )}
                    {selectedContract.margin_ratio && (
                      <div>
                        <span className="font-medium">保证金比例：</span>
                        {selectedContract.margin_ratio}%
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    合约
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    方向
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    开仓价
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    数量
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    杠杆
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    保证金
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    当前价
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    浮动盈亏
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    止损
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    止盈
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    开仓时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    平仓时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-6 py-4 text-center text-gray-500">
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
                        {order.contract_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.direction === 'buy'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.direction === 'buy' ? '买涨' : '卖跌'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.open_price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.volume}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.leverage}x
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.margin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.current_price?.toFixed(2) || '--'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            order.pnl > 0
                              ? 'text-green-600'
                              : order.pnl < 0
                                ? 'text-red-600'
                                : 'text-gray-600'
                          }
                        >
                          {order.pnl !== undefined ? formatCurrency(order.pnl) : '--'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.stop_loss_price?.toFixed(2) || '--'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.take_profit_price?.toFixed(2) || '--'}
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
                        {order.close_time ? formatDateTime(order.close_time) : '--'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {order.order_status === 'open' && (
                          <button
                            onClick={() => closeOrder(order.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                            disabled={loading}
                          >
                            平仓
                          </button>
                        )}
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
        <p>• 合约交易为高风险杠杆交易，请谨慎投资</p>
        <p>• 杠杆交易可能导致快速亏损，请合理控制仓位</p>
        <p>• 建议设置止损止盈，控制风险</p>
      </div>
    </div>
  );
};

export default ContractTrading;
