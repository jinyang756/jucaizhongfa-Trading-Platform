import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

const ShadcnExample: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Shadcn/ui 使用示例</h2>
      <p className="text-gray-300 mb-6">以下是一些在交易平台中可能用到的Shadcn/ui组件示例：</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 按钮示例 */}
        <Card>
          <CardHeader>
            <CardTitle>按钮组件</CardTitle>
            <CardDescription>多种样式的按钮</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="destructive">危险按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="link">链接按钮</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">小按钮</Button>
              <Button size="default">默认按钮</Button>
              <Button size="lg">大按钮</Button>
            </div>
          </CardContent>
        </Card>

        {/* 输入框示例 */}
        <Card>
          <CardHeader>
            <CardTitle>输入框组件</CardTitle>
            <CardDescription>不同类型的输入框</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">默认输入框</label>
              <Input placeholder="请输入内容" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">禁用输入框</label>
              <Input placeholder="禁用状态" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">密码输入框</label>
              <Input type="password" placeholder="请输入密码" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 卡片示例 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>卡片组件</CardTitle>
          <CardDescription>用于展示内容的容器</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            卡片组件是Shadcn/ui中最常用的容器组件之一，可以用来组织和展示相关内容。
            它支持多种变体和自定义样式，可以很好地融入您的设计系统。
          </p>
        </CardContent>
        <CardFooter>
          <Button>操作按钮</Button>
        </CardFooter>
      </Card>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>Shadcn/ui 基于 Radix UI 和 Tailwind CSS 构建</li>
          <li>所有组件都具有无障碍访问支持</li>
          <li>可以通过 variant 和 size 属性轻松定制组件样式</li>
          <li>组件完全可组合，可以嵌套使用</li>
          <li>在项目中可以通过以下方式导入：</li>
        </ul>
        <pre className="text-gray-300 text-sm bg-gray-900 p-2 rounded mt-2">
          import {'{'} Button {'}'} from './ui/button'
        </pre>
      </div>
    </div>
  );
};

export default ShadcnExample;
