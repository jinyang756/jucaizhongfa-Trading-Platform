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
import { format, addDays, subDays, eachDayOfInterval } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { getRandom, getRandomInt, generateOrderNo } from '../src/utils/helpers';

// 平台启动日期
const PLATFORM_START_DATE =
  process.env.VITE_PLATFORM_START_DATE ||
  (import.meta as any)?.env?.VITE_PLATFORM_START_DATE ||
  '2025-08-01';
const startDate = new Date(PLATFORM_START_DATE);
const endDate = subDays(new Date(), 1); // 昨天

// 服务端客户端（使用服务密钥优先）
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

// 补全历史数据
async function generateHistoricalData() {
  try {
    console.log('开始生成历史数据...');
    console.log(`时间范围: ${format(startDate, 'yyyy-MM-dd')} 至 ${format(endDate, 'yyyy-MM-dd')}`);

    // 获取所有用户
    const { data: users, error: usersError } = await client.from('users').select('id, username');

    if (usersError) {
      console.error('获取用户数据失败:', usersError);
      return;
    }

    // 获取所有基金
    const { data: funds, error: fundsError } = await client
      .from('funds')
      .select('id, fund_name, yield_rate');

    if (fundsError) {
      console.error('获取基金数据失败:', fundsError);
      return;
    }

    // 获取所有期权
    const { data: options, error: optionsError } = await client
      .from('options')
      .select('id, option_name, base_yield');

    if (optionsError) {
      console.error('获取期权数据失败:', optionsError);
      return;
    }

    // 获取所有合约
    const { data: contracts, error: contractsError } = await client
      .from('contracts')
      .select('id, contract_name');

    if (contractsError) {
      console.error('获取合约数据失败:', contractsError);
      return;
    }

    if (!users || !funds || !options || !contracts) {
      console.error('缺少基础数据，请先运行初始数据生成脚本');
      return;
    }

    console.log(
      `找到 ${users.length} 个用户, ${funds.length} 个基金, ${options.length} 个期权, ${contracts.length} 个合约`,
    );

    // 生成每日数据
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    console.log(`需要生成 ${days.length} 天的历史数据`);

    let totalOrders = 0;
    let totalNotifications = 0;

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const day = days[dayIndex];
      const dateStr = format(day, 'yyyy-MM-dd');

      if (dayIndex % 10 === 0) {
        console.log(`正在生成 ${dateStr} 的数据... (${dayIndex + 1}/${days.length})`);
      }

      // 为每个用户生成随机交易数据
      for (const user of users) {
        // 50%概率进行基金投资
        if (Math.random() > 0.5) {
          const randomFund = funds[getRandomInt(0, funds.length - 1)];
          const investAmount = getRandom(1000, 5000);
          const yieldRate = randomFund.yield_rate / 100;
          const holdingDays = getRandomInt(30, 180);
          const settleDate = addDays(new Date(day), holdingDays);

          // 生成基金订单
          const { error: fundOrderError } = await client.from('fund_orders').insert({
            order_no: generateOrderNo('F'),
            user_id: user.id,
            fund_id: randomFund.id,
            invest_amount: investAmount,
            yield_amount: investAmount * yieldRate * (holdingDays / 365),
            order_status: 'settled',
            invest_time: new Date(day).toISOString(),
            settle_time: settleDate.toISOString(),
          });

          if (!fundOrderError) {
            totalOrders++;
          }

          // 生成资金流水记录
          await client.from('fund_logs').insert({
            user_id: user.id,
            admin_username: 'admin001',
            amount: investAmount,
            operate_type: 'invest',
            remark: `投资基金: ${randomFund.fund_name}`,
            operate_time: new Date(day).toISOString(),
          });
        }

        // 30%概率进行期权交易
        if (Math.random() > 0.7) {
          const randomOption = options[getRandomInt(0, options.length - 1)];
          const investAmount = getRandom(100, 1000);
          const isWin = Math.random() > 0.45; // 55%胜率
          const endTime = addDays(new Date(day), 1);

          const { error: optionOrderError } = await client.from('option_orders').insert({
            order_no: generateOrderNo('O'),
            user_id: user.id,
            option_id: randomOption.id,
            predict: Math.random() > 0.5 ? 'up' : 'down',
            invest_amount: investAmount,
            profit_status: isWin ? 'win' : 'lose',
            profit_amount: isWin ? investAmount * (randomOption.base_yield / 100) : -investAmount,
            start_time: new Date(day).toISOString(),
            end_time: endTime.toISOString(),
          });

          if (!optionOrderError) {
            totalOrders++;
          }
        }

        // 20%概率进行合约交易
        if (Math.random() > 0.8) {
          const randomContract = contracts[getRandomInt(0, contracts.length - 1)];
          const isProfit = Math.random() > 0.4; // 60%盈利概率
          const lever = getRandomInt(1, 20);
          const orderAmount = getRandomInt(1, 10);
          const orderPrice = getRandom(30000, 40000);
          const marginAmount = (orderPrice * orderAmount) / lever;
          const closeTime = addDays(new Date(day), getRandomInt(1, 7));

          const { error: contractOrderError } = await client.from('contract_orders').insert({
            order_no: generateOrderNo('C'),
            user_id: user.id,
            contract_id: randomContract.id,
            order_type: Math.random() > 0.5 ? 'market' : 'limit',
            direction: Math.random() > 0.5 ? 'buy' : 'sell',
            lever: lever,
            order_price: orderPrice,
            order_amount: orderAmount,
            margin_amount: marginAmount,
            order_status: 'closed',
            open_time: new Date(day).toISOString(),
            close_time: closeTime.toISOString(),
            profit_amount: isProfit ? getRandom(100, 2000) : -getRandom(100, 1500),
          });

          if (!contractOrderError) {
            totalOrders++;
          }
        }

        // 40%概率生成系统通知
        if (Math.random() > 0.6) {
          const notifications = [
            '您的投资收益已到账，请查收',
            '市场波动提醒：请注意风险控制',
            '新产品上线通知',
            '系统维护通知',
            '重要公告：平台政策更新',
          ];

          const randomNotification = notifications[getRandomInt(0, notifications.length - 1)];

          const { error: notificationError } = await client.from('notifications').insert({
            user_id: user.id,
            title: '系统通知',
            content: `${randomNotification} - ${dateStr}`,
            create_time: new Date(day).toISOString(),
          });

          if (!notificationError) {
            totalNotifications++;
          }
        }

        // 随机更新用户余额
        if (Math.random() > 0.8) {
          const newBalance = getRandom(5000, 50000);
          await supabase.from('users').update({ current_balance: newBalance }).eq('id', user.id);
        }
      }
    }

    console.log('✅ 历史数据生成完成！');
    console.log(`📊 数据统计:`);
    console.log(`  - 生成订单数量: ${totalOrders}`);
    console.log(`  - 生成通知数量: ${totalNotifications}`);
    console.log(`  - 覆盖天数: ${days.length} 天`);
  } catch (error) {
    console.error('❌ 历史数据生成失败:', error);
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  generateHistoricalData();
}

export { generateHistoricalData };
