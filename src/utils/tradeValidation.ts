import type { AuthUser } from '../auth';
import type { FundOrder, OptionOrder, ContractOrder } from './supabase';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// 统一的权限校验函数
export const validateUserPermissions = (
  user: AuthUser | null,
  permissionType: 'fund' | 'option' | 'shContract' | 'hkContract',
): ValidationResult => {
  if (!user || !user.permissions) {
    return { isValid: false, message: '用户未登录或权限信息缺失' };
  }

  switch (permissionType) {
    case 'fund':
      if (!user.permissions.fund) {
        return { isValid: false, message: '您还未开通基金交易权限' };
      }
      break;
    case 'option':
      if (!user.permissions.option) {
        return { isValid: false, message: '您还未开通期权交易权限' };
      }
      break;
    case 'shContract':
      if (!user.permissions.contract) {
        return { isValid: false, message: '您还未开通沪深合约交易权限' };
      }
      break;
    case 'hkContract':
      if (!user.permissions.contract) {
        return { isValid: false, message: '您还未开通港股合约交易权限' };
      }
      break;
    default:
      return { isValid: false, message: '未知权限类型' };
  }
  return { isValid: true, message: '' };
};

// 统一的交易限额校验函数
export const validateTradeLimits = (
  user: AuthUser | null,
  amount: number, // 对于基金和期权是投资金额，对于合约是保证金
  todayOrders: (FundOrder | OptionOrder | ContractOrder)[],
  tradeType: 'fund' | 'option' | 'contract',
): ValidationResult => {
  if (!user || !user.limits) {
    return { isValid: false, message: '用户未登录或限额信息缺失' };
  }

  // 检查单笔交易限额
  if (amount > user.limits.singleTradeMax) {
    return {
      isValid: false,
      message: `投资金额超过单笔限额 ¥${user.limits.singleTradeMax.toLocaleString()}`,
    };
  }

  // 检查今日交易总额
  const todayTotal = todayOrders.reduce((sum, order) => {
    if (tradeType === 'fund' && 'amount' in order) {
      return sum + order.amount;
    }
    if (tradeType === 'option' && 'invest_amount' in order) {
      return sum + order.invest_amount;
    }
    if (tradeType === 'contract' && 'margin_amount' in order) {
      return sum + order.margin_amount;
    }
    return sum;
  }, 0);

  if (todayTotal + amount > user.limits.dailyTradeMax) {
    return {
      isValid: false,
      message: `今日交易总额将超过限额 ¥${user.limits.dailyTradeMax.toLocaleString()}`,
    };
  }

  return { isValid: true, message: '' };
};

// 针对合约交易的特定校验
export const validateContractSpecifics = (
  lever: number,
  minLever: number | undefined,
  maxLever: number | undefined,
): ValidationResult => {
  if (minLever && lever < minLever) {
    return { isValid: false, message: `杠杆倍数不能小于 ${minLever}` };
  }
  if (maxLever && lever > maxLever) {
    return { isValid: false, message: `杠杆倍数不能大于 ${maxLever}` };
  }
  return { isValid: true, message: '' };
};
