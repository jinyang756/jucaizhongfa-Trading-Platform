import { useState, useCallback } from 'react';
import { useToastStore } from '../store/useToastStore';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (fetcher: () => Promise<T | null>) => Promise<T | null>;
}

// 定义错误类型
interface FetchError extends Error {
  message: string;
}

export function useFetch<T>(initialData: T | null = null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToastStore();

  const fetchData = useCallback(
    async (fetcher: () => Promise<T | null>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher();
        setData(result);
        return result;
      } catch (err: unknown) {
        // 将 any 类型改为 unknown，并进行类型检查
        const fetchError = err as FetchError;
        setError(fetchError.message);
        showToast(fetchError.message, 'error');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showToast],
  );

  return { data, loading, error, fetchData };
}
