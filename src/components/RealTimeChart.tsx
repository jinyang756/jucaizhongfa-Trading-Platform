import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceData {
  time: string;
  price: number;
  symbol: string; // Add symbol to PriceData interface
}

export default function RealTimeChart({ symbol = 'F0001' }: { symbol?: string }) {
  const [data, setData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  // State for controlling custom Tooltip
  const [activeTooltip, setActiveTooltip] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    // 初始化历史数据
    const initialData: PriceData[] = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000);
      initialData.push({
        time: time.toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5),
        price: 100 + (Math.random() - 0.5) * 20, // Initial random price around 100
        symbol: symbol
      });
    }
    
    setData(initialData);
    setCurrentPrice(initialData[initialData.length - 1].price);

    const handlePriceTick = (event: Event) => {
      const customEvent = event as CustomEvent<{ symbol: string; price: number; ts: number }>;
      if (customEvent.detail.symbol === symbol) {
        const newPrice = customEvent.detail.price;
        const now = new Date(customEvent.detail.ts);

        setCurrentPrice(newPrice);
        setData(prevData => {
          const newData = [...prevData.slice(1), {
            time: now.toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5),
            price: newPrice,
            symbol: symbol
          }];
          return newData;
        });
      }
    };

    window.addEventListener('mock-price-tick', handlePriceTick);

    return () => {
      window.removeEventListener('mock-price-tick', handlePriceTick);
    };
  }, [symbol]); // Add symbol to dependency array

  // Custom Tooltip event handlers
  const handleChartClick = (data: any) => {
    if (isMobile && data && data.activePayload) {
      setActiveTooltip(true);
    } else if (isMobile) {
      setActiveTooltip(false);
    }
  };

  const handleChartMouseLeave = () => {
    if (!isMobile) {
      setActiveTooltip(false);
    }
  };

  // 计算涨跌状态
  const priceChange = data.length > 1
    ? ((currentPrice - data[0].price) / data[0].price * 100).toFixed(2)
    : '0.00';
  const isUp = parseFloat(priceChange) > 0;

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{symbol}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: isUp ? '#ef4444' : '#10b981' }}>
            ${currentPrice.toLocaleString()}
          </div>
          <div className={`text-sm ${isUp ? 'text-red-500' : 'text-green-500'}`}>
            {isUp ? '+' : ''}{priceChange}%
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={data}
          onClick={handleChartClick}
          onMouseLeave={handleChartMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            domain={['dataMin - 50', 'dataMax + 50']}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
              cursor={isMobile ? false : true}
              active={isMobile ? activeTooltip : undefined}
              formatter={(value: number) => [`${value}%`, '价格']}
              labelFormatter={(label) => `时间: ${label}`}
            />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUp ? '#ef4444' : '#10b981'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}