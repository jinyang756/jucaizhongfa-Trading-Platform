import { create } from 'zustand';

// 定义持仓类型
interface Position {
  id: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profit: number;
}

// 定义交易记录类型
interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: Date;
  fee: number;
}

interface TradeDataState {
  // 添加交易数据状态的类型定义
  portfolioValue: number;
  dailyProfit: number;
  positions: Position[];
  transactions: Transaction[];
  updatePortfolioValue: (value: number) => void;
  updateDailyProfit: (profit: number) => void;
  addPosition: (position: Position) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useTradeData = create<TradeDataState>((set) => ({
  portfolioValue: 0,
  dailyProfit: 0,
  positions: [],
  transactions: [],
  updatePortfolioValue: (value) => set({ portfolioValue: value }),
  updateDailyProfit: (profit) => set({ dailyProfit: profit }),
  addPosition: (position) => set((state) => ({ positions: [...state.positions, position] })),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
}));
