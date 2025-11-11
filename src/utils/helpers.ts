// 定义业务相关的类型
export type OrderStatus =
  | 'pending'
  | 'holding'
  | 'settled'
  | 'completed'
  | 'cancelled'
  | 'open'
  | 'closed';
export type RiskLevel = 'low' | 'mid' | 'high';

// 格式化数字为货币格式
export function formatCurrency(amount: number, currency = 'CNY') {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// 格式化日期
export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ... 其他辅助函数 ...

// 获取风险等级颜色
export function getRiskLevelColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'mid':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-red-600 bg-red-100';
    default:
      // 由于使用了类型约束，理论上这里不会被执行
      return 'text-gray-600 bg-gray-100';
  }
}

// 获取风险等级文本
export function getRiskLevelText(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'low':
      return '低风险';
    case 'mid':
      return '中风险';
    case 'high':
      return '高风险';
    default:
      return '未知';
  }
}

// 获取订单状态颜色
export function getOrderStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'holding':
    case 'open':
      return 'text-blue-600 bg-blue-100';
    case 'settled':
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    case 'closed':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// 获取订单状态文本
export function getOrderStatusText(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return '待处理';
    case 'holding':
      return '持有中';
    case 'settled':
      return '已结算';
    case 'completed':
      return '已完成';
    case 'cancelled':
      return '已取消';
    case 'open':
      return '开仓';
    case 'closed':
      return '平仓';
    default:
      return status;
  }
}
