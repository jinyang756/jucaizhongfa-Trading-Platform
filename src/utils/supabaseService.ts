import { supabase, supabaseEnabled } from '../utils/supabase';

// 连接状态管理
export const checkConnection = async (): Promise<boolean> => {
  if (!supabaseEnabled) return false;

  try {
    const { error } = await supabase.from('admins').select('id').limit(1);
    return !error;
  } catch (err) {
    console.error('Supabase连接检查失败:', err);
    return false;
  }
};

// 通用CRUD操作
export class SupabaseService {
  // 通用查询方法
  static async getAll<T>(
    table: string,
    columns: string = '*',
    options?: {
      filters?: Record<string, any>;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
      limit?: number;
      offset?: number;
    },
  ): Promise<{ data: T[] | null; error: any }> {
    if (!supabaseEnabled) {
      console.warn(`Supabase未启用，无法从${table}获取数据`);
      return { data: null, error: new Error('Supabase未启用') };
    }

    try {
      let query = supabase.from(table).select(columns);

      // 应用过滤条件
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // 应用排序
      if (options?.orderBy) {
        query = query.order(options.orderBy, {
          ascending: options.orderDirection !== 'desc',
        });
      }

      // 应用分页
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;
      return { data: data as T[], error };
    } catch (err) {
      console.error(`从${table}获取数据失败:`, err);
      return { data: null, error: err };
    }
  }

  // 通用获取单条记录方法
  static async getById<T>(
    table: string,
    id: number,
    columns: string = '*',
  ): Promise<{ data: T | null; error: any }> {
    if (!supabaseEnabled) {
      console.warn(`Supabase未启用，无法从${table}获取ID=${id}的数据`);
      return { data: null, error: new Error('Supabase未启用') };
    }

    try {
      const { data, error } = await supabase.from(table).select(columns).eq('id', id).single();

      return { data: data as T, error };
    } catch (err) {
      console.error(`从${table}获取ID=${id}的数据失败:`, err);
      return { data: null, error: err };
    }
  }

  // 通用创建方法
  static async create<T>(table: string, data: Partial<T>): Promise<{ data: T | null; error: any }> {
    if (!supabaseEnabled) {
      console.warn(`Supabase未启用，无法向${table}插入数据`);
      return { data: null, error: new Error('Supabase未启用') };
    }

    try {
      const { data: result, error } = await supabase.from(table).insert(data).select();

      return { data: result?.[0] as T, error };
    } catch (err) {
      console.error(`向${table}插入数据失败:`, err);
      return { data: null, error: err };
    }
  }

  // 通用更新方法
  static async update<T>(
    table: string,
    id: number,
    data: Partial<T>,
  ): Promise<{ data: T | null; error: any }> {
    if (!supabaseEnabled) {
      console.warn(`Supabase未启用，无法更新${table}中ID=${id}的数据`);
      return { data: null, error: new Error('Supabase未启用') };
    }

    try {
      const { data: result, error } = await supabase.from(table).update(data).eq('id', id).select();

      return { data: result?.[0] as T, error };
    } catch (err) {
      console.error(`更新${table}中ID=${id}的数据失败:`, err);
      return { data: null, error: err };
    }
  }

  // 通用删除方法
  static async delete(table: string, id: number): Promise<{ error: any }> {
    if (!supabaseEnabled) {
      console.warn(`Supabase未启用，无法删除${table}中ID=${id}的数据`);
      return { error: new Error('Supabase未启用') };
    }

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);

      return { error };
    } catch (err) {
      console.error(`删除${table}中ID=${id}的数据失败:`, err);
      return { error: err };
    }
  }
}
