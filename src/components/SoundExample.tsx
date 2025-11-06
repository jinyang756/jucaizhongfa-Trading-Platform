import React from 'react';
import useAppSound from '../hooks/useSound';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const SoundExample: React.FC = () => {
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
    playInfo
  } = useAppSound();

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">音效示例</h2>
      <p className="text-gray-300 mb-6">以下是在交易平台中可能用到的音效示例：</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>交易音效</CardTitle>
            <CardDescription>交易操作相关音效</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={playTradeSuccess} className="w-full">
              交易成功
            </Button>
            <Button onClick={playTradeFailed} variant="destructive" className="w-full">
              交易失败
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>通知音效</CardTitle>
            <CardDescription>系统通知相关音效</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={playNotification} className="w-full">
              通知
            </Button>
            <Button onClick={playAlert} variant="outline" className="w-full">
              警报
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>交互音效</CardTitle>
            <CardDescription>用户交互相关音效</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={playButtonClick} className="w-full">
              按钮点击
            </Button>
            <Button onClick={playInput} variant="outline" className="w-full">
              输入
            </Button>
            <Button onClick={playDelete} variant="outline" className="w-full">
              删除
            </Button>
            <Button onClick={playConfirm} variant="outline" className="w-full">
              确认
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>系统音效</CardTitle>
            <CardDescription>系统操作相关音效</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={playDataLoad} className="w-full">
              数据加载
            </Button>
            <Button onClick={playPageTransition} variant="outline" className="w-full">
              页面切换
            </Button>
            <Button onClick={playWarning} variant="outline" className="w-full">
              警告
            </Button>
            <Button onClick={playInfo} variant="outline" className="w-full">
              信息
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>音效基于 easy-sound 库实现，支持按需加载</li>
          <li>所有音效文件内联在代码中，无需额外配置</li>
          <li>可根据项目中的 MP3 文件名自动生成 TypeScript 智能提示</li>
        </ul>
      </div>
    </div>
  );
};

export default SoundExample;