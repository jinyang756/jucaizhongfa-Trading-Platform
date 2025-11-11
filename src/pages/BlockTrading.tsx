import { useState, useEffect, type ChangeEvent } from 'react';
import { useSimEngineStore } from '../utils/simEngine';

const BlockTrading = () => {
  const { blockTrades, fetchBlockTrades, executeBlockTrade } = useSimEngineStore();
  const [tradeData, setTradeData] = useState({
    stockCode: '',
    stockName: '',
    price: '',
    quantity: '',
    buyer: '',
    seller: '',
    discountRate: '',
  });

  useEffect(() => {
    fetchBlockTrades();
    const interval = setInterval(() => {
      fetchBlockTrades();
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchBlockTrades]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTradeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExecuteTrade = async () => {
    if (
      !tradeData.stockCode ||
      !tradeData.stockName ||
      !tradeData.price ||
      !tradeData.quantity ||
      !tradeData.buyer ||
      !tradeData.seller
    ) {
      alert('请填写完整的交易信息');
      return;
    }

    const price = parseFloat(tradeData.price);
    const quantity = parseInt(tradeData.quantity, 10);
    const discountRate = parseFloat(tradeData.discountRate) || 0;

    if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      alert('请输入有效的价格和数量');
      return;
    }

    try {
      const result = await executeBlockTrade(
        tradeData.stockCode,
        tradeData.stockName,
        price,
        quantity,
        tradeData.buyer,
        tradeData.seller,
        discountRate,
      );

      if (result) {
        alert('大宗交易执行成功！');
        setTradeData({
          stockCode: '',
          stockName: '',
          price: '',
          quantity: '',
          buyer: '',
          seller: '',
          discountRate: '',
        });
      } else {
        alert('大宗交易执行失败');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`交易执行失败: ${error.message}`);
      } else {
        alert('发生未知错误');
      }
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: '待处理',
      completed: '完成',
      cancelled: '取消',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      pending: 'orange',
      completed: 'green',
      cancelled: 'red',
    };
    return colorMap[status] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">大宗交易</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">执行大宗交易</h2>
              <div className="space-y-4">
                <input
                  name="stockCode"
                  value={tradeData.stockCode}
                  onChange={handleInputChange}
                  placeholder="股票代码"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="stockName"
                  value={tradeData.stockName}
                  onChange={handleInputChange}
                  placeholder="股票名称"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="price"
                  value={tradeData.price}
                  onChange={handleInputChange}
                  placeholder="价格"
                  type="number"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="quantity"
                  value={tradeData.quantity}
                  onChange={handleInputChange}
                  placeholder="数量"
                  type="number"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="buyer"
                  value={tradeData.buyer}
                  onChange={handleInputChange}
                  placeholder="买方"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="seller"
                  value={tradeData.seller}
                  onChange={handleInputChange}
                  placeholder="卖方"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <input
                  name="discountRate"
                  value={tradeData.discountRate}
                  onChange={handleInputChange}
                  placeholder="折扣率 (%)"
                  type="number"
                  className="w-full bg-gray-700 rounded px-3 py-2"
                />
                <button
                  onClick={handleExecuteTrade}
                  className="w-full py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700"
                >
                  执行交易
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">大宗交易记录</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">股票代码</th>
                      <th className="text-left py-2">股票名称</th>
                      <th className="text-left py-2">价格</th>
                      <th className="text-left py-2">数量</th>
                      <th className="text-left py-2">买方</th>
                      <th className="text-left py-2">卖方</th>
                      <th className="text-left py-2">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockTrades.map((trade) => (
                      <tr
                        key={trade.trade_id}
                        className="border-b border-gray-700 hover:bg-gray-750"
                      >
                        <td className="py-3">{trade.stock_code}</td>
                        <td className="py-3">{trade.stock_name}</td>
                        <td className="py-3">¥{trade.price.toFixed(2)}</td>
                        <td className="py-3">{trade.quantity}</td>
                        <td className="py-3">{trade.buyer}</td>
                        <td className="py-3">{trade.seller}</td>
                        <td className="py-3">
                          <span style={{ color: getStatusColor(trade.status) }}>
                            {getStatusText(trade.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockTrading;
