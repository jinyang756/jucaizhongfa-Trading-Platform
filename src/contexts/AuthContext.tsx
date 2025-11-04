import React, { createContext, useContext, useState, useEffect } from 'react'; 
 import type { ReactNode } from 'react'; 
 import type { AuthContextType, AuthUser, LoginCredentials } from '../types/auth'; 
 import { AuthService } from '../services/authService';  // 添加导入（确保路径正确） 
 
 // 假设您有 useToast hook 从 ToastProvider 
 // import { useToast } from '../components/Toast';  // 如果有，取消注释 
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined); 
 
 interface AuthProviderProps { 
   children: ReactNode; 
 } 
 
 export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { 
   const [user, setUser] = useState<AuthUser | null>(null); 
   const [isLoading, setIsLoading] = useState(true); 
   // const toast = useToast();  // 如果有 toast，取消注释 
 
   useEffect(() => { 
     const initAuth = async () => { 
       try { 
         const currentUser = AuthService.getCurrentUser(); 
         if (currentUser) { 
           const refreshedUser = await AuthService.refreshUserInfo(); 
           setUser(refreshedUser); 
         } 
       } catch (error) { 
         console.error('Auth initialization error:', error); 
         AuthService.logout(); 
         // toast.error('认证初始化失败');  // 添加 UI 反馈 
       } finally { 
         setIsLoading(false); 
       } 
     }; 
 
     initAuth();
   }, []);

   
 
   const login = async (credentials: LoginCredentials, userType: 'admin' | 'user'): Promise<{ success: boolean; message?: string }> => { 
     setIsLoading(true); 
     try { 
       let result; 
       if (userType === 'admin') { 
         result = await AuthService.loginAdmin(credentials); 
       } else { 
         result = await AuthService.loginUser(credentials); 
       } 
 
       if (result.success && result.user) { 
         setUser(result.user); 
         // toast.success('登录成功');  // 添加成功反馈 
         return { success: true }; 
       } else { 
         // toast.error(result.message || '登录失败');  // 添加错误反馈 
         return { success: false, message: result.message }; 
       } 
     } catch (error) { 
       console.error('Login error:', error); 
       // toast.error('登录失败，请稍后重试'); 
       return { success: false, message: '登录失败，请稍后重试' }; 
     } finally { 
       setIsLoading(false); 
     } 
   }; 
 
   const logout = () => { 
     AuthService.logout(); 
     setUser(null); 
     // toast.info('已退出登录'); 
   }; 
 
   const isAuthenticated = !!user && AuthService.isAuthenticated(); 
 
   const value: AuthContextType = { 
     user, 
     isLoading, 
     login, 
     logout, 
     isAuthenticated, 
   }; 
 
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; 
 }; 
 
 export const useAuth = (): AuthContextType => { 
   const context = useContext(AuthContext); 
   if (context === undefined) { 
     throw new Error('useAuth must be used within an AuthProvider'); 
   } 
   return context; 
 };
