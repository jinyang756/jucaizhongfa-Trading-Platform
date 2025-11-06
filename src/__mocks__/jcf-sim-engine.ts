export const initSimulation = jest.fn(() => ({
  start: jest.fn(),
}));

export const useSimulationStore = {
  getState: jest.fn(() => ({
    contracts: [],
    setContractResult: jest.fn(),
  })),
};

export class IpoEngine {
  stocks: any[] = [
    {
      stock_id: '1',
      stock_code: '000001',
      stock_name: '测试股票',
      issue_price: 10.0,
      market_price: 12.0,
      subscription_quota: 1000,
      subscribed_shares: 0,
      win_rate: 0.8,
      status: 'subscription',
      listing_date: '2025-12-01',
    },
  ];
  
  subscribeToIpo = jest.fn().mockReturnValue(true);
}

export class FundEngine {
  getFundProducts = jest.fn().mockReturnValue([
    {
      fund_code: 'F001',
      fund_name: '测试基金',
      nav: 1.5,
      strategy: '稳健型',
      volatility: 0.2,
      manager: '测试基金经理',
      status: 'active',
    },
  ]);
  
  subscribeFund = jest.fn().mockReturnValue('success');
  redeemFund = jest.fn().mockReturnValue('success');
}

export class BlockEngine {
  getBlockTrades = jest.fn().mockReturnValue([
    {
      trade_id: 'T001',
      stock_code: '000001',
      stock_name: '测试股票',
      price: 12.0,
      quantity: 1000,
      buyer: '买家1',
      seller: '卖家1',
      timestamp: '2025-11-06',
      discount_rate: 0.05,
      status: 'completed',
    },
  ]);
  
  executeBlockTrade = jest.fn().mockReturnValue('success');
}

export class SeatEngine {
  executeTrade = jest.fn().mockReturnValue('success');
}