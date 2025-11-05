import { useFetch } from './useFetch';
import { supabase, supabaseEnabled } from '../utils/supabase';

export type ContractRow = {
  id?: number;
  contract_code: string;
  contract_name: string;
  market: string;
};

export const useContractsApi = () => {
  const { data, loading, error, fetchData } = useFetch<ContractRow[]>([]);

  const getAllContracts = async (options?: {
    filters?: Record<string, any>;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  }) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        // Mock data for contracts
        return [
          { id: 1, contract_code: 'SH0001', contract_name: '演示合约', market: 'SH' },
        ];
      }

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
    return fetchData(async () => {
      if (!supabaseEnabled) {
        // Mock data for single contract
        return { id: 1, contract_code: 'SH0001', contract_name: '演示合约', market: 'SH' };
      }
      const { data, error } = await supabase.from('contracts').select('*').eq('id', id).single();
      if (error) throw error;
      return data as ContractRow;
    });
  };

  const createContract = async (contract: Partial<ContractRow>) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return { id: Date.now(), ...contract } as ContractRow;
      }
      const { data, error } = await supabase.from('contracts').insert(contract).select();
      if (error) throw error;
      return data?.[0] as ContractRow;
    });
  };

  const updateContract = async (id: number, contract: Partial<ContractRow>) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return { id, ...contract } as ContractRow;
      }
      const { data, error } = await supabase.from('contracts').update(contract).eq('id', id).select();
      if (error) throw error;
      return data?.[0] as ContractRow;
    });
  };

  const deleteContract = async (id: number) => {
    return fetchData(async () => {
      if (!supabaseEnabled) {
        return null;
      }
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