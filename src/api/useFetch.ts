import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { useToastStore } from '../store/useToastStore';

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (fetcher: () => Promise<T | null>) => Promise<T | null>;
}

export function useFetch<T>(initialData: T | null = null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToastStore();

  const fetchData = useCallback(async (fetcher: () => Promise<T | null>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return { data, loading, error, fetchData };
}
