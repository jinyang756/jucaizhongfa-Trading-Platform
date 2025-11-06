import React from 'react';
// 导入一些常用的Heroicons图标
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

const HeroiconsExample: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Heroicons 使用示例</h2>
      <p className="text-gray-300 mb-6">以下是一些在交易平台中可能用到的图标示例：</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <HomeIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">首页</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <UserIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">用户</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <WalletIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">钱包</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <ChartBarIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">图表</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <MagnifyingGlassIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">搜索</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <ArrowTrendingUpIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">趋势</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <BellIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">通知</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <CogIcon className="h-8 w-8 text-indigo-400 mb-2" />
          <span className="text-sm text-gray-300">设置</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>Heroicons 与 Tailwind CSS 完美集成，支持所有 Tailwind CSS 类</li>
          <li>可以轻松调整图标的大小、颜色和样式</li>
          <li>支持 outline 和 solid 两种样式</li>
          <li>在项目中可以通过以下方式导入：</li>
        </ul>
        <pre className="text-gray-300 text-sm bg-gray-900 p-2 rounded mt-2">
          import {'{'} HomeIcon {'}'} from 'heroicons/react/24/outline'
        </pre>
      </div>
    </div>
  );
};

export default HeroiconsExample;
