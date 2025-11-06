import React from 'react';
import {
  TradeCard,
  TradeCardHeader,
  TradeCardTitle,
  TradeCardDescription,
  TradeCardContent,
  TradeCardFooter,
} from './ui/trade-card';
import {
  AccountOverview,
  AccountOverviewHeader,
  AccountOverviewTitle,
  AccountOverviewDescription,
  AccountOverviewContent,
} from './ui/account-overview';
import { Button } from './ui/button';

const CompositeComponentsExample: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">复合组件示例</h2>
      <p className="text-gray-300 mb-6">以下是在交易平台中可能用到的复合业务组件示例：</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 交易卡片示例 */}
        <TradeCard>
          <TradeCardHeader>
            <TradeCardTitle>黄金基金</TradeCardTitle>
            <TradeCardDescription>稳健型投资产品</TradeCardDescription>
          </TradeCardHeader>
          <TradeCardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">年化收益率</span>
                <span className="font-bold text-green-400">+8.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">起购金额</span>
                <span>¥10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">风险等级</span>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                  中等
                </span>
              </div>
            </div>
          </TradeCardContent>
          <TradeCardFooter className="flex justify-between">
            <Button variant="outline">查看详情</Button>
            <Button>立即购买</Button>
          </TradeCardFooter>
        </TradeCard>

        {/* 账户概览面板示例 */}
        <AccountOverview>
          <AccountOverviewHeader>
            <AccountOverviewTitle>账户总览</AccountOverviewTitle>
            <AccountOverviewDescription>截止至 2025年11月6日</AccountOverviewDescription>
          </AccountOverviewHeader>
          <AccountOverviewContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">总资产</span>
                <span className="text-2xl font-bold text-white">¥1,250,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">可用余额</span>
                <span className="text-lg text-green-400">¥850,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">持仓收益</span>
                <span className="text-lg text-green-400">+¥125,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">今日收益</span>
                <span className="text-lg text-green-400">+¥2,500</span>
              </div>
            </div>
          </AccountOverviewContent>
        </AccountOverview>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>交易卡片组件适用于展示金融产品信息，具有悬停效果和阴影动画</li>
          <li>账户概览面板组件采用渐变背景设计，适合展示账户关键信息</li>
          <li>所有组件都基于 Shadcn/ui 设计理念构建，具有良好的可组合性和可定制性</li>
          <li>组件完全响应式设计，适配各种屏幕尺寸</li>
        </ul>
      </div>
    </div>
  );
};

export default CompositeComponentsExample;
