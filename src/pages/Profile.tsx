import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Badge } from 'antd';
import {
  UserOutlined,
  WalletOutlined,
  HistoryOutlined,
  SettingOutlined,
  TrophyOutlined,
  SecurityScanOutlined,
  BellOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useAuth } from '../store/useAuth';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 用户基本信息
  const userInfo = {
    username: user?.username || 'DemoUser',
    userType: user?.userType || 'user',
    totalBalance: user?.currentBalance || 100000,
  };

  // 用户权限信息
  const permissions = [
    { name: '基金交易', enabled: user?.permissions?.fund, icon: <WalletOutlined /> },
    { name: '期权交易', enabled: user?.permissions?.option, icon: <TrophyOutlined /> },
    { name: '沪深合约', enabled: user?.permissions?.shContract, icon: <FileTextOutlined /> },
    { name: '港股合约', enabled: user?.permissions?.hkContract, icon: <SecurityScanOutlined /> },
  ];

  // 交易限制信息
  const limits = [
    { name: '单笔最大交易', value: `¥${user?.limits?.singleTradeMax?.toLocaleString() || '10,000'}` },
    { name: '每日最大交易', value: `¥${user?.limits?.dailyTradeMax?.toLocaleString() || '50,000'}` },
    { name: '最小交易金额', value: `¥${user?.limits?.minTradeAmount?.toLocaleString() || '100'}` },
  ];

  // 个人中心功能菜单
  const menuItems = [
    {
      title: '交易记录',
      description: '查看所有交易历史',
      icon: <HistoryOutlined style={{ fontSize: '24px' }} />,
      path: '/history',
    },
    {
      title: '基金日志',
      description: '查看基金操作记录',
      icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
      path: '/fund-logs',
    },
    {
      title: '我的持仓',
      description: '查看当前持有的资产',
      icon: <WalletOutlined style={{ fontSize: '24px' }} />,
      path: '/positions',
    },
    {
      title: '账户设置',
      description: '管理个人账户信息',
      icon: <SettingOutlined style={{ fontSize: '24px' }} />,
      path: '/settings',
    },
    {
      title: '安全设置',
      description: '修改密码和安全选项',
      icon: <SecurityScanOutlined style={{ fontSize: '24px' }} />,
      path: '/security',
    },
    {
      title: '消息通知',
      description: '设置消息提醒',
      icon: <BellOutlined style={{ fontSize: '24px' }} />,
      path: '/notifications',
    },
  ];

  // 成就徽章数据
  const achievements = [
    { name: '首次充值', unlocked: true, color: 'gold' },
    { name: '单日收益 5%', unlocked: true, color: 'green' },
    { name: '交易大师', unlocked: false, color: 'blue' },
    { name: '百次交易', unlocked: true, color: 'purple' },
    { name: '社区贡献者', unlocked: false, color: 'cyan' },
    { name: '风控达人', unlocked: true, color: 'red' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>

      {/* 用户基本信息 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4">
            <UserOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userInfo.username}</h2>
            <div className="flex items-center">
              <Badge status={userInfo.userType === 'admin' ? 'processing' : 'default'} />
              <span className="ml-2 text-gray-500">
                {userInfo.userType === 'admin' ? '管理员' : '普通用户'}
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">账户余额</div>
            <div className="text-2xl font-bold text-blue-600">¥{userInfo.totalBalance.toLocaleString()}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">累计收益</div>
            <div className="text-2xl font-bold text-green-600">¥8,750.75</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-gray-500 text-sm mb-1">收益率</div>
            <div className="text-2xl font-bold text-purple-600">+8.75%</div>
          </div>
        </div>
      </div>

      {/* 权限与限制 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">交易权限</h2>
          <div className="space-y-3">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">{permission.icon}</div>
                  <span>{permission.name}</span>
                </div>
                <Badge status={permission.enabled ? 'success' : 'default'} text={permission.enabled ? '已开通' : '未开通'} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">交易限制</h2>
          <div className="space-y-3">
            {limits.map((limit, index) => (
              <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">{limit.name}</span>
                <span className="font-medium">{limit.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">功能菜单</h2>
        <Row gutter={[16, 16]}>
          {menuItems.map((item, index) => (
            <Col xs={12} sm={8} md={8} lg={8} key={index}>
              <Card
                hoverable
                className="shadow rounded-lg text-center"
                onClick={() => navigate(item.path)}
              >
                <div className="text-blue-500 mb-2 flex justify-center">{item.icon}</div>
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 成就徽章 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">我的成就</h2>
        <div className="flex flex-wrap gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              >
                <TrophyOutlined style={{ fontSize: '24px', color: 'white' }} />
              </div>
              <span className="text-sm font-medium">{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;