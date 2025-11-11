import { useCallback } from 'react';

// 按需导入音效，而不是一次性导入所有音效
const useAppSound = () => {
  // 懒加载音效函数
  const loadSound = useCallback(async (soundName: string) => {
    try {
      const soundModule = await import('easy-sound');
      // @ts-expect-error - easy-sound的类型定义可能不完整
      return soundModule[soundName];
    } catch (error) {
      console.warn(`Failed to load sound: ${String(soundName)}`, error);
      return null;
    }
  }, []);

  // 播放音效的函数
  const playSound = useCallback(
    async (soundName: string) => {
      try {
        const sound = await loadSound(soundName);
        if (sound && typeof sound.play === 'function') {
          sound.play();
        }
      } catch (error) {
        console.warn(`Failed to play sound: ${String(soundName)}`, error);
      }
    },
    [loadSound],
  );

  // 交易成功音效
  const playTradeSuccess = useCallback(() => playSound('success'), [playSound]);

  // 交易失败音效
  const playTradeFailed = useCallback(() => playSound('error'), [playSound]);

  // 通知音效
  const playNotification = useCallback(() => playSound('notification'), [playSound]);

  // 警报音效
  const playAlert = useCallback(() => playSound('alert'), [playSound]);

  // 按钮点击音效
  const playButtonClick = useCallback(() => playSound('click'), [playSound]);

  // 页面切换音效
  const playPageTransition = useCallback(() => playSound('transition'), [playSound]);

  // 数据加载音效
  const playDataLoad = useCallback(() => playSound('loading'), [playSound]);

  // 输入音效
  const playInput = useCallback(() => playSound('input'), [playSound]);

  // 删除操作音效
  const playDelete = useCallback(() => playSound('delete'), [playSound]);

  // 确认操作音效
  const playConfirm = useCallback(() => playSound('confirm'), [playSound]);

  // 警告音效
  const playWarning = useCallback(() => playSound('warning'), [playSound]);

  // 信息音效
  const playInfo = useCallback(() => playSound('info'), [playSound]);

  return {
    playTradeSuccess,
    playTradeFailed,
    playNotification,
    playAlert,
    playButtonClick,
    playPageTransition,
    playDataLoad,
    playInput,
    playDelete,
    playConfirm,
    playWarning,
    playInfo,
  };
};

export default useAppSound;
