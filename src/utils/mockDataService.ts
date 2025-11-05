type PriceTick = { symbol: string; price: number; ts: number };

let timer: number | undefined;
const currentPrices: { [key: string]: number } = {}; // 存储每个符号的当前价格

export function startDataSimulation(symbols: string[] = ['F0001'], intervalMs: number = 2000) {
  stopDataSimulation();
  
  symbols.forEach(symbol => {
    currentPrices[symbol] = 100; // 初始化每个符号的价格
  });

  timer = window.setInterval(() => {
    symbols.forEach(symbol => {
      const drift = (Math.random() - 0.5) * 2; // [-1, 1]
      currentPrices[symbol] = Math.max(1, currentPrices[symbol] + drift);
      const payload: PriceTick = { symbol, price: parseFloat(currentPrices[symbol].toFixed(2)), ts: Date.now() };
      window.dispatchEvent(new CustomEvent('mock-price-tick', { detail: payload }));
    });
  }, intervalMs);
}

export function stopDataSimulation() {
  if (timer) {
    window.clearInterval(timer);
    timer = undefined;
  }
  for (const symbol in currentPrices) {
    delete currentPrices[symbol]; // 清除价格
  }
}