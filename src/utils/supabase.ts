import { createClient } from '@supabase/supabase-js';
import { config } from './env';

// 从环境变量获取Supabase配置
const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

const isValidHttpUrl = (url?: string) => {
  return !!url && /^https?:\/\//i.test(url);
};

export const supabaseEnabled = Boolean(isValidHttpUrl(supabaseUrl) && supabaseAnonKey);

// 创建Supabase客户端
export const supabase = supabaseEnabled
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (undefined as unknown as ReturnType<typeof createClient>);

// 数据库表类型定义
export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  related_admin: string;
  current_balance: number;
  status: string;
  fund_permission: boolean;
  option_permission: boolean;
  sh_contract_permission: boolean;
  hk_contract_permission: boolean;
  single_trade_max: number;
  daily_trade_max: number;
  created_at: string;
}

export interface Fund {
  id: number;
  fund_name: string;
  risk_level: string;
  yield_rate: number;
  fund_scale: number;
  investment_cycle: string;
  description: string;
  status: string;
  create_admin: string;
  created_at: string;
}

export interface Option {
  id: number;
  option_name: string;
  cycle: number;
  base_yield: number;
  min_invest: number;
  status: string;
  created_at: string;
}

export interface Contract {
  id: number;
  contract_name: string;
  market_type: string;
  currency_type: string;
  lever_min: number;
  lever_max: number;
  margin_ratio: number;
  status: string;
  created_at: string;
}

export interface FundOrder {
  id: number;
  order_no: string;
  user_id: number;
  fund_id: number;
  fund_code: string;
  order_type: string;
  amount: number;
  shares: number;
  nav: number;
  profit_amount: number;
  order_status: string;
  created_at: string;
  settle_time?: string;
}

export interface OptionOrder {
  id: number;
  order_no: string;
  user_id: number;
  option_id: number;
  predict: string;
  invest_amount: number;
  profit_status: string;
  profit_amount: number;
  start_time: string;
  end_time?: string;
}

export interface ContractOrder {
  id: number;
  order_no: string;
  user_id: number;
  contract_id: number;
  order_type: string;
  direction: string;
  lever: number;
  order_price: number;
  order_amount: number;
  margin_amount: number;
  stop_loss?: number;
  take_profit?: number;
  order_status: string;
  open_time: string;
  close_time?: string;
  profit_amount: number;
}

export interface FundLog {
  id: number;
  user_id: number;
  admin_username: string;
  amount: number;
  operate_type: string;
  remark: string;
  operate_time: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_read: boolean;
  create_time: string;
}
