const mockMarketData = {
  getMarketData: () => {
    // Simulate fetching market data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 'BTC', name: 'Bitcoin', price: 60000 + Math.random() * 1000, change: (Math.random() - 0.5) * 5 },
          { id: 'ETH', name: 'Ethereum', price: 3000 + Math.random() * 100, change: (Math.random() - 0.5) * 3 },
          { id: 'XRP', name: 'Ripple', price: 0.5 + Math.random() * 0.05, change: (Math.random() - 0.5) * 0.1 },
        ]);
      }, 1000);
    });
  },
};

export default mockMarketData;