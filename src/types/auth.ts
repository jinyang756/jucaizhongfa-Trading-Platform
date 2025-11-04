// 认证相关类型定义

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  userType: 'admin' | 'user';
  relatedAdmin?: string;
  currentBalance?: number;
  permissions?: UserPermissions;
}

export interface UserPermissions {
  fundPermission: boolean;
  optionPermission: boolean;
  shContractPermission: boolean;
  hkContractPermission: boolean;
  singleTradeMax: number;
  dailyTradeMax: number;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials, userType: 'admin' | 'user') => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  message?: string;
}
