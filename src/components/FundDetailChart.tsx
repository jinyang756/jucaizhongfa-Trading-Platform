import { useCallback, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { supabase } from '../supabase';
import { format, addMonths, subMonths } from 'date-fns';

// 定义基金业绩数据接口
interface FundPerformanceData {
  date: string;
  price: number;
  benchmark: number;
}

export default function FundDetailChart({ fundId }: { fundId: number }) {
  const [performanceData, setPerformanceData] = useState<FundPerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y'>('1Y');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  // State for controlling custom Tooltip
  const [activeTooltip, setActiveTooltip] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchFundPerformance = useCallback(async () => {
    try {
      setLoading(true);

      // 计算时间范围
      const endDate = new Date();
      let startDate: Date;

      switch (timeRange) {
        case '1M':
          startDate = subMonths(endDate, 1);
          break;
        case '3M':
          startDate = subMonths(endDate, 3);
          break;
        case '6M':
          startDate = subMonths(endDate, 6);
          break;
        default:
          startDate = subMonths(endDate, 12);
      }

      // 从Supabase获取基金业绩数据
      const { data } = await supabase
        .from('fund_orders')
        .select('invest_time, yield_amount')
        .eq('fund_id', fundId)
        .gte('invest_time', startDate.toISOString())
        .lte('invest_time', endDate.toISOString())
        .order('invest_time');

      if (data) {
        // 处理数据，按月聚合
        const monthlyData: Record<string, { price: number; count: number }> = {};

        data.forEach((item: { invest_time: string; yield_amount: number }) => {
          const month = format(new Date(item.invest_time), 'yyyy-MM');
          if (!monthlyData[month]) {
            monthlyData[month] = { price: 0, count: 0 };
          }
          monthlyData[month].price += Number(item.yield_amount) || 0;
          monthlyData[month].count++;
        });

        // 生成图表数据
        const chartData: FundPerformanceData[] = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
          const month = format(currentDate, 'yyyy-MM');
          const avgPrice = monthlyData[month]
            ? (monthlyData[month].price / monthlyData[month].count).toFixed(2)
            : '0';

          chartData.push({
            date: format(currentDate, 'MMM'),
            price: parseFloat(avgPrice),
            benchmark: parseFloat(avgPrice) * (0.8 + Math.random() * 0.4), // 模拟基准收益
          });

          currentDate = addMonths(currentDate, 1);
        }

        setPerformanceData(chartData);
      }
    } catch (error) {
      console.error('获取基金业绩数据失败:', error);
    } finally {
      setLoading(false);
    }
  }, [fundId, timeRange]);

  useEffect(() => {
    fetchFundPerformance();
  }, [fetchFundPerformance]);

  // Custom Tooltip event handlers
  const handleChartClick = (data: unknown) => {
    if (
      isMobile &&
      data &&
      typeof data === 'object' &&
      'activePayload' in data &&
      data.activePayload
    ) {
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

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">基金业绩表现</h3>
        <div className="flex space-x-2">
          {(['1M', '3M', '6M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">加载中...</div>
      ) : (
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart
            data={performanceData}
            onClick={handleChartClick}
            onMouseLeave={handleChartMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" axisLine={{ stroke: '#e5e7eb' }} />
            <YAxis axisLine={{ stroke: '#e5e7eb' }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              cursor={isMobile ? false : true}
              active={isMobile ? activeTooltip : undefined}
              formatter={(value: number) => [`${value}%`, '收益率']}
              labelFormatter={(label) => `月份: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="price"
              name="基金收益率"
              stroke="#00D4AA"
              fill="rgba(0, 212, 170, 0.1)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              name="基准收益率"
              stroke="#646cff"
              fill="rgba(100, 108, 255, 0.1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
