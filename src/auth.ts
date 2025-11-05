// 认证相关类型定义

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserPermissions {
  fund: boolean;
  option: boolean;
  contract: boolean;
  shContract: boolean;
  hkContract: boolean;
}

export interface UserLimits {
  singleTradeMax: number;
  dailyTradeMax: number;
  minTradeAmount: number;
}

export interface AuthUser {
  id: number;
  username: string;
  userType: 'admin' | 'user';
  relatedAdmin?: string;
  currentBalance?: number;
  email?: string;
  permissions?: UserPermissions;
  limits?: UserLimits;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials, userType: 'admin' | 'user') => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  permissions?: UserPermissions;
  limits?: UserLimits;
}

export interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  message?: string;
}
