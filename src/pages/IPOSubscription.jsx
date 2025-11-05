import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast'; // Import useToast
import { formatCurrency } from '../utils/helpers';
import { mockIPOProducts } from '../utils/mockProducts';

export const IPOSubscription = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [ipos, setIpos] = useState([]);
  const [selected, setSelected] = useState('');
  const [msg, setMsg] = useState('');
  const [subscriptionAmount, setSubscriptionAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadIPOs = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        setIpos(mockIPOProducts);
      } else {
        const { data, error } = await supabase
          .from('ipos')
          .select(
            'id, ipo_code, company_name, market, issue_price, min_subscription, max_subscription, subscription_start, subscription_end, listing_date',
          )
          .order('id');
        if (error) throw error;
        setIpos(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载新股信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载申购历史
  const loadOrders = async () => {
    if (!user) return;

    try {
      if (!supabaseEnabled) {
        // 演示数据
        setOrders([
          {
            id: 1,
            order_no: 'IPO20241201001',
            user_id: user.id,
            ipo_id: 1,
            ipo_code: 'IPO001',
            subscription_amount: 50000,
            shares_allocated: 3165,
            order_status: 'allocated',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 2,
            order_no: 'IPO20241201002',
            user_id: user.id,
            ipo_id: 2,
            ipo_code: 'IPO002',
            subscription_amount: 25000,
            shares_allocated: 0,
            order_status: 'pending',
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('ipo_orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);
        if (error) throw error;
        setOrders(data || []);
      }
    } catch (e) {
      console.error(e);
      setMsg('加载申购历史失败');
    }
  };

  useEffect(() => {
    loadIPOs();
    loadOrders();
  }, [user]);

  // 验证交易权限
  const validatePermissions = () => {
    const result = validateUserPermissions(user, 'ipo');
    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证申购限额
  const validateSubscriptionLimit = () => {
    const selectedIPO = ipos.find((i) => i.ipo_code === selected);
    if (!selectedIPO) return true;

    // 验证最小申购金额
    if (subscriptionAmount < selectedIPO.min_subscription) {
      setMsg(`申购金额不能低于最低申购金额 ¥${selectedIPO.min_subscription.toLocaleString()}`);
      return false;
    }

    // 验证最大申购金额
    if (subscriptionAmount > selectedIPO.max_subscription) {
      setMsg(`申购金额不能超过最大申购金额 ¥${selectedIPO.max_subscription.toLocaleString()}`);
      return false;
    }

    // 验证申购时间
    const now = new Date();
    const subscriptionStart = new Date(selectedIPO.subscription_start);
    const subscriptionEnd = new Date(selectedIPO.subscription_end);
    if (now < subscriptionStart) {
      setMsg('申购尚未开始');
      return false;
    }
    if (now > subscriptionEnd) {
      setMsg('申购已结束');
      return false;
    }

    return true;
  };

  // 申购
  const subscribe = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅会员可申购');
      return;
    }

    if (!validatePermissions()) return;

    if (!selected) {
      setMsg('请选择新股');
      return;
    }
    if (!subscriptionAmount || subscriptionAmount <= 0) {
      setMsg('请输入有效申购金额');
      return;
    }

    // 验证申购限额
    if (!validateSubscriptionLimit()) return;

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `IPO${Date.now()}`;
      const currentTime = new Date().toISOString();

      if (!supabaseEnabled) {
        setMsg('申购成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          ipo_id: selectedIPO?.id || 1,
          ipo_code: selected,
          subscription_amount: subscriptionAmount,
          shares_allocated: 0,
          order_status: 'pending',
          created_at: currentTime,
        };
        setOrders((prev) => [newOrder, ...prev]);
      } else {
        const { error } = await supabase.from('ipo_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          ipo_id: selectedIPO?.id,
          ipo_code: selected,
          subscription_amount: subscriptionAmount,
          shares_allocated: 0,
          order_status: 'pending',
          created_at: currentTime,
        });
        if (error) throw error;
        showToast('申购成功', 'success');
        loadOrders(); // 重新加载申购历史
      }

      // 重置表单
      setSubscriptionAmount(0);
      setSelected('');
    } catch (e) {
      console.error(e);
      showToast('申购失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getOrderStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待配售';
      case 'allocated':
        return '已配售';
      case 'listed':
        return '已上市';
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
      case 'allocated':
        return 'text-blue-600';
      case 'listed':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // 检查IPO是否在申购期内
  const isSubscriptionPeriod = (ipo) => {
    const now = new Date();
    const subscriptionStart = new Date(ipo.subscription_start);
    const subscriptionEnd = new Date(ipo.subscription_end);
    return now >= subscriptionStart && now <= subscriptionEnd;
  };

  return (
    <div className="p-6 pt-20">
      <TopNavigationBar title="新购申购" />

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {showHistory ? '隐藏历史' : '查看历史'}
        </button>
      </div>

      {msg && <div className="mb-3 text-sm text-gray-700">{msg}</div>}

      {/* 申购权限信息 */}
      {user?.permissions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">申购权限</h3>
          <div className="text-sm">
            <span>新股申购权限：</span>
            <span className={user.permissions.ipo ? 'text-green-600' : 'text-red-600'}>
              {user.permissions.ipo ? '已开通' : '未开通'}
            </span>
          </div>
        </div>
      )}

      {/* 申购表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">新股申购</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择新股</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择新股</option>
              {ipos.map((ipo) => (
                <option key={ipo.id} value={ipo.ipo_code} disabled={!isSubscriptionPeriod(ipo)}>
                  {ipo.ipo_code} - {ipo.company_name} ({ipo.market})
                  {!isSubscriptionPeriod(ipo) && ' (申购期已过)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">申购金额</label>
            <input
              type="number"
              value={subscriptionAmount || ''}
              onChange={(e) => setSubscriptionAmount(parseFloat(e.target.value))}
              placeholder="申购金额"
              step="1000"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 显示选中新股的详细信息 */}
        {selected && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            {(() => {
              const selectedIPO = ipos.find((i) => i.ipo_code === selected);
              return selectedIPO ? (
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">发行价格：</span>¥{selectedIPO.issue_price}
                    </div>
                    <div>
                      <span className="font-medium">最低申购：</span>
                      {formatCurrency(selectedIPO.min_subscription)}
                    </div>
                    <div>
                      <span className="font-medium">最高申购：</span>
                      {formatCurrency(selectedIPO.max_subscription)}
                    </div>
                    <div>
                      <span className="font-medium">申购时间：</span>
                      {formatDate(selectedIPO.subscription_start)} 至{' '}
                      {formatDate(selectedIPO.subscription_end)}
                    </div>
                    <div>
                      <span className="font-medium">上市日期：</span>
                      {formatDate(selectedIPO.listing_date)}
                    </div>
                    <div>
                      <span className="font-medium">市场：</span>
                      {selectedIPO.market}
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">新股申购需满足最低申购金额要求</div>
          <button
            disabled={loading || !subscriptionAmount || !selected}
            onClick={subscribe}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {loading ? '申购中...' : '申购'}
          </button>
        </div>
      </div>

      {/* 申购历史 */}
      {showHistory && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">申购历史</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    申购单号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    新股代码
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    公司名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申购金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配售股数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申购时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      暂无申购记录
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const ipo = ipos.find((i) => i.ipo_code === order.ipo_code);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:table-cell">
                          {order.order_no}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.ipo_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ipo?.company_name || '--'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(order.subscription_amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.shares_allocated || '--'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={getOrderStatusColor(order.order_status)}>
                            {getOrderStatusText(order.order_status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(order.created_at)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>• 新股申购需在规定时间内进行，过期不可申购</p>
        <p>• 申购结果将在配售完成后公布</p>
        <p>• 未中签资金将在规定时间内退回</p>
      </div>
    </div>
  );
};

export default IPOSubscription;
