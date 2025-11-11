import { create } from 'zustand';
import { config } from './env';
import {
  IpoEngine,
  FundEngine,
  BlockEngine,
  SeatEngine,
  useSimulationStore,
  initSimulation,
  Scheduler,
} from 'jcf-sim-engine';

// 检查是否启用了 Supabase
const supabaseEnabled = config.supabase.url && config.supabase.anonKey;

// 初始化模拟引擎
let scheduler: Scheduler | undefined;

// IPO股票数据接口
export interface IPOStock {
  stock_id: string;
  stock_code: string;
  stock_name: string;
  issue_price: number;
  market_price: number;
  subscription_quota: number;
  subscribed_shares: number;
  win_rate: number;
  status: 'upcoming' | 'subscription' | 'allocated' | 'trading';
  listing_date: string;
}

// 私募基金数据接口
export interface FundProduct {
  fund_code: string;
  fund_name: string;
  nav: number;
  strategy: string;
  volatility: number;
  manager: string;
  status: 'active' | 'closed';
}

// 大宗交易数据接口
export interface BlockTrade {
  trade_id: string;
  stock_code: string;
  stock_name: string;
  price: number;
  quantity: number;
  buyer: string;
  seller: string;
  timestamp: string;
  discount_rate: number;
  status: 'pending' | 'completed' | 'cancelled';
}

// 机构席位交易数据接口
export interface SeatTrade {
  trade_id: string;
  user_id: string;
  stock_code: string;
  stock_name: string;
  price: number;
  quantity: number;
  direction: 'buy' | 'sell';
  timestamp: string;
  fee: number;
  status: 'pending' | 'completed' | 'cancelled';
}

// 基金合约数据接口
export interface FundContract {
  contract_id: string;
  type: 'shanghai' | 'hongkong';
  strike_price: number;
  issue_time: string;
  expiration_time: string;
  duration: number;
  direction: 'call' | 'put';
  payout_multiplier: number;
  status: 'open' | 'won' | 'lost';
  auto_result?: 'win' | 'loss' | null;
  manual_result?: 'win' | 'loss' | null;
  profit?: number;
  cost: number;
}

// 用户账户数据接口
export interface UserAccount {
  user_id: string;
  username: string;
  balance: number;
  risk_preference: 'low' | 'medium' | 'high';
  created_at: string;
}

// 用户持仓数据接口
export interface PortfolioItem {
  user_id: string;
  stock_id: string;
  quantity: number;
  purchase_price: number;
  purchase_date: string;
}

// 市场行情数据接口
export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
}

// AI投资信号数据接口
export interface AiSignal {
  signal_id: string;
  stock_id: string;
  signal_type: 'buy' | 'sell' | 'hold';
  confidence: number;
  timestamp: string;
}

// 模拟引擎类
export class SimEngine {
  private static ipoEngine: IpoEngine;
  private static fundEngine: FundEngine;
  private static blockEngine: BlockEngine;
  private static seatEngine: SeatEngine;

  // 初始化引擎
  static init() {
    if (!scheduler) {
      scheduler = initSimulation({
        enableFundContract: true,
        enableSupabase: supabaseEnabled ? true : false,
        demoAccount: true,
      });
      scheduler.start();

      // 初始化各个引擎
      this.ipoEngine = new IpoEngine();
      this.fundEngine = new FundEngine();
      this.blockEngine = new BlockEngine();
      this.seatEngine = new SeatEngine();
    }
  }

  // 获取新股申购数据
  static getIpoStocks(): IPOStock[] {
    this.init();
    return this.ipoEngine.stocks;
  }

  // 申购新股
  static subscribeToIpo(stockId: string, shares: number): boolean {
    this.init();
    return this.ipoEngine.subscribeToIpo(stockId, shares);
  }

  // 获取私募基金产品
  static getFundProducts(): FundProduct[] {
    this.init();
    return this.fundEngine.getFundProducts();
  }

  // 认购私募基金
  static subscribeFund(userId: string, fundCode: string, amount: number): string {
    this.init();
    return this.fundEngine.subscribeFund(userId, fundCode, amount);
  }

  // 赎回私募基金
  static redeemFund(userId: string, fundCode: string, shares: number): string {
    this.init();
    return this.fundEngine.redeemFund(userId, fundCode, shares);
  }

  // 获取大宗交易数据
  static getBlockTrades(): BlockTrade[] {
    this.init();
    return this.blockEngine.getBlockTrades();
  }

  // 执行大宗交易
  static executeBlockTrade(
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    buyer: string,
    seller: string,
    discountRate: number,
  ): string {
    this.init();
    return this.blockEngine.executeBlockTrade(
      stockCode,
      stockName,
      price,
      quantity,
      buyer,
      seller,
      discountRate,
    );
  }

  // 执行机构席位交易
  static executeSeatTrade(
    userId: string,
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    direction: 'buy' | 'sell',
  ): string {
    this.init();
    return this.seatEngine.executeTrade(userId, stockCode, stockName, price, quantity, direction);
  }

  // 获取基金合约数据
  static getFundContracts(): FundContract[] {
    this.init();
    return useSimulationStore.getState().contracts as FundContract[];
  }

  // 设置基金合约结果
  static setContractResult(contractId: string, result: 'win' | 'loss'): void {
    this.init();
    useSimulationStore.getState().setContractResult(contractId, result);
  }
}

