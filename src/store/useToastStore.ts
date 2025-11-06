import { create } from 'zustand';

export interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type?: 'info' | 'success' | 'error') => void;
  hideToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },
  hideToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
