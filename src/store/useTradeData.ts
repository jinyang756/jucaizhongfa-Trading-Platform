import { create } from 'zustand';

interface TradeDataState {
  // 添加交易数据状态的类型定义
  portfolioValue: number;
  dailyProfit: number;
  positions: any[];
  transactions: any[];
  updatePortfolioValue: (value: number) => void;
  updateDailyProfit: (profit: number) => void;
  addPosition: (position: any) => void;
  addTransaction: (transaction: any) => void;
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
