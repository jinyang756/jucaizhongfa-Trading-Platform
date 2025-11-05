import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, supabaseEnabled } from '../utils/supabase';
import TopNavigationBar from '../components/TopNavigationBar';
import {
  UserOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Card, Row, Col, Statistic, Badge, List, Progress } from 'antd';

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalTradeVolume: 0,
    fundTradeVolume: 0,
    optionTradeVolume: 0,
    contractTradeVolume: 0,
    fundYield: 0,
    fundExcessYield: 0,
  });
  const [pendingReviews, setPendingReviews] = useState(0);
  const [abnormalTrades, setAbnormalTrades] = useState(0);

  // 加载统计数据
  const loadStats = async () => {
    try {
      if (!supabaseEnabled) {
        // 模拟数据
        setStats({
          totalUsers: 1245,
          activeUsers: 856,
          newUsers: 24,
          totalTradeVolume: 12500000,
          fundTradeVolume: 5200000,
          optionTradeVolume: 3800000,
          contractTradeVolume: 3500000,
          fundYield: 8.5,
          fundExcessYield: 2.3,
        });
        setPendingReviews(3);
        setAbnormalTrades(2);
      } else {
        // 实际从数据库获取数据
        const [users, , ,] = await Promise.all([
          supabase.from('users').select('id', { count: 'exact' }),
          supabase.from('funds').select('id', { count: 'exact' }),
          supabase.from('options').select('id', { count: 'exact' }),
          supabase.from('contracts').select('id', { count: 'exact' }),
        ]);

        setStats({
          totalUsers: users.count || 0,
          activeUsers: Math.floor((users.count || 0) * 0.7),
          newUsers: Math.floor((users.count || 0) * 0.02),
          totalTradeVolume: 12500000,
          fundTradeVolume: 5200000,
          optionTradeVolume: 3800000,
          contractTradeVolume: 3500000,
          fundYield: 8.5,
          fundExcessYield: 2.3,
        });
        setPendingReviews(3);
        setAbnormalTrades(2);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // 快捷操作菜单
  const quickActions = [
    {
      title: '会员管理',
      description: '管理会员账户、权限和资金',
      icon: <UserOutlined className="text-blue-500 text-xl" />,
      path: '/manager/users',
    },
    {
      title: '交易管理',
      description: '权限设置、交易规则调整',
      icon: <DollarCircleOutlined className="text-green-500 text-xl" />,
      path: '/manager/trades',
    },
    {
      title: '数据集成',
      description: '查看和管理会员账号数据',
      icon: <BarChartOutlined className="text-purple-500 text-xl" />,
      path: '/manager/data',
    },
    {
      title: '系统设置',
      description: '系统参数配置、安全设置',
      icon: <CheckCircleOutlined className="text-orange-500 text-xl" />,
      path: '/manager/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航栏 */}
      <TopNavigationBar title="基金管理人首页" showBackButton={false} showHomeButton={false} />

      <div className="pt-16 px-4">
        {/* 概览信息 */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">概览信息</h2>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="会员总数"
                  value={stats.totalUsers}
                  suffix="人"
                  valueStyle={{ color: '#3f83f8' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="活跃会员"
                  value={stats.activeUsers}
                  suffix="人"
                  valueStyle={{ color: '#3f83f8' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="新增会员"
                  value={stats.newUsers}
                  suffix="人"
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="今日交易额"
                  value={stats.totalTradeVolume}
                  suffix="元"
                  precision={2}
                  formatter={(value) => `¥${Number(value).toLocaleString()}`}
                  valueStyle={{ color: '#ef4444' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 交易数据统计 */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">交易数据统计</h2>
          <Card className="shadow-sm">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>基金交易</span>
                <span>¥{stats.fundTradeVolume.toLocaleString()}</span>
              </div>
              <Progress
                percent={Math.round((stats.fundTradeVolume / stats.totalTradeVolume) * 100)}
                strokeColor="#3b82f6"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>期权交易</span>
                <span>¥{stats.optionTradeVolume.toLocaleString()}</span>
              </div>
              <Progress
                percent={Math.round((stats.optionTradeVolume / stats.totalTradeVolume) * 100)}
                strokeColor="#10b981"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>合约交易</span>
                <span>¥{stats.contractTradeVolume.toLocaleString()}</span>
              </div>
              <Progress
                percent={Math.round((stats.contractTradeVolume / stats.totalTradeVolume) * 100)}
                strokeColor="#f59e0b"
              />
            </div>
          </Card>
        </div>

        {/* 业绩指标 */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">业绩指标</h2>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="基金收益率"
                  value={stats.fundYield}
                  suffix="%"
                  precision={2}
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shadow-sm">
                <Statistic
                  title="超额收益率"
                  value={stats.fundExcessYield}
                  suffix="%"
                  precision={2}
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 待办事项提醒 */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">待办事项提醒</h2>
          <Card className="shadow-sm">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  icon: <UserOutlined className="text-blue-500" />,
                  title: '会员审核提醒',
                  description: `有 ${pendingReviews} 个新会员等待审核`,
                  action: () => navigate('/manager/users'),
                  count: pendingReviews,
                },
                {
                  icon: <ExclamationCircleOutlined className="text-red-500" />,
                  title: '交易异常提醒',
                  description: `有 ${abnormalTrades} 个异常交易需要处理`,
                  action: () => navigate('/manager/trades'),
                  count: abnormalTrades,
                },
              ]}
              renderItem={(item) => (
                <List.Item onClick={item.action} className="cursor-pointer hover:bg-gray-50">
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                  <div>
                    <Badge count={item.count} showZero color="blue" />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* 快捷操作 */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">快捷操作</h2>
          <Row gutter={[16, 16]}>
            {quickActions.map((action, index) => (
              <Col span={12} key={index}>
                <Card hoverable onClick={() => navigate(action.path)} className="text-center">
                  <div className="flex justify-center mb-2">{action.icon}</div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
