import { StateCreator } from 'zustand';

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

declare const useToastStore: import('zustand').UseBoundStore<ToastState, StateCreator<ToastState, [], [], ToastState>>;

export { useToastStore };