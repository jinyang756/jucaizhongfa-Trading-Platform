import { createClient } from '@supabase/supabase-js';

// 使用 Vite 的标准方式从环境变量中安全地读取 Supabase 配置
// 这要求在 Vercel 或本地的 .env 文件中定义 VITE_SUPABASE_URL 和 VITE_SUPABASE_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 创建并导出 Supabase 客户端
// 如果 URL 或 Key 未定义，这里会抛出错误，这是一种快速失败的好习惯
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
