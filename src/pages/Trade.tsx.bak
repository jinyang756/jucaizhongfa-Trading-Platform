import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Statistic, Progress } from 'antd';
import {
  FundOutlined,
  StockOutlined,
  FileTextOutlined,
  RiseOutlined,
  FallOutlined,
  ShoppingOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useAuth } from '../store/useAuth';
import TopNavigationBar from '../components/TopNavigationBar';
const Trade: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 交易类型数据
  const tradeTypes = [
    {
      title: '基金交易',
      description: '申购、赎回各类基金产品',
      icon: <FundOutlined style={{ fontSize: '24px' }} />,
      path: '/funds',
      permission: user?.permissions?.fund,
    },
    {
      title: '期权交易',
      description: '买卖期权合约，管理风险',
      icon: <StockOutlined style={{ fontSize: '24px' }} />,
      path: '/options',
      permission: user?.permissions?.option,
    },
    {
      title: '合约交易',
      description: '进行杠杆交易，把握市场机会',
      icon: <FileTextOutlined style={{ fontSize: '24px' }} />,
      path: '/contracts',
      permission: user?.permissions?.shContract || user?.permissions?.hkContract,
    },
    {
      title: '大宗交易',
      description: '大额撮合交易',
      icon: <BankOutlined style={{ fontSize: '24px' }} />,
      path: '/block-trading',
      permission: user?.permissions?.block,
    },
    {
      title: '新购申购',
      description: '新股认购服务',
      icon: <ShoppingOutlined style={{ fontSize: '24px' }} />,
      path: '/ipo-subscription',
      permission: user?.permissions?.ipo,
    },
  ];

  // 市场数据
  const marketData = [
    { name: '上证指数', value: '3,245.67', change: '+1.25%', up: true },
    { name: '深证成指', value: '11,876.45', change: '-0.32%', up: false },
    { name: '创业板指', value: '2,456.78', change: '+2.15%', up: true },
    { name: '恒生指数', value: '17,890.12', change: '+0.87%', up: true },
  ];

  // 用户资产概览
  const assetOverview = {
    totalBalance: user?.currentBalance || 100000,
    todayProfit: 1250.5,
    totalProfit: 8750.75,
    profitRate: 8.75,
  };

  return (
    <div className="p-6 pt-20">
      <TopNavigationBar title="交易大厅" />

      {/* 资产概览 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">资产概览</h2>
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <Statistic
              title="总资产"
              value={assetOverview.totalBalance}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="¥"
              suffix=""
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="今日盈亏"
              value={assetOverview.todayProfit}
              precision={2}
              valueStyle={{ color: assetOverview.todayProfit >= 0 ? '#3f8600' : '#cf1322' }}
              prefix={assetOverview.todayProfit >= 0 ? <RiseOutlined /> : <FallOutlined />}
              suffix=""
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="累计盈亏"
              value={assetOverview.totalProfit}
              precision={2}
              valueStyle={{ color: assetOverview.totalProfit >= 0 ? '#3f8600' : '#cf1322' }}
              prefix={assetOverview.totalProfit >= 0 ? <RiseOutlined /> : <FallOutlined />}
              suffix=""
            />
          </Col>
          <Col xs={12} sm={6}>
            <div className="flex flex-col justify-center h-full">
              <div className="text-sm text-gray-500">累计收益率</div>
              <div
                className={`text-lg font-semibold ${assetOverview.profitRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {assetOverview.profitRate >= 0 ? '+' : ''}
                {assetOverview.profitRate}%
              </div>
              <Progress
                percent={Math.abs(assetOverview.profitRate)}
                status={assetOverview.profitRate >= 0 ? 'success' : 'exception'}
                showInfo={false}
                strokeColor={assetOverview.profitRate >= 0 ? '#52c41a' : '#ff4d4f'}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* 市场行情 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">市场行情</h2>
        <Row gutter={16}>
          {marketData.map((data, index) => (
            <Col xs={12} sm={6} key={index}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">{data.name}</div>
                <div className="text-lg font-semibold">{data.value}</div>
                <div className={`flex items-center ${data.up ? 'text-green-600' : 'text-red-600'}`}>
                  {data.up ? <RiseOutlined className="mr-1" /> : <FallOutlined className="mr-1" />}
                  {data.change}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* 交易类型 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">交易类型</h2>
        <Row gutter={[24, 24]}>
          {tradeTypes.map((trade, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable={trade.permission}
                className={`shadow-lg rounded-lg text-center transition-all ${
                  !trade.permission ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => trade.permission && navigate(trade.path)}
              >
                <div className="text-blue-500 mb-3 flex justify-center">{trade.icon}</div>
                <Card.Meta title={trade.title} description={trade.description} className="mb-3" />
                <div className="mt-2">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      trade.permission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {trade.permission ? '已开通' : '未开通'}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 权限提示 */}
        {!user?.permissions?.fund &&
          !user?.permissions?.option &&
          !user?.permissions?.shContract &&
          !user?.permissions?.hkContract &&
          !user?.permissions?.block &&
          !user?.permissions?.ipo && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    您当前未开通任何交易权限，请联系管理员开通权限后再进行交易。
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Trade;
