import React, { useEffect } from 'react';
import { Card, Col, Row, Table, Tabs } from 'antd';
import { useSimEngineStore } from '../utils/simEngine';

const MarketDashboard: React.FC = () => {
  const {
    ipoStocks,
    fundProducts,
    blockTrades,
    fundContracts,
    fetchIpoStocks,
    fetchFundProducts,
    fetchBlockTrades,
    fetchFundContracts,
    isLoading,
  } = useSimEngineStore();

  useEffect(() => {
    // 获取初始数据
    fetchIpoStocks();
    fetchFundProducts();
    fetchBlockTrades();
    fetchFundContracts();

    // 设置定时器定期更新数据
    const interval = setInterval(() => {
      fetchIpoStocks();
      fetchFundProducts();
      fetchBlockTrades();
      fetchFundContracts();
    }, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, [fetchIpoStocks, fetchFundProducts, fetchBlockTrades, fetchFundContracts]);

  // 新股申购表格列定义
  const ipoColumns = [
    {
      title: '股票代码',
      dataIndex: 'stock_code',
      key: 'stock_code',
    },
    {
      title: '股票名称',
      dataIndex: 'stock_name',
      key: 'stock_name',
    },
    {
      title: '发行价',
      dataIndex: 'issue_price',
      key: 'issue_price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '市场价',
      dataIndex: 'market_price',
      key: 'market_price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          upcoming: { text: '即将发行', color: 'blue' },
          subscription: { text: '申购中', color: 'green' },
          allocated: { text: '已配售', color: 'orange' },
          trading: { text: '交易中', color: 'purple' },
        };
        const statusInfo = statusMap[status] || { text: status, color: 'gray' };
        return <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>;
      },
    },
  ];

  // 私募基金表格列定义
  const fundColumns = [
    {
      title: '基金代码',
      dataIndex: 'fund_code',
      key: 'fund_code',
    },
    {
      title: '基金名称',
      dataIndex: 'fund_name',
      key: 'fund_name',
    },
    {
      title: '净值',
      dataIndex: 'nav',
      key: 'nav',
      render: (nav: number) => `¥${nav.toFixed(4)}`,
    },
    {
      title: '策略',
      dataIndex: 'strategy',
      key: 'strategy',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'active' ? 'green' : 'red' }}>
          {status === 'active' ? '活跃' : '封闭'}
        </span>
      ),
    },
  ];

  // 大宗交易表格列定义
  const blockTradeColumns = [
    {
      title: '股票代码',
      dataIndex: 'stock_code',
      key: 'stock_code',
    },
    {
      title: '股票名称',
      dataIndex: 'stock_name',
      key: 'stock_name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '买方',
      dataIndex: 'buyer',
      key: 'buyer',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          style={{
            color: status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red',
          }}
        >
          {status === 'completed' ? '完成' : status === 'pending' ? '待处理' : '取消'}
        </span>
      ),
    },
  ];

  // 基金合约表格列定义
  const contractColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (type === 'shanghai' ? '沪市' : '港市'),
    },
    {
      title: '执行价',
      dataIndex: 'strike_price',
      key: 'strike_price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
      render: (direction: string) => (
        <span style={{ color: direction === 'call' ? 'green' : 'red' }}>
          {direction === 'call' ? '看涨' : '看跌'}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          open: { text: '开放', color: 'blue' },
          won: { text: '盈利', color: 'green' },
          lost: { text: '亏损', color: 'red' },
        };
        const statusInfo = statusMap[status] || { text: status, color: 'gray' };
        return <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>;
      },
    },
  ];

  const items = [
    {
      key: '1',
      label: '新股申购',
      children: (
        <Table
          dataSource={ipoStocks}
          columns={ipoColumns}
          pagination={false}
          loading={isLoading}
          rowKey="stock_id"
        />
      ),
    },
    {
      key: '2',
      label: '私募基金',
      children: (
        <Table
          dataSource={fundProducts}
          columns={fundColumns}
          pagination={false}
          loading={isLoading}
          rowKey="fund_code"
        />
      ),
    },
    {
      key: '3',
      label: '大宗交易',
      children: (
        <Table
          dataSource={blockTrades}
          columns={blockTradeColumns}
          pagination={false}
          loading={isLoading}
          rowKey="trade_id"
        />
      ),
    },
    {
      key: '4',
      label: '基金合约',
      children: (
        <Table
          dataSource={fundContracts}
          columns={contractColumns}
          pagination={false}
          loading={isLoading}
          rowKey="contract_id"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="实时市场数据"
            variant="borderless"
            extra={isLoading ? <span>数据更新中...</span> : null}
          >
            <Tabs items={items} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="市场概览" variant="borderless">
            <p>总市值: $100,000,000</p>
            <p>24小时交易量: $10,000,000</p>
            <p>活跃会员: 10,000</p>
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
