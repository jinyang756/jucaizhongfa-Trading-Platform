import { create } from 'zustand';
import mockMarketData from '../api/mockMarketData';

const useTradeData = create((set) => ({
  marketData: [],
  fetchMarketData: async () => {
    const data = await mockMarketData.getMarketData();
    set({ marketData: data });
  },
}));

export default useTradeData;
