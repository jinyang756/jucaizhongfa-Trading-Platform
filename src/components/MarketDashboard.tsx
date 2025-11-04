import React from 'react';
import { Card, Col, Row } from 'antd';
import RealTimeChart from './RealTimeChart';

const MarketDashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="实时市场数据" variant="borderless">
            <RealTimeChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="市场概览" variant="borderless">
            <p>总市值: $100,000,000</p>
            <p>24小时交易量: $10,000,000</p>
            <p>活跃用户: 10,000</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最新消息" variant="borderless">
            <ul>
              <li>市场新闻1</li>
              <li>市场新闻2</li>
              <li>市场新闻3</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarketDashboard;