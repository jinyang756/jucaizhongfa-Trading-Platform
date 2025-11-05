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
            user: { name: '专业投资者张三', id: 'QXP-168888', level: 'VIP Gold' }, 
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