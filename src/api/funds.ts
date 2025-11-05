import { useFetch } from './useFetch';
import { supabase, supabaseEnabled } from '../utils/supabase';

export type FundRow = {
  id?: number;
  fund_name: string;
  fund_code: string;
  fund_type: string;
  initial_value: number;
  current_value: number;
  created_at: string;
};

export const useFundsApi = () => {
  const { data, loading, error, fetchData } = useFetch<FundRow[]>([]);

  const getAllFunds = async (options?: {
    filters?: Record<string, any>;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  }) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        // Mock data for funds
        return [
          { id: 1, fund_name: '股票基金A', fund_code: 'F001', fund_type: '股票型', initial_value: 10000, current_value: 12000, created_at: '2023-01-01' },
          { id: 2, fund_name: '债券基金B', fund_code: 'F002', fund_type: '债券型', initial_value: 5000, current_value: 5500, created_at: '2023-02-01' },
        ];
      }

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
      if (!supabaseEnabled) {
        // Mock data for single fund
        const mockFund = { id: 1, fund_name: '股票基金A', fund_code: 'F001', fund_type: '股票型', initial_value: 10000, current_value: 12000, created_at: '2023-01-01' };
        return [mockFund];
      }
      const { data, error } = await supabase.from('funds').select('*').eq('id', id).single();
      if (error) throw error;
      return data ? [data] : null;
    });
  };

  const createFund = async (fund: Partial<FundRow>) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return [{ id: Date.now(), ...fund } as FundRow];
      }
      const { data, error } = await supabase.from('funds').insert(fund).select();
      if (error) throw error;
      return data || null;
    });
  };

  const updateFund = async (id: number, fund: Partial<FundRow>) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return [{ id, ...fund } as FundRow];
      }
      const { data, error } = await supabase.from('funds').update(fund).eq('id', id).select();
      if (error) throw error;
      return data || null;
    });
  };

  const deleteFund = async (id: number) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return null;
      }
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