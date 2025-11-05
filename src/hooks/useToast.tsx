import { useToastStore } from '../store/useToastStore';

export const useToast = () => {
  const { showToast } = useToastStore();
  return { showToast };
};
