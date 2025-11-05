import { format } from 'date-fns';

// 生成随机数的工具函数
export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 格式化金额
export function formatCurrency(amount: number, currency: string = 'CNY'): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// 格式化百分比
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

// 格式化日期
export function formatDate(date: string | Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
}

// 生成订单号
export function generateOrderNo(prefix: string): string {
  const timestamp = Date.now();
  const random = getRandomInt(1000, 9999);
  return `${prefix}${timestamp}${random}`;
}

// 计算收益率
export function calculateYieldRate(principal: number, profit: number): number {
  if (principal === 0) return 0;
  return profit / principal;
}

// 验证用户名格式
export function validateUsername(username: string): boolean {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
}

// 验证密码强度
export function validatePassword(password: string): boolean {
  // 至少8位，包含字母和数字
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
}

// 获取风险等级颜色
export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'mid':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// 获取风险等级文本
export function getRiskLevelText(riskLevel: string): string {
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
export function getOrderStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'holding':
      return 'text-blue-600 bg-blue-100';
    case 'settled':
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    case 'open':
      return 'text-blue-600 bg-blue-100';
    case 'closed':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

// 获取订单状态文本
export function getOrderStatusText(status: string): string {
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

// 深拷贝对象
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 防抖函数
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
