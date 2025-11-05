import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  username: string;
  userType: 'admin' | 'user';
  currentBalance: number;
  permissions: {
    fund: boolean;
    option: boolean;
    contract: boolean;
    shContract: boolean;
    hkContract: boolean;
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
    credentials: { username: string; password: string },
    userType: string,
  ) => { success: boolean; message?: string };
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // 模拟登录逻辑
      login: (credentials, userType) => {
        console.log('Attempting login with credentials:', credentials, 'and userType:', userType);
        const { username, password } = credentials;
        if (userType === 'admin' && username === 'admin001' && password === 'jczf@2025') {
          set({
            user: {
              id: 1,
              username: 'admin001',
              userType: 'admin',
              currentBalance: 100000.0,
              permissions: {
                fund: true,
                option: true,
                contract: true,
                shContract: true,
                hkContract: true,
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
              currentBalance: 50000.0,
              permissions: {
                fund: true,
                option: false,
                contract: true,
                shContract: false,
                hkContract: true,
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
