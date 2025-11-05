import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseEnabled } from '../utils/supabase';
import { useToast } from '../hooks/useToast';

export function useSupabase() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // 检查连接状态
  const checkConnection = useCallback(async () => {
    if (!supabaseEnabled) {
      setIsConnected(false);
      return false;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.from('admins').select('id').limit(1);
      const connected = !error;
      setIsConnected(connected);
      return connected;
    } catch (err) {
      console.error('Supabase连接检查失败:', err);
      setIsConnected(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 通用错误处理
  const handleError = useCallback(
    (error: unknown, fallbackMessage: string = '操作失败') => {
      console.error(error);

      // 处理Supabase特定错误
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string; message?: string };
        switch (err.code) {
          case '23505': // 唯一约束冲突
            showToast('数据已存在，请勿重复添加', 'error');
            break;
          case '23503': // 外键约束冲突
            showToast('操作失败：关联数据不存在', 'error');
            break;
          case '42P01': // 表不存在
            showToast('系统错误：数据表不存在', 'error');
            break;
          case '42703': // 列不存在
            showToast('系统错误：数据字段不存在', 'error');
            break;
          case '28000': // 无效的授权规范
          case '28P01': // 密码认证失败
            showToast('授权失败，请重新登录', 'error');
            break;
          case '3D000': // 数据库不存在
          case '3F000': // 模式不存在
            showToast('系统配置错误，请联系管理员', 'error');
            break;
          case '08006': // 连接失败
          case '08001': // 连接异常
          case '08004': // 拒绝连接
            showToast('数据库连接失败，请检查网络', 'error');
            break;
          default:
            showToast(`${fallbackMessage}: ${err.message || '未知错误'}`, 'error');
        }
      } else {
        showToast(fallbackMessage, 'error');
      }
    },
    [showToast],
  );

  // 初始化时检查连接
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return {
    isConnected,
    isLoading,
    checkConnection,
    handleError,
    supabaseEnabled,
  };
}
