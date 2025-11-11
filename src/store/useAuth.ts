import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../utils/supabase'; // 导入 Supabase 客户端

export interface User {
  id: number;
  username: string;
  userType: 'admin' | 'user';
  currentBalance: number;
  email?: string;
  isEmailVerified?: boolean;
  permissions: {
    fund: boolean;
    option: boolean;
    contract: boolean;
    shContract: boolean;
    hkContract: boolean;
    block: boolean;
    ipo: boolean;
  };
  limits: {
    singleTradeMax: number;
    dailyTradeMax: number;
    minTradeAmount: number;
  };
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (
    credentials: { username: string; password: string; verificationCode?: string },
    userType: string,
  ) => Promise<{ success: boolean; message?: string; requiresEmailVerification?: boolean }>; // 改为异步函数
  logout: () => void;
  sendVerificationCode: (email: string) => { success: boolean; message?: string };
  verifyEmail: (code: string) => { success: boolean; message?: string };
}

// 模拟验证码存储
const verificationCodes = new Map<string, { code: string; expires: number }>();

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      sendVerificationCode: (email) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 5 * 60 * 1000;
        verificationCodes.set(email, { code, expires });
        console.log(`Verification code for ${email}: ${code}`);
        return { success: true, message: '验证码已发送至您的邮箱' };
      },
      
      verifyEmail: (code) => {
        const { user } = get();
        if (!user || !user.email) {
          return { success: false, message: '用户未登录或未绑定邮箱' };
        }
        const storedCode = verificationCodes.get(user.email);
        if (!storedCode || Date.now() > storedCode.expires || storedCode.code !== code) {
          if (storedCode && Date.now() > storedCode.expires) verificationCodes.delete(user.email);
          return { success: false, message: '验证码错误或已过期' };
        }
        verificationCodes.delete(user.email);
        const updatedUser = { ...user, isEmailVerified: true };
        set({ user: updatedUser });
        return { success: true, message: '邮箱验证成功' };
      },

      // 重写为异步的数据库登录逻辑
      login: async (credentials, userType) => {
        const { username, password } = credentials;

        try {
          // 在 'profiles' 表中查找匹配的用户名和用户类型
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .eq('user_type', userType)
            .single();

          if (error || !data) {
            console.error('Login error or user not found:', error);
            return { success: false, message: '用户名或密码错误' };
          }

          // **重要提示：在生产环境中，密码应该被哈希处理。**
          // **当前仅为演示目的进行明文比较。**
          if (data.password !== password) {
            return { success: false, message: '用户名或密码错误' };
          }

          // 登录成功，根据用户类型设置权限和限制
          const loggedInUser: User = {
            id: data.id,
            username: data.username,
            userType: data.user_type,
            currentBalance: data.current_balance || 0,
            email: data.email,
            isEmailVerified: data.is_email_verified,
            permissions: { // 权限可以从数据库读取，或根据 userType 设置
              fund: true,
              option: data.user_type === 'admin',
              contract: true,
              shContract: data.user_type === 'admin',
              hkContract: true,
              block: true,
              ipo: true,
            },
            limits: { // 限制也可以从数据库读取或根据 userType 设置
              singleTradeMax: data.user_type === 'admin' ? 50000 : 10000,
              dailyTradeMax: data.user_type === 'admin' ? 200000 : 50000,
              minTradeAmount: data.user_type === 'admin' ? 100 : 50,
            },
          };

          set({ user: loggedInUser, isLoggedIn: true });
          return { success: true };

        } catch (err) {
          console.error('An unexpected error occurred during login:', err);
          return { success: false, message: '登录时发生未知错误' };
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
        // 可选：在这里可以调用 supabase.auth.signOut() 如果你使用 Supabase 的认证
      },
    }),
    {
      name: 'quantumx-auth-storage', // 本地存储名称
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    },
  ),
);
