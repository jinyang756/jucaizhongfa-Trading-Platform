import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore, type Toast } from '../store/useToastStore';

// Toast类型定义
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast提供者组件
export const ToastProvider: React.FC = () => {
  const { toasts, hideToast } = useToastStore();

  useEffect(() => {
    toasts.forEach((toast: Toast) => {
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
      {toasts.map((toast: Toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>,
    toastContainer,
  );
};

export const useToast = () => {
  const { showToast } = useToastStore();
  return { showToast };
};
