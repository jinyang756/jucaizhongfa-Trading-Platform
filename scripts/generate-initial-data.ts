// 使用服务端Supabase客户端，避免依赖前端环境变量
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function loadEnv(envPath = path.resolve(process.cwd(), '.env')) {
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) {
        const key = m[1];
        let value = m[2];
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  }
}

loadEnv();
import { hash } from 'bcryptjs';

// 管理员账户数据
const adminUsers = [
  { username: 'admin001', password: 'jczf@2025' },
  { username: 'admin002', password: 'jczf@2025' },
  { username: 'admin003', password: 'jczf@2025' },
  { username: 'admin004', password: 'jczf@2025' },
  { username: 'admin005', password: 'jczf@2025' },
];

// 测试用户数据
const testUsers = [
  { username: 'testuser01', password: '8a3k7z9x', relatedAdmin: 'admin001' },
  { username: 'testuser02', password: '9b4l8a0y', relatedAdmin: 'admin001' },
  { username: 'testuser03', password: '7c5m9b1z', relatedAdmin: 'admin002' },
];

// 基金产品数据
const fundProducts = [
  {
    name: '聚财成长1号',
    risk: 'mid',
    yield: 8.5,
    scale: 5000000000,
    cycle: '1年',
    desc: '稳健型成长基金，专注于优质成长股投资',
  },
  {
    name: '聚财稳健2号',
    risk: 'low',
    yield: 4.2,
    scale: 8000000000,
    cycle: '6个月',
    desc: '低风险稳健基金，主要投资债券和货币市场工具',
  },
  {
    name: '聚财进取3号',
    risk: 'high',
    yield: 12.8,
    scale: 3000000000,
    cycle: '2年',
    desc: '高收益进取基金，投资于高成长性科技股',
  },
  {
    name: '聚财价值4号',
    risk: 'mid',
    yield: 6.8,
    scale: 4500000000,
    cycle: '18个月',
    desc: '价值投资基金，专注于被低估的优质企业',
  },
  {
    name: '聚财创新5号',
    risk: 'high',
    yield: 15.2,
    scale: 2000000000,
    cycle: '3年',
    desc: '创新主题基金，投资于新兴产业和创新企业',
  },
];

// 期权产品数据
const optionProducts = [
  { name: '1分钟涨跌期权', cycle: 1, yield: 75, minInvest: 100 },
  { name: '5分钟涨跌期权', cycle: 5, yield: 78, minInvest: 100 },
  { name: '10分钟涨跌期权', cycle: 10, yield: 80, minInvest: 100 },
  { name: '30分钟涨跌期权', cycle: 30, yield: 82, minInvest: 200 },
  { name: '1小时涨跌期权', cycle: 60, yield: 85, minInvest: 500 },
];

// 合约产品数据
const contractProducts = [
  {
    name: '上海原油合约',
    market: 'shanghai',
    currency: 'CNY',
    leverMin: 1,
    leverMax: 20,
    margin: 5.0,
  },
  {
    name: '香港恒生合约',
    market: 'hongkong',
    currency: 'HKD',
    leverMin: 1,
    leverMax: 20,
    margin: 5.0,
  },
  {
    name: '上海黄金合约',
    market: 'shanghai',
    currency: 'CNY',
    leverMin: 1,
    leverMax: 15,
    margin: 8.0,
  },
  {
    name: '香港科技合约',
    market: 'hongkong',
    currency: 'HKD',
    leverMin: 1,
    leverMax: 10,
    margin: 10.0,
  },
];

// 使用服务密钥创建服务端客户端（优先使用服务密钥）
const adminUrl = (process.env.VITE_SUPABASE_URL || (import.meta as any)?.env?.VITE_SUPABASE_URL) as
  | string
  | undefined;
const adminKey = (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as any)?.env?.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY) as string | undefined;
if (!adminUrl || !adminKey) {
  throw new Error(
    '缺少Supabase连接配置：请在 .env 中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_SERVICE_ROLE_KEY',
  );
}
const client = createClient(adminUrl, adminKey);

