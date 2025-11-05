import { AuthUser, UserPermissions, UserLimits } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export declare const useAuth: import("zustand").UseBoundStore<import("zustand").StoreApi<AuthState>>;