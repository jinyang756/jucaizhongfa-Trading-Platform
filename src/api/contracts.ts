import { useFetch } from './useFetch';
import { supabase } from '../supabase';

export type ContractRow = {
  id?: number;
  contract_code: string;
  contract_name: string;
  market: string;
};

// 定义过滤器类型
interface ContractFilters {
  [key: string]: string | number | boolean;
}

// 定义选项类型
interface ContractOptions {
  filters?: ContractFilters;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export const useContractsApi = () => {
  const { data, loading, error, fetchData } = useFetch<ContractRow[]>([]);

  const getAllContracts = async (options?: ContractOptions) => {
    return fetchData(async () => {
      let query = supabase.from('contracts').select('*');

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
      return data as ContractRow[];
    });
  };

  const getContractById = async (id: number) => {
    return fetchData(async (): Promise<ContractRow[] | null> => {
      const { data, error } = await supabase.from('contracts').select('*').eq('id', id).single();
      if (error) throw error;
      return data ? [data] : null;
    });
  };

  const createContract = async (contract: Partial<ContractRow>) => {
    return fetchData(async (): Promise<ContractRow[] | null> => {
      const { data, error } = await supabase.from('contracts').insert(contract).select();
      if (error) throw error;
      return data || null;
    });
  };

  const updateContract = async (id: number, contract: Partial<ContractRow>) => {
    return fetchData(async (): Promise<ContractRow[] | null> => {
      const { data, error } = await supabase
        .from('contracts')
        .update(contract)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data || null;
    });
  };

  const deleteContract = async (id: number) => {
    return fetchData(async () => {
      const { error } = await supabase.from('contracts').delete().eq('id', id);
      if (error) throw error;
      return null;
    });
  };

  return {
    data,
    loading,
    error,
    getAllContracts,
    getContractById,
    createContract,
    updateContract,
    deleteContract,
  };
};
