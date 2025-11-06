import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

// 通知上下文类型
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// 初始状态
const initialState: NotificationContextType = {
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  clearNotifications: () => {}
};

// 创建上下文
const NotificationContext = createContext<NotificationContextType>(initialState);

// 通知 reducer
type Action =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

const notificationReducer = (state: Notification[], action: Action): Notification[] => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [action.payload, ...state];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    case 'CLEAR_NOTIFICATIONS':
      return [];
    default:
      return state;
  }
};

// 通知提供者组件
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, initialState.notifications);

  // 添加通知
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      ...notification
    };
    
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    
    // 自动移除通知
    if (notification.duration !== 0) {
      const timeout = notification.duration || 5000;
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, timeout);
    }
  };

  // 移除通知
  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  // 清除所有通知
  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  // 从 localStorage 加载通知
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // 只保留最近24小时的通知
        const recent = parsed.filter((n: Notification) => 
          Date.now() - n.timestamp < 24 * 60 * 60 * 1000
        );
        if (recent.length > 0) {
          recent.forEach((n: Notification) => {
            dispatch({ type: 'ADD_NOTIFICATION', payload: n });
          });
        }
      } catch (e) {
        console.error('Failed to parse notifications from localStorage', e);
      }
    }
  }, []);

  // 保存通知到 localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// 自定义 hook
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;