// Zustand 状态管理，用于存储模拟数据
interface SimEngineState {
  ipoStocks: IPOStock[];
  fundProducts: FundProduct[];
  blockTrades: BlockTrade[];
  fundContracts: FundContract[];
  userAccounts: UserAccount[];
  portfolio: PortfolioItem[];
  marketData: MarketData[];
  aiSignals: AiSignal[];
  isLoading: boolean;
  error: string | null;
  fetchIpoStocks: () => Promise<void>;
  fetchFundProducts: () => Promise<void>;
  fetchBlockTrades: () => Promise<void>;
  fetchFundContracts: () => Promise<void>;
  subscribeToIpo: (stockId: string, shares: number) => Promise<boolean>;
  subscribeFund: (userId: string, fundCode: string, amount: number) => Promise<string>;
  redeemFund: (userId: string, fundCode: string, shares: number) => Promise<string>;
  executeBlockTrade: (
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    buyer: string,
    seller: string,
    discountRate: number,
  ) => Promise<string>;
  executeSeatTrade: (
    userId: string,
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    direction: 'buy' | 'sell',
  ) => Promise<string>;
  setContractResult: (contractId: string, result: 'win' | 'loss') => Promise<void>;
  fetchUserAccounts: () => Promise<void>;
  fetchPortfolio: (userId: string) => Promise<void>;
  fetchMarketData: () => Promise<void>;
  fetchAiSignals: () => Promise<void>;
}

export const useSimEngineStore = create<SimEngineState>((set) => ({
  ipoStocks: [],
  fundProducts: [],
  blockTrades: [],
  fundContracts: [],
  userAccounts: [],
  portfolio: [],
  marketData: [],
  aiSignals: [],
  isLoading: false,
  error: null,

  fetchIpoStocks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = SimEngine.getIpoStocks();
      set({ ipoStocks: data, isLoading: false });
    } catch (err) {
      console.error('获取新股数据失败:', err);
      set({ error: '获取新股数据失败', isLoading: false });
    }
  },

  fetchFundProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = SimEngine.getFundProducts();
      set({ fundProducts: data, isLoading: false });
    } catch (err) {
      console.error('获取基金产品失败:', err);
      set({ error: '获取基金产品失败', isLoading: false });
    }
  },

  fetchBlockTrades: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = SimEngine.getBlockTrades();
      set({ blockTrades: data, isLoading: false });
    } catch (err) {
      console.error('获取大宗交易数据失败:', err);
      set({ error: '获取大宗交易数据失败', isLoading: false });
    }
  },

  fetchFundContracts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = SimEngine.getFundContracts();
      set({ fundContracts: data, isLoading: false });
    } catch (err) {
      console.error('获取基金合约数据失败:', err);
      set({ error: '获取基金合约数据失败', isLoading: false });
    }
  },

  subscribeToIpo: async (stockId: string, shares: number) => {
    try {
      const result = SimEngine.subscribeToIpo(stockId, shares);
      return result;
    } catch (err) {
      console.error('申购新股失败:', err);
      set({ error: '申购新股失败' });
      return false;
    }
  },

  subscribeFund: async (userId: string, fundCode: string, amount: number) => {
    try {
      const result = SimEngine.subscribeFund(userId, fundCode, amount);
      return result;
    } catch (err) {
      console.error('认购基金失败:', err);
      set({ error: '认购基金失败' });
      return '';
    }
  },

  redeemFund: async (userId: string, fundCode: string, shares: number) => {
    try {
      const result = SimEngine.redeemFund(userId, fundCode, shares);
      return result;
    } catch (err) {
      console.error('赎回基金失败:', err);
      set({ error: '赎回基金失败' });
      return '';
    }
  },

  executeBlockTrade: async (
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    buyer: string,
    seller: string,
    discountRate: number,
  ) => {
    try {
      const result = SimEngine.executeBlockTrade(
        stockCode,
        stockName,
        price,
        quantity,
        buyer,
        seller,
        discountRate,
      );
      return result;
    } catch (err) {
      console.error('执行大宗交易失败:', err);
      set({ error: '执行大宗交易失败' });
      return '';
    }
  },

  executeSeatTrade: async (
    userId: string,
    stockCode: string,
    stockName: string,
    price: number,
    quantity: number,
    direction: 'buy' | 'sell',
  ) => {
    try {
      const result = SimEngine.executeSeatTrade(
        userId,
        stockCode,
        stockName,
        price,
        quantity,
        direction,
      );
      return result;
    } catch (err) {
      console.error('执行机构席位交易失败:', err);
      set({ error: '执行机构席位交易失败' });
      return '';
    }
  },

  setContractResult: async (contractId: string, result: 'win' | 'loss') => {
    try {
      SimEngine.setContractResult(contractId, result);
    } catch (err) {
      console.error('设置合约结果失败:', err);
      set({ error: '设置合约结果失败' });
    }
  },

  // 新增的数据获取函数
  fetchUserAccounts: async () => {
    // TODO: 实现用户账户数据获取逻辑
    console.log('获取用户账户数据');
  },

  fetchPortfolio: async (userId: string) => {
    // TODO: 实现用户持仓数据获取逻辑
    console.log(`获取用户 ${userId} 的持仓数据`);
  },

  fetchMarketData: async () => {
    // TODO: 实现市场行情数据获取逻辑
    console.log('获取市场行情数据');
  },

  fetchAiSignals: async () => {
    // TODO: 实现AI信号数据获取逻辑
    console.log('获取AI信号数据');
  },
}));
