interface User {
  name: string;
  id: string;
  level: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth: import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState>>;
