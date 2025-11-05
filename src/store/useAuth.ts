import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  username: string;
  userType: 'admin' | 'user';
  currentBalance: number;
  email?: string; // 添加邮箱字段
  isEmailVerified?: boolean; // 添加邮箱验证状态
  permissions: {
    fund: boolean;
    option: boolean;
    contract: boolean;
    shContract: boolean;
    hkContract: boolean;
    block: boolean; // 大宗交易权限
    ipo: boolean; // 新股申购权限
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
  ) => { success: boolean; message?: string; requiresEmailVerification?: boolean };
  logout: () => void;
  sendVerificationCode: (email: string) => { success: boolean; message?: string };
  verifyEmail: (code: string) => { success: boolean; message?: string };
}

// 模拟验证码存储（生产环境中应使用服务器端存储）
const verificationCodes = new Map<string, { code: string; expires: number }>();

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      // 发送验证码
      sendVerificationCode: (email) => {
        // 生成6位数字验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        // 设置5分钟过期时间
        const expires = Date.now() + 5 * 60 * 1000;

        // 存储验证码
        verificationCodes.set(email, { code, expires });

        // 在生产环境中，这里应该发送邮件
        console.log(`Verification code for ${email}: ${code}`);

        return { success: true, message: '验证码已发送至您的邮箱' };
      },

      // 验证邮箱验证码
      verifyEmail: (code) => {
        const { user } = get();
        if (!user || !user.email) {
          return { success: false, message: '用户未登录或未绑定邮箱' };
        }

        const storedCode = verificationCodes.get(user.email);
        if (!storedCode) {
          return { success: false, message: '未找到验证码，请重新发送' };
        }

        if (Date.now() > storedCode.expires) {
          verificationCodes.delete(user.email);
          return { success: false, message: '验证码已过期，请重新发送' };
        }

        if (storedCode.code !== code) {
          return { success: false, message: '验证码错误' };
        }

        // 验证成功，更新用户状态
        verificationCodes.delete(user.email);
        set({
          user: {
            ...user,
            isEmailVerified: true,
          },
        });

        return { success: true, message: '邮箱验证成功' };
      },

      // 登录逻辑
      login: (credentials, userType) => {
        console.log('Attempting login with credentials:', credentials, 'and userType:', userType);
        const { username, password, verificationCode } = credentials;

        // 基金管理人账号
        const adminUsers = [
          { username: 'admin001', password: '123456', id: 1 },
          { username: 'admin002', password: '123456', id: 2 },
          { username: 'admin003', password: '123456', id: 3 },
        ];

        // 检查是否为基金管理人
        if (userType === 'admin') {
          const adminUser = adminUsers.find(
            (user) => user.username === username && user.password === password,
          );

          if (adminUser) {
            // 检查是否需要邮箱验证
            const userWithEmail = get().user;
            if (userWithEmail?.email && !userWithEmail.isEmailVerified) {
              // 如果用户已绑定邮箱但未验证，需要验证码
              if (!verificationCode) {
                return {
                  success: false,
                  message: '此账户已绑定邮箱，请输入验证码进行验证',
                  requiresEmailVerification: true,
                };
              }

              // 验证验证码
              const verifyResult = get().verifyEmail(verificationCode);
              if (!verifyResult.success) {
                return { success: false, message: verifyResult.message };
              }
            }

            // 登录成功
            set({
              user: {
                id: adminUser.id,
                username: adminUser.username,
                userType: 'admin',
                currentBalance: 100000.0,
                email: userWithEmail?.email, // 保留已绑定的邮箱
                isEmailVerified: userWithEmail?.isEmailVerified, // 保留验证状态
                permissions: {
                  fund: true,
                  option: true,
                  contract: true,
                  shContract: true,
                  hkContract: true,
                  block: true, // 大宗交易权限
                  ipo: true, // 新股申购权限
                },
                limits: {
                  singleTradeMax: 50000,
                  dailyTradeMax: 200000,
                  minTradeAmount: 100,
                },
              },
              isLoggedIn: true,
            });
            return { success: true };
          }
        } else if (userType === 'user' && username === 'testuser01' && password === '8a3k7z9x') {
          set({
            user: {
              id: 2,
              username: 'testuser01',
              userType: 'user',
              currentBalance: 50000.0,
              permissions: {
                fund: true,
                option: false,
                contract: true,
                shContract: false,
                hkContract: true,
                block: true, // 大宗交易权限
                ipo: true, // 新股申购权限
              },
              limits: {
                singleTradeMax: 10000,
                dailyTradeMax: 50000,
                minTradeAmount: 50,
              },
            },
            isLoggedIn: true,
          });
          return { success: true };
        }
        return { success: false, message: '用户名或密码错误' };
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'quantumx-auth-storage', // 本地存储名称
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    },
  ),
);
