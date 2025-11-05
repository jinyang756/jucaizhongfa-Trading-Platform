import { supabase, supabaseEnabled } from '../utils/supabase';
import type { LoginCredentials, AuthUser, LoginResponse } from '../auth';
import bcrypt from 'bcryptjs';

export class AuthService {
  // 管理员登录
  static async loginAdmin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // 本地开发环境无Supabase时的临时登录（仅用于演示）
      if (!supabaseEnabled) {
        if (credentials.username === 'admin001' && credentials.password === 'jczf@2025') {
          const authUser: AuthUser = {
            id: 1,
            username: 'admin001',
            userType: 'admin',
          };
          localStorage.setItem('auth_user', JSON.stringify(authUser));
          localStorage.setItem('auth_token', `admin_${authUser.id}_${Date.now()}`);
          return { success: true, user: authUser };
        }
        return { success: false, message: '管理员账号不存在或密码错误（本地演示）' };
      }
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', credentials.username)
        .single();

      if (error || !admin) {
        return { success: false, message: '管理员账号不存在' };
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(credentials.password, admin.password_hash);
      if (!isValidPassword) {
        return { success: false, message: '密码错误' };
      }

      const authUser: AuthUser = {
        id: admin.id,
        username: admin.username,
        userType: 'admin',
      };

      // 保存登录状态到localStorage
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      localStorage.setItem('auth_token', `admin_${admin.id}_${Date.now()}`);

      return { success: true, user: authUser };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: '登录失败，请稍后重试' };
    }
  }

  // 用户登录
  static async loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // 本地开发环境无Supabase时的临时登录（仅用于演示）
      if (!supabaseEnabled) {
        if (credentials.username === 'testuser01' && credentials.password === '8a3k7z9x') {
          const authUser: AuthUser = {
            id: 1001,
            username: 'testuser01',
            userType: 'user',
            relatedAdmin: 'admin001',
            currentBalance: 10000,
            permissions: {
              fund: true,
              option: true,
              contract: true,
              shContract: true,
              hkContract: true,
            },
            limits: {
              singleTradeMax: 10000,
              dailyTradeMax: 50000,
              minTradeAmount: 100,
            },
          };
          localStorage.setItem('auth_user', JSON.stringify(authUser));
          localStorage.setItem('auth_token', `user_${authUser.id}_${Date.now()}`);
          return { success: true, user: authUser };
        }
        return { success: false, message: '用户账号不存在或密码错误（本地演示）' };
      }
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', credentials.username)
        .single();

      if (error || !user) {
        return { success: false, message: '用户账号不存在' };
      }

      // 检查用户状态
      if (user.status !== 'active') {
        return { success: false, message: '账号已被禁用，请联系管理员' };
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
      if (!isValidPassword) {
        return { success: false, message: '密码错误' };
      }

      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        userType: 'user',
        relatedAdmin: user.related_admin,
        currentBalance: parseFloat(user.current_balance),
        permissions: {
          fund: user.fund_permission,
          option: user.option_permission,
          contract: user.sh_contract_permission || user.hk_contract_permission,
          shContract: user.sh_contract_permission,
          hkContract: user.hk_contract_permission,
        },
        limits: {
          singleTradeMax: parseFloat(user.single_trade_max),
          dailyTradeMax: parseFloat(user.daily_trade_max),
          minTradeAmount: parseFloat(user.min_trade_amount),
        },
      };

      // 保存登录状态到localStorage
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      localStorage.setItem('auth_token', `user_${user.id}_${Date.now()}`);

      return { success: true, user: authUser };
    } catch (error) {
      console.error('User login error:', error);
      return { success: false, message: '登录失败，请稍后重试' };
    }
  }

  // 获取当前登录用户
  static getCurrentUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem('auth_user');
      const token = localStorage.getItem('auth_token');

      if (!userStr || !token) {
        return null;
      }

      return JSON.parse(userStr);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // 检查是否已登录
  static isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    const token = localStorage.getItem('auth_token');
    return !!(user && token);
  }

  // 登出
  static logout(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  // 更新用户余额（用于实时更新）
  static updateUserBalance(newBalance: number): void {
    const user = this.getCurrentUser();
    if (user && user.userType === 'user') {
      user.currentBalance = newBalance;
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  // 刷新用户信息
  static async refreshUserInfo(): Promise<AuthUser | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    // 当未启用 Supabase 时，直接返回当前用户信息，避免调用远程接口
    if (!supabaseEnabled) {
      return currentUser;
    }

    try {
      if (currentUser.userType === 'admin') {
        const { data: admin } = await supabase
          .from('admins')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (admin) {
          const updatedUser: AuthUser = {
            id: admin.id,
            username: admin.username,
            userType: 'admin',
          };
          localStorage.setItem('auth_user', JSON.stringify(updatedUser));
          return updatedUser;
        }
      } else {
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (user && user.status === 'active') {
          const updatedUser: AuthUser = {
            id: user.id,
            username: user.username,
            userType: 'user',
            relatedAdmin: user.related_admin,
            currentBalance: parseFloat(user.current_balance),
            permissions: {
              fund: user.fund_permission,
              option: user.option_permission,
              contract: user.sh_contract_permission || user.hk_contract_permission,
              shContract: user.sh_contract_permission,
              hkContract: user.hk_contract_permission,
            },
            limits: {
              singleTradeMax: parseFloat(user.single_trade_max),
              dailyTradeMax: parseFloat(user.daily_trade_max),
              minTradeAmount: parseFloat(user.min_trade_amount),
            },
          };
          localStorage.setItem('auth_user', JSON.stringify(updatedUser));
          return updatedUser;
        }
      }
    } catch (error) {
      console.error('Refresh user info error:', error);
    }

    return null;
  }
}
