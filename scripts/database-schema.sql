-- 聚财众发基金交易平台数据库表结构
-- 请在Supabase SQL编辑器中执行以下SQL语句

-- 基金管理人表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  is_email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 会员表
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  related_admin TEXT NOT NULL,
  current_balance DECIMAL(16,2) DEFAULT 0.00,
  status TEXT DEFAULT 'active',
  fund_permission BOOLEAN DEFAULT true,
  option_permission BOOLEAN DEFAULT true,
  sh_contract_permission BOOLEAN DEFAULT true,
  hk_contract_permission BOOLEAN DEFAULT true,
  single_trade_max DECIMAL(16,2) DEFAULT 10000.00,
  daily_trade_max DECIMAL(16,2) DEFAULT 50000.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 资金变动日志表
CREATE TABLE IF NOT EXISTS fund_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  admin_username TEXT NOT NULL,
  amount DECIMAL(16,2) NOT NULL,
  operate_type TEXT NOT NULL,
  remark TEXT DEFAULT '',
  operate_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 基金产品表
CREATE TABLE IF NOT EXISTS funds (
  id SERIAL PRIMARY KEY,
  fund_name TEXT UNIQUE NOT NULL,
  risk_level TEXT NOT NULL,
  yield_rate DECIMAL(8,2) NOT NULL,
  fund_scale DECIMAL(18,2) NOT NULL,
  investment_cycle TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'online',
  create_admin TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 二元期权产品表
CREATE TABLE IF NOT EXISTS options (
  id SERIAL PRIMARY KEY,
  option_name TEXT UNIQUE NOT NULL,
  cycle INTEGER NOT NULL,
  base_yield DECIMAL(8,2) NOT NULL,
  min_invest DECIMAL(16,2) DEFAULT 100.00,
  status TEXT DEFAULT 'online',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 合约产品表
CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,
  contract_name TEXT UNIQUE NOT NULL,
  market_type TEXT NOT NULL,
  currency_type TEXT NOT NULL,
  lever_min INTEGER DEFAULT 1,
  lever_max INTEGER DEFAULT 20,
  margin_ratio DECIMAL(8,2) NOT NULL,
  status TEXT DEFAULT 'online',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 基金交易订单表
CREATE TABLE IF NOT EXISTS fund_orders (
  id SERIAL PRIMARY KEY,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  fund_id INTEGER NOT NULL,
  invest_amount DECIMAL(16,2) NOT NULL,
  yield_amount DECIMAL(16,2) DEFAULT 0.00,
  order_status TEXT DEFAULT 'holding',
  invest_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  settle_time TIMESTAMP
);

-- 期权交易订单表
CREATE TABLE IF NOT EXISTS option_orders (
  id SERIAL PRIMARY KEY,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  option_id INTEGER NOT NULL,
  predict TEXT NOT NULL,
  invest_amount DECIMAL(16,2) NOT NULL,
  profit_status TEXT DEFAULT 'pending',
  profit_amount DECIMAL(16,2) DEFAULT 0.00,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP
);

-- 合约交易订单表
CREATE TABLE IF NOT EXISTS contract_orders (
  id SERIAL PRIMARY KEY,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  contract_id INTEGER NOT NULL,
  order_type TEXT NOT NULL,
  direction TEXT NOT NULL,
  lever INTEGER NOT NULL,
  order_price DECIMAL(16,4) NOT NULL,
  order_amount INTEGER NOT NULL,
  margin_amount DECIMAL(16,2) NOT NULL,
  stop_loss DECIMAL(16,4),
  take_profit DECIMAL(16,4),
  order_status TEXT DEFAULT 'open',
  open_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  close_time TIMESTAMP,
  profit_amount DECIMAL(16,2) DEFAULT 0.00
);

-- 系统通知表
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 基金管理人会员管理表（用于跟踪基金管理人创建的会员）
CREATE TABLE IF NOT EXISTS admin_managed_users (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(admin_id, user_id)
);

-- 邮箱验证码表（用于生产环境）
CREATE TABLE IF NOT EXISTS email_verification_codes (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_related_admin ON users(related_admin);
CREATE INDEX IF NOT EXISTS idx_fund_logs_user_id ON fund_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_fund_logs_operate_time ON fund_logs(operate_time);
CREATE INDEX IF NOT EXISTS idx_fund_orders_user_id ON fund_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_fund_orders_fund_id ON fund_orders(fund_id);
CREATE INDEX IF NOT EXISTS idx_option_orders_user_id ON option_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_option_orders_option_id ON option_orders(option_id);
CREATE INDEX IF NOT EXISTS idx_contract_orders_user_id ON contract_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_contract_orders_contract_id ON contract_orders(contract_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_create_time ON notifications(create_time);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admin_managed_users_admin_id ON admin_managed_users(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_managed_users_user_id ON admin_managed_users(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_codes_email ON email_verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_email_verification_codes_expires ON email_verification_codes(expires_at);

-- 插入基金管理人账号数据
INSERT INTO admins (username, password_hash) VALUES 
  ('admin001', '$2a$10$example_hash_001'),
  ('admin002', '$2a$10$example_hash_002'),
  ('admin003', '$2a$10$example_hash_003')
ON CONFLICT (username) DO NOTHING;

-- 插入一些示例数据（可选）
-- 注意：实际使用时建议通过数据生成脚本来创建数据

COMMENT ON TABLE admins IS '基金管理人账户表';
COMMENT ON TABLE users IS '会员账户表';
COMMENT ON TABLE fund_logs IS '资金变动日志表';
COMMENT ON TABLE funds IS '基金产品表';
COMMENT ON TABLE options IS '二元期权产品表';
COMMENT ON TABLE contracts IS '合约产品表';
COMMENT ON TABLE fund_orders IS '基金交易订单表';
COMMENT ON TABLE option_orders IS '期权交易订单表';
COMMENT ON TABLE contract_orders IS '合约交易订单表';
COMMENT ON TABLE notifications IS '系统通知表';
COMMENT ON TABLE admin_managed_users IS '基金管理人会员管理表';
COMMENT ON TABLE email_verification_codes IS '邮箱验证码表';