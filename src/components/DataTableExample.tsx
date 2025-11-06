import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from './ui/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const DataTableExample: React.FC = () => {
  // 示例数据
  const members = [
    {
      id: 1,
      username: 'testuser01',
      email: 'test01@example.com',
      balance: 50000.0,
      status: 'active',
      level: 'gold',
    },
    {
      id: 2,
      username: 'testuser02',
      email: 'test02@example.com',
      balance: 30000.0,
      status: 'active',
      level: 'silver',
    },
    {
      id: 3,
      username: 'testuser03',
      email: 'test03@example.com',
      balance: 15000.0,
      status: 'frozen',
      level: 'bronze',
    },
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">数据表格组件示例</h2>
      <p className="text-gray-300 mb-6">以下是在交易平台中可能用到的数据表格组件示例：</p>
      
      <Card>
        <CardHeader>
          <CardTitle>会员列表</CardTitle>
          <CardDescription>展示平台会员的基本信息</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>会员ID</TableHead>
                <TableHead>用户名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>余额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>等级</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell className="font-medium">{member.username}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>¥{member.balance.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {member.status === 'active' ? '活跃' : '冻结'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.level === 'gold' 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : member.level === 'silver' 
                          ? 'bg-gray-300/20 text-gray-300' 
                          : 'bg-orange-800/20 text-orange-600'
                    }`}>
                      {member.level === 'gold' ? '黄金' : member.level === 'silver' ? '白银' : '青铜'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">使用说明</h3>
        <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
          <li>数据表格组件基于 Radix UI Themes 构建，具有良好的可访问性和响应式设计</li>
          <li>支持自定义样式，可以轻松集成到现有的设计系统中</li>
          <li>组件完全可组合，可以根据需要进行扩展和定制</li>
          <li>在项目中可以通过以下方式导入：import {'{'} Table, TableHeader, TableBody, TableHead, TableRow, TableCell {'}'} from './ui/data-table'</li>
        </ul>
      </div>
    </div>
  );
};

export default DataTableExample;