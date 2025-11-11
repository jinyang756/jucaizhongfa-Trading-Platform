import { SimEngine, useSimEngineStore } from '../utils/simEngine';

// Mock the jcf-sim-engine module
jest.mock('jcf-sim-engine', () => {
  return {
    initSimulation: jest.fn(() => ({
      start: jest.fn(),
    })),
    useSimulationStore: {
      getState: jest.fn(() => ({
        contracts: [],
        setContractResult: jest.fn(),
      })),
    },
    IpoEngine: jest.fn().mockImplementation(() => {
      return {
        stocks: [
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
        ],
        subscribeToIpo: jest.fn().mockReturnValue(true),
      };
    }),
    FundEngine: jest.fn().mockImplementation(() => {
      return {
        getFundProducts: jest.fn().mockReturnValue([
          {
            fund_code: 'F001',
            fund_name: '测试基金',
            nav: 1.5,
            strategy: '稳健型',
            volatility: 0.2,
            manager: '测试基金经理',
            status: 'active',
          },
        ]),
        subscribeFund: jest.fn().mockReturnValue('success'),
        redeemFund: jest.fn().mockReturnValue('success'),
      };
    }),
    BlockEngine: jest.fn().mockImplementation(() => {
      return {
        getBlockTrades: jest.fn().mockReturnValue([
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
        ]),
        executeBlockTrade: jest.fn().mockReturnValue('success'),
      };
    }),
    SeatEngine: jest.fn().mockImplementation(() => {
      return {
        executeTrade: jest.fn().mockReturnValue('success'),
      };
    }),
  };
});

describe('SimEngine', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getIpoStocks', () => {
    it('should return IPO stocks data', () => {
      const stocks = SimEngine.getIpoStocks();
      expect(stocks).toHaveLength(1);
      expect(stocks[0].stock_name).toBe('测试股票');
    });
  });

  describe('subscribeToIpo', () => {
    it('should successfully subscribe to IPO', () => {
      const result = SimEngine.subscribeToIpo('1', 100);
      expect(result).toBe(true);
    });
  });

  describe('getFundProducts', () => {
    it('should return fund products data', () => {
      const funds = SimEngine.getFundProducts();
      expect(funds).toHaveLength(1);
      expect(funds[0].fund_name).toBe('测试基金');
    });
  });

  describe('subscribeFund', () => {
    it('should successfully subscribe to fund', () => {
      const result = SimEngine.subscribeFund('user1', 'F001', 1000);
      expect(result).toBe('success');
    });
  });

  describe('redeemFund', () => {
    it('should successfully redeem fund', () => {
      const result = SimEngine.redeemFund('user1', 'F001', 100);
      expect(result).toBe('success');
    });
  });

  describe('getBlockTrades', () => {
    it('should return block trades data', () => {
      const trades = SimEngine.getBlockTrades();
      expect(trades).toHaveLength(1);
      expect(trades[0].stock_name).toBe('测试股票');
    });
  });

  describe('executeBlockTrade', () => {
    it('should successfully execute block trade', () => {
      const result = SimEngine.executeBlockTrade(
        '000001',
        '测试股票',
        12.0,
        1000,
        '买家1',
        '卖家1',
        0.05,
      );
      expect(result).toBe('success');
    });
  });

  describe('executeSeatTrade', () => {
    it('should successfully execute seat trade', () => {
      const result = SimEngine.executeSeatTrade('user1', '000001', '测试股票', 12.0, 1000, 'buy');
      expect(result).toBe('success');
    });
  });

  describe('getFundContracts', () => {
    it('should return fund contracts data', () => {
      const contracts = SimEngine.getFundContracts();
      expect(contracts).toEqual([]);
    });
  });

  describe('setContractResult', () => {
    it('should set contract result without error', () => {
      expect(() => {
        SimEngine.setContractResult('C001', 'win');
      }).not.toThrow();
    });
  });
});

describe('useSimEngineStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useSimEngineStore.setState({
      ipoStocks: [],
      fundProducts: [],
      blockTrades: [],
      fundContracts: [],
      isLoading: false,
      error: null,
    });
  });

  describe('fetchIpoStocks', () => {
    it('should fetch IPO stocks and update state', async () => {
      await useSimEngineStore.getState().fetchIpoStocks();
      const state = useSimEngineStore.getState();
      expect(state.ipoStocks).toHaveLength(1);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchFundProducts', () => {
    it('should fetch fund products and update state', async () => {
      await useSimEngineStore.getState().fetchFundProducts();
      const state = useSimEngineStore.getState();
      expect(state.fundProducts).toHaveLength(1);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchBlockTrades', () => {
    it('should fetch block trades and update state', async () => {
      await useSimEngineStore.getState().fetchBlockTrades();
      const state = useSimEngineStore.getState();
      expect(state.blockTrades).toHaveLength(1);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchFundContracts', () => {
    it('should fetch fund contracts and update state', async () => {
      await useSimEngineStore.getState().fetchFundContracts();
      const state = useSimEngineStore.getState();
      expect(state.fundContracts).toEqual([]);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('subscribeToIpo', () => {
    it('should subscribe to IPO and return result', async () => {
      const result = await useSimEngineStore.getState().subscribeToIpo('1', 100);
      expect(result).toBe(true);
    });
  });

  describe('subscribeFund', () => {
    it('should subscribe to fund and return result', async () => {
      const result = await useSimEngineStore.getState().subscribeFund('user1', 'F001', 1000);
      expect(result).toBe('success');
    });
  });

  describe('redeemFund', () => {
    it('should redeem fund and return result', async () => {
      const result = await useSimEngineStore.getState().redeemFund('user1', 'F001', 100);
      expect(result).toBe('success');
    });
  });

  describe('executeBlockTrade', () => {
    it('should execute block trade and return result', async () => {
      const result = await useSimEngineStore
        .getState()
        .executeBlockTrade('000001', '测试股票', 12.0, 1000, '买家1', '卖家1', 0.05);
      expect(result).toBe('success');
    });
  });

  describe('executeSeatTrade', () => {
    it('should execute seat trade and return result', async () => {
      const result = await useSimEngineStore
        .getState()
        .executeSeatTrade('user1', '000001', '测试股票', 12.0, 1000, 'buy');
      expect(result).toBe('success');
    });
  });

  describe('setContractResult', () => {
    it('should set contract result without error', async () => {
      await expect(
        useSimEngineStore.getState().setContractResult('C001', 'win'),
      ).resolves.toBeUndefined();
    });
  });
});
