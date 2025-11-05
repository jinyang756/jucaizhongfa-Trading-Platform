import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      // 模拟登录逻辑
      login: (username, password) => {
        if (username === 'admin' && password === '123456') {
          set({ 
            user: { 
              id: 1, 
              username: 'admin', 
              userType: 'admin',
              currentBalance: 100000.00,
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
              }
            }, 
            isLoggedIn: true 
          });
          return true;
        }
        return false;
      },
      
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'quantumx-auth-storage', // 本地存储名称
    }
  )
);