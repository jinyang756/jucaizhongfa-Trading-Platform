import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warn' | 'warning' = 'info') => {
  toast[type](message);
};
