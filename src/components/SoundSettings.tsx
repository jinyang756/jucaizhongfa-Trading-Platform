import React, { useState, useEffect } from 'react';
import useAppSound from '../hooks/useSound';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui';

const SoundSettings: React.FC = () => {
  const { playTradeSuccess, playTradeFailed, playNotification, playAlert } = useAppSound();
  
  // 音效设置状态
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(80);
  const [theme, setTheme] = useState('default');
  
  // 从localStorage加载设置
  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('soundVolume');
    const savedTheme = localStorage.getItem('soundTheme');
    
    if (savedSoundEnabled !== null) {
      setSoundEnabled(savedSoundEnabled === 'true');
    }
    
    if (savedVolume !== null) {
      setVolume(parseInt(savedVolume, 10));
    }
    
    if (savedTheme !== null) {
      setTheme(savedTheme);
    }
  }, []);
  
  // 保存设置到localStorage
  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);
  
  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);
  
  useEffect(() => {
    localStorage.setItem('soundTheme', theme);
  }, [theme]);
  
  // 播放测试音效
  const playTestSound = (soundType: string) => {
    if (!soundEnabled) return;
    
    switch (soundType) {
      case 'success':
        playTradeSuccess();
        break;
      case 'error':
        playTradeFailed();
        break;
      case 'notification':
        playNotification();
        break;
      case 'alert':
        playAlert();
        break;
      default:
        break;
    }
  };
  
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">音效设置</CardTitle>
        <CardDescription className="text-gray-400">
          自定义您的音效体验
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 音效开关 */}
        <div className="flex items-center justify-between">
          <span className="text-gray-200">音效开关</span>
          <Switch
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
          />
        </div>
        
        {/* 音量控制 */}
        <div className="space-y-2">
          <span className="text-gray-200">音量: {volume}%</span>
          {/* 这里应该使用Slider组件，但为了简化示例暂时省略 */}
        </div>
        
        {/* 音效主题 */}
        <div className="space-y-2">
          <span className="text-gray-200">音效主题</span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={theme === 'default' ? 'default' : 'outline'}
              onClick={() => setTheme('default')}
              className="justify-start"
            >
              默认主题
            </Button>
            <Button
              variant={theme === 'cyber' ? 'default' : 'outline'}
              onClick={() => setTheme('cyber')}
              className="justify-start"
            >
              赛博主题
            </Button>
            <Button
              variant={theme === 'member' ? 'default' : 'outline'}
              onClick={() => setTheme('member')}
              className="justify-start"
            >
              会员主题
            </Button>
            <Button
              variant={theme === 'manager' ? 'default' : 'outline'}
              onClick={() => setTheme('manager')}
              className="justify-start"
            >
              管理员主题
            </Button>
          </div>
        </div>
        
        {/* 音效测试 */}
        <div className="space-y-2">
          <span className="text-gray-200">测试音效</span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              onClick={() => playTestSound('success')}
              disabled={!soundEnabled}
            >
              交易成功
            </Button>
            <Button
              variant="destructive"
              onClick={() => playTestSound('error')}
              disabled={!soundEnabled}
            >
              交易失败
            </Button>
            <Button
              variant="outline"
              onClick={() => playTestSound('notification')}
              disabled={!soundEnabled}
            >
              通知
            </Button>
            <Button
              variant="outline"
              onClick={() => playTestSound('alert')}
              disabled={!soundEnabled}
            >
              警报
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoundSettings;