// 简单执行数据库schema到远程Supabase Postgres
// 依赖：pg
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

function loadEnv(envPath = path.resolve(process.cwd(), '.env')) {
  const env = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) {
        const key = m[1];
        let value = m[2];
        // 去掉可能的引号
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        env[key] = value;
        process.env[key] = value;
      }
    }
  }
  return env;
}

async function main() {
  // 忽略自签名证书
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  loadEnv();
  const sqlPath = path.resolve(process.cwd(), 'scripts', 'database-schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('未找到数据库schema文件:', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf-8');

  const databaseUrl =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!databaseUrl) {
    console.error(
      '缺少数据库连接字符串，请在 .env 中配置 POSTGRES_URL_NON_POOLING 或 POSTGRES_URL',
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('连接到数据库...');
    await client.connect();
    console.log('执行兼容性修复...');
    await client.query(
      `ALTER TABLE IF EXISTS fund_logs ADD COLUMN IF NOT EXISTS operate_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
    );
    await client.query(
      `ALTER TABLE IF EXISTS notifications ADD COLUMN IF NOT EXISTS create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
    );
    console.log('执行schema SQL...');
    await client.query(sql);
    console.log('✅ 数据库表结构创建完成');
  } catch (err) {
    console.error('❌ 执行失败:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
