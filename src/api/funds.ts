import { useFetch } from './useFetch';
import { supabase } from '../supabase';

export type FundRow = {
  id?: number;
  fund_name: string;
  fund_code: string;
  fund_type: string;
  initial_value: number;
  current_value: number;
  created_at: string;
};

// 定义过滤器类型
interface FundFilters {
  [key: string]: string | number | boolean;
}

// 定义选项类型
interface FundOptions {
  filters?: FundFilters;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export const useFundsApi = () => {
  const { data, loading, error, fetchData } = useFetch<FundRow[]>([]);

  const getAllFunds = async (options?: FundOptions) => {
    return fetchData(async () => {
      let query = supabase.from('funds').select('*');

      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy, {
          ascending: options.orderDirection !== 'desc',
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as FundRow[];
    });
  };

  const getFundById = async (id: number) => {
    return fetchData(async () => {
      const { data, error } = await supabase.from('funds').select('*').eq('id', id).single();
      if (error) throw error;
      return data ? [data] : null;
    });
  };

  const createFund = async (fund: Partial<FundRow>) => {
    return fetchData(async () => {
      const { data, error } = await supabase.from('funds').insert(fund).select();
      if (error) throw error;
      return data || null;
    });
  };

  const updateFund = async (id: number, fund: Partial<FundRow>) => {
    return fetchData(async () => {
      const { data, error } = await supabase.from('funds').update(fund).eq('id', id).select();
      if (error) throw error;
      return data || null;
    });
  };

  const deleteFund = async (id: number) => {
    return fetchData(async () => {
      const { error } = await supabase.from('funds').delete().eq('id', id);
      if (error) throw error;
      return null;
    });
  };

  return {
    data,
    loading,
    error,
    getAllFunds,
    getFundById,
    createFund,
    updateFund,
    deleteFund,
  };
};
