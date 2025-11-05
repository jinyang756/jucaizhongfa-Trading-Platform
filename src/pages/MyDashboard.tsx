import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import {
  HistoryOutlined,
  FileTextOutlined,
  WalletOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export const MyDashboard: React.FC = () => {
  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">我的</h1>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="shadow-lg rounded-lg text-center"
            onClick={() => navigateToPage('/user/transactions')}
          >
            <HistoryOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <Card.Meta title="交易记录" description="查看所有交易历史" className="mt-4" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="shadow-lg rounded-lg text-center"
            onClick={() => navigateToPage('/user/fund-logs')}
          >
            <FileTextOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            <Card.Meta title="基金日志" description="查看基金操作记录" className="mt-4" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="shadow-lg rounded-lg text-center"
            onClick={() => navigateToPage('/user/positions')}
          >
            <WalletOutlined style={{ fontSize: '48px', color: '#faad14' }} />
            <Card.Meta title="我的持仓" description="查看当前持有的资产" className="mt-4" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="shadow-lg rounded-lg text-center"
            onClick={() => navigateToPage('/user/settings')}
          >
            <SettingOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />
            <Card.Meta title="账户设置" description="管理个人账户信息" className="mt-4" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
