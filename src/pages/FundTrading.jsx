import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/useAuth.js';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { validateUserPermissions, validateTradeLimits } from '../utils/tradeValidation';
import { useToast } from '../components/Toast';
import { startDataSimulation, stopDataSimulation } from '../services/mockDataService';
import RealTimeChart from '../components/RealTimeChart';

const AICalloutCard = () => (
    <div className="bg-gradient-to-r from-indigo-900/70 to-purple-900/70 p-3 rounded-lg border border-indigo-500/50 mb-4 shadow-xl">
        <div className="flex items-center justify-between">
            <h4 className="text-md font-bold text-yellow-300 flex items-center">
                <i className="fas fa-robot mr-2 pulse"></i> AI 决策助理
            </h4>
            <span className="text-xs text-green-400">信号准确率: 78.5%</span>
        </div>
        <p className="mt-1 text-sm text-gray-200">
            【中国平安 45.67】 → **技术形态强劲，建议买入**。请关注下方AI风控止盈线。
        </p>
    </div>
);

export const FundTrading = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [funds, setFunds] = useState([]);
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState(0);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const loadFunds = async () => {
    setLoading(true);
    setMsg('');
    try {
      if (!supabaseEnabled) {
        const mockFunds = [
          { id: 1, fund_code: 'F0001', fund_name: '稳健增长基金', fund_type: '混合型', risk_level: '中等', min_amount: 1000 },
          { id: 2, fund_code: 'F0002', fund_name: '科技创新基金', fund_type: '股票型', risk_level: '高', min_amount: 5000 },
          { id: 3, fund_code: 'F0003', fund_name: '货币市场基金', fund_type: '货币型', risk_level: '低', min_amount: 100 }
        ];
        setFunds(mockFunds);
        startDataSimulation(mockFunds.map(f => f.fund_code)); // Start simulation with all fund codes
      } else {
        const { data, error } = await supabase
          .from('funds')
          .select('id, fund_code, fund_name, fund_type, risk_level, min_amount')
          .order('id');
        if (error) throw error;
        setFunds(data || []);
        startDataSimulation(data.map(f => f.fund_code)); // Start simulation with all fund codes
      }
    } catch (e) {
      console.error(e);
      setMsg('加载基金失败');
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
            order_no: 'FND20241201001',
            user_id: user.id,
            fund_id: 1,
            fund_code: 'F0001',
            amount: 10000,
            shares: 8547.01,
            nav: 1.1698,
            order_status: 'holding',
            order_type: 'buy',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            profit_amount: 150.50
          },
          {
            id: 2,
            order_no: 'FND20241201002',
            user_id: user.id,
            fund_id: 2,
            fund_code: 'F0002',
            amount: 5000,
            shares: 4166.67,
            nav: 1.2000,
            order_status: 'holding',
            order_type: 'buy',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            profit_amount: -85.20
          }
        ]);
      } else {
        const { data, error } = await supabase
          .from('fund_orders')
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
    loadFunds(); 
    loadOrders();

    return () => {
      stopDataSimulation(); // Stop simulation on unmount
    };
  }, [user]);

  // 验证交易权限
  const validatePermissions = () => {
    const result = validateUserPermissions(user, 'fund');
    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证交易限额
  const validateTradeLimit = () => {
    const todayFundOrders = orders
      .filter(order => {
        const orderDate = new Date(order.created_at).toDateString();
        const today = new Date().toDateString();
        return orderDate === today && order.order_type === 'buy';
      });
    const result = validateTradeLimits(user, amount, todayFundOrders, 'fund');
    if (!result.isValid) {
      showToast(result.message, 'error');
    }
    return result.isValid;
  };

  // 验证基金最低投资额
  const validateMinAmount = () => {
    const selectedFund = funds.find(f => f.fund_code === selected);
    if (selectedFund?.min_amount && amount < selectedFund.min_amount) {
      setMsg(`投资金额不能低于最低投资额 ¥${selectedFund.min_amount.toLocaleString()}`);
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!user || user.userType !== 'user') {
      setMsg('仅用户可下单');
      return;
    }
    
    if (!validatePermissions()) return;
    
    if (!selected) { 
      setMsg('请选择基金'); 
      return; 
    }
    if (!amount || amount <= 0) { 
      setMsg('请输入有效金额'); 
      return; 
    }

    const selectedFund = funds.find(f => f.fund_code === selected);
    if (!selectedFund) {
      setMsg('未找到所选基金');
      return;
    }

    // 验证最低投资额
    if (!validateMinAmount()) return;

    // 验证交易限额
    if (!validateTradeLimit()) return;

    setLoading(true);
    setMsg('');
    try {
      const orderNo = `FND${Date.now()}`;
      const currentTime = new Date().toISOString();
      
      if (!supabaseEnabled) {
        setMsg('下单成功（本地演示）');
        // 添加到本地订单列表
        const newOrder = {
          id: Date.now(),
          order_no: orderNo,
          user_id: user.id,
          fund_id: selectedFund.id,
          fund_code: selected,
          amount,
          shares: amount / 1.2, // 模拟净值1.2
          nav: 1.2,
          order_status: 'holding',
          order_type: 'buy',
          created_at: currentTime,
          profit_amount: 0
        };
        setOrders(prev => [newOrder, ...prev]);
      } else {
        const { error } = await supabase.from('fund_orders').insert({
          order_no: orderNo,
          user_id: user.id,
          fund_code: selected,
          amount,
          shares: amount / 1.2, // 模拟净值
          nav: 1.2,
          order_status: 'holding',
          order_type: 'buy',
          created_at: currentTime,
          profit_amount: 0
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

  const getOrderStatusText = (status) => {
    switch (status) {
      case 'holding': return '持仓中';
      case 'redeemed': return '已赎回';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'holding': return 'text-blue-600';
      case 'redeemed': return 'text-gray-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case '低': return 'text-green-600 bg-green-100';
      case '中等': return 'text-yellow-600 bg-yellow-100';
      case '高': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">基金交易</h1>
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
            <span>基金权限：</span>
            <span className={user.permissions.fund ? 'text-green-600' : 'text-red-600'}>
              {user.permissions.fund ? '已开通' : '未开通'}
            </span>
          </div>
        </div>
      )}

      {/* 交易表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">基金投资</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择基金</label>
            <select 
              value={selected} 
              onChange={e => setSelected(e.target.value)} 
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择基金</option>
              {funds.map(f => (
                <option key={f.id} value={f.fund_code}>
                  {f.fund_code} - {f.fund_name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">投资金额</label>
            <input 
              type="number" 
              value={amount || ''} 
              onChange={e => setAmount(parseFloat(e.target.value))} 
              placeholder="投资金额" 
              step="100"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
        </div>
        
        {/* 显示选中基金的详细信息 */}
        {selected && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            {(() => {
              const selectedFund = funds.find(f => f.fund_code === selected);
              return selectedFund ? (
                <div className="text-sm text-gray-600">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div><span className="font-medium">基金类型：</span>{selectedFund.fund_type}</div>
                    <div>
                      <span className="font-medium">风险等级：</span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ml-1 ${getRiskLevelColor(selectedFund.risk_level || '')}`}>
                        {selectedFund.risk_level}
                      </span>
                    </div>
                    {selectedFund.min_amount && (
                      <div><span className="font-medium">最低投资：</span>{formatCurrency(selectedFund.min_amount)}</div>
                    )}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            投资基金具有市场风险，请谨慎投资
          </div>
          <button 
            disabled={loading || !amount || !selected} 
            onClick={placeOrder} 
            className="w-full py-2.5 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/40 transform transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '投资中...' : '确认买入（市价）'}
          </button>
          <button 
            onClick={() => showToast('一键跟单功能开发中...', 'info')}
            className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
              <i className="fas fa-magic mr-1"></i> 一键跟单AI信号
          </button>
        </div>
      </div>

      {/* 实时行情图表 */}
      {selected && (
        <div className="mb-6">
          <AICalloutCard />
          {/* AI 风控建议 */}
          <div className="bg-gradient-to-r from-red-900/70 to-orange-900/70 p-3 rounded-lg border border-red-500/50 mt-4 shadow-xl">
            <h4 className="text-md font-bold text-red-300 flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i> AI 风控建议
            </h4>
            <p className="mt-1 text-sm text-gray-200">
                【中国平安 45.67】 → **当前波动较大，建议设置止损线在 44.50**，止盈线在 47.00。
            </p>
          </div>
          <RealTimeChart symbol={selected} />
        </div>
      )}

      {/* 订单历史 */}
      {showHistory && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">投资历史</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">订单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">基金代码</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">份额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">净值</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">盈亏金额</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-gray-500">暂无交易记录</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:table-cell">
                        {order.order_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/8">
                        {order.fund_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/8">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.shares?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {order.nav?.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm w-1/8">
                        <span className={getOrderStatusColor(order.order_status)}>
                          {getOrderStatusText(order.order_status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/8">
                        {order.order_type === 'buy' ? '买入' : '赎回'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm w-3/5">
                        <span className={order.profit_amount > 0 ? 'text-green-600' : order.profit_amount < 0 ? 'text-red-600' : 'text-gray-600'}>
                          {order.profit_amount !== undefined ? formatCurrency(order.profit_amount) : '--'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(order.created_at)}
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
        <p>• 基金投资有风险，投资需谨慎</p>
        <p>• 基金净值会根据市场情况波动</p>
        <p>• 赎回基金可能需要1-3个工作日到账</p>
      </div>
    </div>
  );
};

export default FundTrading;