import React, { useState, useEffect, useCallback, createContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore } from '../store/useToastStore';

// Toast类型定义
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast消息接口
interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

// Toast上下文接口
interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: number) => void;
}

// 创建Toast上下文
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast提供者属性
interface ToastProviderProps {
  children: ReactNode;
}

// Toast组件属性
interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onClose: () => void;
}

// 单个Toast组件
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3秒后自动关闭

    return () => clearTimeout(timer);
  }, [onClose]);

  // 根据类型设置不同的样式
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  // 根据类型设置不同的图标
  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className={`flex items-center p-4 mb-4 border-l-4 rounded-r shadow-md ${getToastStyles()}`}>
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3">
        {getToastIcon()}
      </div>
      <div className="text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-gray-200 focus:outline-none"
        onClick={onClose}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Toast提供者组件
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, hideToast } = useToastStore();

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        hideToast(toast.id);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    });
  }, [toasts, hideToast]);

  const toastContainer = document.getElementById('toast-root');
  if (!toastContainer) return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>,
    toastContainer
  );
};

export const useToast = () => {
  const { showToast } = useToastStore();
  return { showToast };
};