async function generateInitialData() {
  try {
    console.log('开始生成初始数据...');

    // 1. 创建管理员账户
    console.log('创建管理员账户...');
    for (const admin of adminUsers) {
      const passwordHash = await hash(admin.password, 10);
      const { error } = await client.from('admins').insert({
        username: admin.username,
        password_hash: passwordHash,
      });

      if (error && !error.message.includes('duplicate key')) {
        console.error(`创建管理员 ${admin.username} 失败:`, error);
      } else {
        console.log(`✓ 管理员 ${admin.username} 创建成功`);
      }
    }

    // 2. 创建测试用户
    console.log('创建测试用户...');
    for (const user of testUsers) {
      const passwordHash = await hash(user.password, 10);
      const { error } = await client.from('users').insert({
        username: user.username,
        password_hash: passwordHash,
        related_admin: user.relatedAdmin,
        current_balance: 10000, // 初始余额10000元
      });

      if (error && !error.message.includes('duplicate key')) {
        console.error(`创建用户 ${user.username} 失败:`, error);
      } else {
        console.log(`✓ 用户 ${user.username} 创建成功`);
      }
    }

    // 3. 创建基金产品
    console.log('创建基金产品...');
    for (const fund of fundProducts) {
      const baseInsert = {
        fund_name: fund.name,
        risk_level: fund.risk,
        yield_rate: fund.yield,
        fund_scale: fund.scale,
        investment_cycle: fund.cycle,
        description: fund.desc,
        create_admin: 'admin001',
      };

      let { error } = await client.from('funds').insert(baseInsert);

      if (error && !error.message.includes('duplicate key')) {
        // 如果因 fund_code 非空约束失败，则补充一个随机基金代码重试
        if ((error as any).code === '23502' && (error as any).message?.includes('fund_code')) {
          const fundCode = `F${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
          const { error: retryError } = await client
            .from('funds')
            .insert({ ...baseInsert, fund_code: fundCode });
          if (retryError && !retryError.message.includes('duplicate key')) {
            console.error(`创建基金 ${fund.name} 失败:`, retryError);
          } else {
            console.log(`✓ 基金 ${fund.name} 创建成功（含基金代码）`);
          }
        } else {
          console.error(`创建基金 ${fund.name} 失败:`, error);
        }
      } else {
        console.log(`✓ 基金 ${fund.name} 创建成功`);
      }
    }

    // 4. 创建期权产品
    console.log('创建期权产品...');
    for (const option of optionProducts) {
      const { error } = await client.from('options').insert({
        option_name: option.name,
        cycle: option.cycle,
        base_yield: option.yield,
        min_invest: option.minInvest,
      });

      if (error && !error.message.includes('duplicate key')) {
        console.error(`创建期权 ${option.name} 失败:`, error);
      } else {
        console.log(`✓ 期权 ${option.name} 创建成功`);
      }
    }

    // 5. 创建合约产品
    console.log('创建合约产品...');
    for (const contract of contractProducts) {
      const { error } = await client.from('contracts').insert({
        contract_name: contract.name,
        market_type: contract.market,
        currency_type: contract.currency,
        lever_min: contract.leverMin,
        lever_max: contract.leverMax,
        margin_ratio: contract.margin,
      });

      if (error && !error.message.includes('duplicate key')) {
        console.error(`创建合约 ${contract.name} 失败:`, error);
      } else {
        console.log(`✓ 合约 ${contract.name} 创建成功`);
      }
    }

    console.log('✅ 初始数据生成完成！');
    console.log('\n📋 账户信息汇总:');
    console.log('管理员账户:');
    adminUsers.forEach((admin) => {
      console.log(`  - 用户名: ${admin.username}, 密码: ${admin.password}`);
    });
    console.log('\n测试用户账户:');
    testUsers.forEach((user) => {
      console.log(`  - 用户名: ${user.username}, 密码: ${user.password}`);
    });
  } catch (error) {
    console.error('❌ 数据生成失败:', error);
  }
}

// 如果直接运行此脚本
// 直接执行（tsx运行时可能路径格式不同，直接调用）
generateInitialData();

export { generateInitialData };
