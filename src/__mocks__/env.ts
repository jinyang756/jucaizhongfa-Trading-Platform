// 模拟 import.meta.env 对象
const mockEnv = {
  VITE_API_URL: 'http://localhost:3000',
  VITE_APP_NAME: '聚财众发',
  VITE_APP_VERSION: '1.0.0',
  DEV: true,
  PROD: false,
  VITE_SUPABASE_URL: 'https://test.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'test-anon-key',
  VITE_DEBUG: 'false',
};

// 由于我们不能直接模拟 import.meta，我们将导出一个配置对象
export const config = {
  apiUrl: mockEnv.VITE_API_URL,
  appName: mockEnv.VITE_APP_NAME || '聚财众发',
  version: mockEnv.VITE_APP_VERSION || '1.0.0',
  isDev: mockEnv.DEV,
  isProd: mockEnv.PROD,
  supabase: {
    url: mockEnv.VITE_SUPABASE_URL,
    anonKey: mockEnv.VITE_SUPABASE_ANON_KEY,
  },
  debug: mockEnv.VITE_DEBUG === 'true',
} as const;
