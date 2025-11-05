import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import {
  FundOutlined,
  StockOutlined,
  FileTextOutlined,
  HistoryOutlined,
  WalletOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import TopNavigationBar from '../components/TopNavigationBar';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 首页功能卡片数据
  const homeFeatures = [
    {
      title: '新购申购',
      description: '新股认购服务',
      icon: <FundOutlined style={{ fontSize: '24px' }} />,
      path: '/funds',
    },
    {
      title: '机构席位',
      description: '机构专属交易通道',
      icon: <BarChartOutlined style={{ fontSize: '24px' }} />,
      path: '/trade',
    },
    {
      title: '大宗交易',
      description: '大额撮合交易',
      icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
      path: '/contracts',
    },
    {
      title: '私募基金',
      description: '高端理财产品',
      icon: <WalletOutlined style={{ fontSize: '24px' }} />,
      path: '/funds',
    },
    {
      title: '二元期权',
      description: '快速收益工具',
      icon: <StockOutlined style={{ fontSize: '24px' }} />,
      path: '/options',
    },
  ];

  // 快捷操作数据
  const quickActions = [
    {
      title: '交易记录',
      description: '查看所有交易历史',
      icon: <HistoryOutlined style={{ fontSize: '24px' }} />,
      path: '/history',
    },
    {
      title: '我的持仓',
      description: '查看当前持有的资产',
      icon: <WalletOutlined style={{ fontSize: '24px' }} />,
      path: '/positions',
    },
  ];

  return (
    <div className="p-6 pt-20">
      <TopNavigationBar
        title="聚财众发量化交易平台"
        showBackButton={false}
        showHomeButton={false}
      />

      <p className="mb-6 text-gray-600">这是一个面向中国中产投资者的移动端优先金融科技平台。</p>

      {/* 主要功能区域 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">核心功能</h2>
        <Row gutter={[16, 16]}>
          {homeFeatures.map((feature, index) => (
            <Col xs={12} sm={8} md={8} lg={8} key={index}>
              <Card
                hoverable
                className="shadow rounded-lg text-center h-full"
                onClick={() => navigate(feature.path)}
              >
                <div className="text-blue-500 mb-2 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 快捷操作区域 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">快捷操作</h2>
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={12} sm={12} md={12} lg={12} key={index}>
              <Card
                hoverable
                className="shadow rounded-lg text-center"
                onClick={() => navigate(action.path)}
              >
                <div className="text-green-500 mb-2 flex justify-center">{action.icon}</div>
                <h3 className="text-lg font-medium mb-1">{action.title}</h3>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 平台特色介绍 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">平台特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-blue-700">🎨 赛博金融主题设计</h3>
            <p className="text-gray-600">深色玻璃态+霓虹渐变，打造沉浸式交易体验</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-green-700">🤖 AI智能助理</h3>
            <p className="text-gray-600">行情解读、智能选股、一键跟单，让投资更智能</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-purple-700">📈 专业级K线图</h3>
            <p className="text-gray-600">基于ECharts/Recharts，提供精准的技术分析工具</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-yellow-700">🔒 安全可信</h3>
            <p className="text-gray-600">SSL加密、模拟银行存管，保障资金安全</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-red-700">⚡ 极致性能</h3>
            <p className="text-gray-600">Lighthouse 90+，首屏加载小于1.5秒</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-indigo-700">📱 移动端优先</h3>
            <p className="text-gray-600">专为移动端优化，随时随地进行交易</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
