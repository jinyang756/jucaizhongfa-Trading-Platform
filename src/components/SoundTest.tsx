import React from 'react';
import useAppSound from '../hooks/useSound';
import { Button } from './ui/button';

const SoundTest: React.FC = () => {
  const {
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
  } = useAppSound();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">音效测试</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Button onClick={playTradeSuccess}>交易成功</Button>
        <Button onClick={playTradeFailed} variant="destructive">
          交易失败
        </Button>
        <Button onClick={playNotification}>通知</Button>
        <Button onClick={playAlert} variant="outline">
          警报
        </Button>
        <Button onClick={playButtonClick}>按钮点击</Button>
        <Button onClick={playPageTransition} variant="outline">
          页面切换
        </Button>
        <Button onClick={playDataLoad}>数据加载</Button>
        <Button onClick={playInput} variant="outline">
          输入
        </Button>
        <Button onClick={playDelete} variant="outline">
          删除
        </Button>
        <Button onClick={playConfirm} variant="outline">
          确认
        </Button>
        <Button onClick={playWarning} variant="outline">
          警告
        </Button>
        <Button onClick={playInfo} variant="outline">
          信息
        </Button>
      </div>
    </div>
  );
};

export default SoundTest;
