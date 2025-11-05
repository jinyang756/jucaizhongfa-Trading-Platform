// 模拟基金产品数据
export const mockFundProducts = [
  {
    id: 1,
    fund_code: 'F0001',
    fund_name: '稳健增长基金',
    fund_type: '混合型',
    risk_level: '中等',
    min_amount: 1000,
  },
  {
    id: 2,
    fund_code: 'F0002',
    fund_name: '科技创新基金',
    fund_type: '股票型',
    risk_level: '高',
    min_amount: 5000,
  },
  {
    id: 3,
    fund_code: 'F0003',
    fund_name: '货币市场基金',
    fund_type: '货币型',
    risk_level: '低',
    min_amount: 100,
  },
];

// 模拟合约产品数据
export const mockContractProducts = [
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
];

// 模拟期权产品数据
export const mockOptionProducts = [
  {
    id: 1,
    option_code: 'OP0001',
    option_name: '上证50看涨期权',
    underlying_asset: '上证50',
    option_type: 'call',
    strike_price: 3000,
    expiry_date: '2024-12-31',
    min_amount: 100,
  },
  {
    id: 2,
    option_code: 'OP0002',
    option_name: '沪深300看跌期权',
    underlying_asset: '沪深300',
    option_type: 'put',
    strike_price: 4000,
    expiry_date: '2024-12-31',
    min_amount: 100,
  },
];

// 模拟大宗交易产品数据
export const mockBlockTradingProducts = [
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
];

// 模拟IPO产品数据
export const mockIPOProducts = [
  {
    id: 1,
    ipo_code: 'IPO001',
    company_name: '科技创新股份有限公司',
    market: 'SH',
    issue_price: 15.8,
    min_subscription: 5000,
    max_subscription: 100000,
    subscription_start: '2024-12-01T00:00:00Z',
    subscription_end: '2024-12-10T23:59:59Z',
    listing_date: '2024-12-15',
  },
  {
    id: 2,
    ipo_code: 'IPO002',
    company_name: '绿色能源股份有限公司',
    market: 'SH',
    issue_price: 8.5,
    min_subscription: 3000,
    max_subscription: 50000,
    subscription_start: '2024-12-05T00:00:00Z',
    subscription_end: '2024-12-15T23:59:59Z',
    listing_date: '2024-12-20',
  },
];
