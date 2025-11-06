import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui';

const NotificationSystemExample: React.FC = () => {
  const { addNotification, clearNotifications } = useNotifications();
  const [notificationType, setNotificationType] = React.useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [title, setTitle] = React.useState('操作成功');
  const [message, setMessage] = React.useState('您的操作已成功完成');

  // 添加示例通知
  const addSampleNotification = () => {
    addNotification({
      type: notificationType,
      title,
      message,
      duration: 5000
    });
  };

  // 添加所有类型的通知
  const addAllTypes = () => {
    addNotification({
      type: 'success',
      title: '操作成功',
      message: '您的订单已成功提交',
      duration: 5000
    });
    
    setTimeout(() => {
      addNotification({
        type: 'error',
        title: '操作失败',
        message: '网络连接异常，请稍后重试',
        duration: 5000
      });
    }, 500);
    
    setTimeout(() => {
      addNotification({
        type: 'warning',
        title: '警告',
        message: '您的账户余额不足，请及时充值',
        duration: 5000
      });
    }, 1000);
    
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: '系统通知',
        message: '系统将在今晚22:00进行维护',
        duration: 5000
      });
    }, 1500);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">通知系统示例</h2>
      <p className="text-gray-300 mb-6">以下是在交易平台中可能用到的通知系统示例：</p>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>通知测试面板</CardTitle>
            <CardDescription>测试不同类型的通知消息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">通知类型</label>
                <Select value={notificationType} onValueChange={(value: any) => setNotificationType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择通知类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">成功</SelectItem>
                    <SelectItem value="error">错误</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="info">信息</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">通知标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">通知内容</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={addSampleNotification}>
                发送通知
              </Button>
              <Button variant="secondary" onClick={addAllTypes}>
                发送所有类型通知
              </Button>
              <Button variant="outline" onClick={clearNotifications}>
                清除所有通知
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>通知使用场景</CardTitle>
            <CardDescription>在交易平台中的实际应用示例</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h3 className="font-bold text-green-400 mb-2">交易成功通知</h3>
                <p className="text-gray-300 text-sm">
                  当用户完成交易操作后，显示成功通知，包含交易详情和预计到账时间。
                </p>
              </div>
              
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-red-400 mb-2">交易失败通知</h3>
                <p className="text-gray-300 text-sm">
                  当交易因网络问题或余额不足等原因失败时，显示错误通知并提供解决方案。
                </p>
              </div>
              
              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 mb-2">风险警告通知</h3>
                <p className="text-gray-300 text-sm">
                  当用户操作可能涉及风险时，显示警告通知提醒用户注意潜在风险。
                </p>
              </div>
              
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-blue-400 mb-2">系统通知</h3>
                <p className="text-gray-300 text-sm">
                  系统维护、更新或重要公告等信息通过系统通知传达给用户。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>通知系统基于 React Context 和 useReducer 实现，支持全局状态管理</li>
          <li>使用 Framer Motion 实现流畅的动画效果</li>
          <li>通知自动保存到 localStorage，页面刷新后仍可保留</li>
          <li>支持成功、错误、警告、信息四种类型的通知</li>
          <li>可自定义通知显示时长，0表示永久显示</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationSystemExample;