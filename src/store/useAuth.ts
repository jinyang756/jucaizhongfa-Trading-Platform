import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginCredentials } from '../types';

interface User {
  id: number;
  username: string;
  email: string;
  isEmailVerified: boolean;
  userType: 'admin' | 'user';
  currentBalance: number;
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
    credentials: LoginCredentials,
    userType: 'admin' | 'user',
  ) => { success: boolean; message?: string; requiresEmailVerification?: boolean };
  logout: () => void;
  sendVerificationCode: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyEmail: (code: string) => Promise<{ success: boolean; message: string }>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (credentials, userType) => {
        console.log('Attempting login with credentials:', credentials, 'and userType:', userType);
        const { username, password } = credentials;
        if (userType === 'admin' && username === 'admin001' && password === 'jczf@2025') {
          set({
            user: {
              id: 1,
              username: 'admin001',
              userType: 'admin',
              email: 'admin@example.com',
              isEmailVerified: true,
              currentBalance: 100000.0,
              permissions: {
                fund: true,
                option: true,
                contract: true,
                shContract: true,
                hkContract: true,
                block: true,
                ipo: true,
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
        } else if (userType === 'user' && username === 'testuser01' && password === '8a3k7z9x') {
          set({
            user: {
              id: 2,
              username: 'testuser01',
              userType: 'user',
              email: 'testuser@example.com',
              isEmailVerified: false,
              currentBalance: 50000.0,
              permissions: {
                fund: true,
                option: false,
                contract: true,
                shContract: false,
                hkContract: true,
                block: false,
                ipo: false,
              },
              limits: {
                singleTradeMax: 10000,
                dailyTradeMax: 50000,
                minTradeAmount: 50,
              },
            },
            isLoggedIn: true,
          });
          return { success: true, requiresEmailVerification: true };
        }
        return { success: false, message: '用户名或密码错误' };
      },
      logout: () => set({ user: null, isLoggedIn: false }),
      sendVerificationCode: async (email: string) => {
        console.log(`Sending verification code to ${email}`);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true, message: '验证码已发送' };
      },
      verifyEmail: async (code: string) => {
        console.log(`Verifying email with code ${code}`);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (code === '123456') {
          const user = get().user;
          if (user) {
            set({ user: { ...user, isEmailVerified: true } });
          }
          return { success: true, message: '邮箱验证成功' };
        }
        return { success: false, message: '验证码错误' };
      },
    }),
    {
      name: 'quantumx-auth-storage',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    },
  ),
);
