import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { FundOutlined, StockOutlined, FileTextOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

export const TradeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { showToast } = useToast();



  // 权限检查函数
  const checkPermission = (type: 'fund' | 'option' | 'contract'): boolean => {
    if (!user?.permissions) return false;
    
    switch (type) {
      case 'fund':
        return user.permissions.fund || false;
      case 'option':
        return user.permissions.option || false;
      case 'contract':
        return user.permissions.shContract || user.permissions.hkContract || false;
      default:
        return false;
    }
  };

  // 处理交易卡片点击
  const handleTradeClick = (path: string, type: 'fund' | 'option' | 'contract') => {
    if (isLoading) return;
    
    if (checkPermission(type)) {
      navigate(path);
    } else {
      showToast(`您还未开通${type === 'fund' ? '基金投资' : type === 'option' ? '二元期权' : '合约交易'}权限`, 'warning');
    }
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">


      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">交易中心</h1>

          <Row gutter={[24, 24]}>
            {/* 基金交易 */}
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable={checkPermission('fund')}
                className={`shadow-lg rounded-lg text-center transition-all ${
                  !checkPermission('fund') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleTradeClick('/trade/funds', 'fund')}
              >
                <FundOutlined 
                  style={{ 
                    fontSize: '48px', 
                    color: checkPermission('fund') ? '#1890ff' : '#d9d9d9' 
                  }} 
                />
                <Card.Meta 
                  title="基金交易" 
                  description="申购、赎回各类基金产品" 
                  className="mt-4" 
                />
                <div className="mt-3">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    checkPermission('fund') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {checkPermission('fund') ? '已开通' : '未开通'}
                  </span>
                </div>
              </Card>
            </Col>

            {/* 期权交易 */}
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable={checkPermission('option')}
                className={`shadow-lg rounded-lg text-center transition-all ${
                  !checkPermission('option') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleTradeClick('/trade/options', 'option')}
              >
                <StockOutlined 
                  style={{ 
                    fontSize: '48px', 
                    color: checkPermission('option') ? '#52c41a' : '#d9d9d9' 
                  }} 
                />
                <Card.Meta 
                  title="期权交易" 
                  description="买卖期权合约，管理风险" 
                  className="mt-4" 
                />
                <div className="mt-3">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    checkPermission('option') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {checkPermission('option') ? '已开通' : '未开通'}
                  </span>
                </div>
              </Card>
            </Col>

            {/* 合约交易 */}
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable={checkPermission('contract')}
                className={`shadow-lg rounded-lg text-center transition-all ${
                  !checkPermission('contract') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleTradeClick('/trade/contracts', 'contract')}
              >
                <FileTextOutlined 
                  style={{ 
                    fontSize: '48px', 
                    color: checkPermission('contract') ? '#faad14' : '#d9d9d9' 
                  }} 
                />
                <Card.Meta 
                  title="合约交易" 
                  description="进行杠杆交易，把握市场机会" 
                  className="mt-4" 
                />
                <div className="mt-3 space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user?.permissions?.shContract 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    沪深 {user?.permissions?.shContract ? '✓' : '✗'}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user?.permissions?.hkContract 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    港股 {user?.permissions?.hkContract ? '✓' : '✗'}
                  </span>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 权限提示 */}
          {!checkPermission('fund') && !checkPermission('option') && !checkPermission('contract') && (
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
    </div>
  );
};

export default TradeDashboard;