import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';
import { useSimEngineStore } from '../utils/simEngine';

const FundContract = () => {
  const { user } = useAuth();
  const { fundContracts, fetchFundContracts, setContractResult } = useSimEngineStore();
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    // 获取基金合约数据
    fetchFundContracts();

    // 设置定时器定期更新数据
    const interval = setInterval(() => {
      fetchFundContracts();
    }, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, [fetchFundContracts]);

  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
  };

  const handleSetResult = async (result) => {
    if (!selectedContract) {
      alert('请选择合约');
      return;
    }

    // 使用 jcf-sim-engine 设置合约结果
    try {
      await setContractResult(selectedContract.contract_id, result);
      alert(`合约结果设置为${result === 'win' ? '盈利' : '亏损'}成功！`);
    } catch (error) {
      alert(`设置合约结果失败: ${error.message}`);
    }
  };

  const getTypeText = (type) => {
    return type === 'shanghai' ? '沪市' : '港市';
  };

  const getDirectionText = (direction) => {
    return direction === 'call' ? '看涨' : '看跌';
  };

  const getStatusText = (status) => {
    const statusMap = {
      open: '开放',
      won: '盈利',
      lost: '亏损',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      open: 'blue',
      won: 'green',
      lost: 'red',
    };
    return colorMap[status] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">基金合约</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 - 合约列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">基金合约列表</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">类型</th>
                      <th className="text-left py-2">执行价</th>
                      <th className="text-left py-2">方向</th>
                      <th className="text-left py-2">成本</th>
                      <th className="text-left py-2">状态</th>
                      <th className="text-left py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundContracts.map((contract) => (
                      <tr
                        key={contract.contract_id}
                        className="border-b border-gray-700 hover:bg-gray-750"
                      >
                        <td className="py-3">{getTypeText(contract.type)}</td>
                        <td className="py-3">¥{contract.strike_price.toFixed(2)}</td>
                        <td className="py-3">
                          <span style={{ color: contract.direction === 'call' ? 'green' : 'red' }}>
                            {getDirectionText(contract.direction)}
                          </span>
                        </td>
                        <td className="py-3">¥{contract.cost.toFixed(2)}</td>
                        <td className="py-3">
                          <span style={{ color: getStatusColor(contract.status) }}>
                            {getStatusText(contract.status)}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleContractSelect(contract)}
                            className="bg-indigo-600 hover:bg-indigo-700 py-1 px-3 rounded text-sm transition-colors"
                          >
                            选择
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧 - 合约详情和操作面板 */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">合约详情</h2>

              {selectedContract ? (
                <div className="space-y-4">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <h3 className="font-semibold">合约信息</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      合约ID: {selectedContract.contract_id}
                    </p>
                    <p className="mt-2">类型: {getTypeText(selectedContract.type)}</p>
                    <p className="mt-1">执行价: ¥{selectedContract.strike_price.toFixed(2)}</p>
                    <p className="mt-1">
                      方向:
                      <span
                        style={{ color: selectedContract.direction === 'call' ? 'green' : 'red' }}
                      >
                        {getDirectionText(selectedContract.direction)}
                      </span>
                    </p>
                    <p className="mt-1">成本: ¥{selectedContract.cost.toFixed(2)}</p>
                    <p className="mt-1">
                      状态:
                      <span style={{ color: getStatusColor(selectedContract.status) }}>
                        {getStatusText(selectedContract.status)}
                      </span>
                    </p>
                    {selectedContract.profit !== undefined && (
                      <p className="mt-1">
                        盈利:
                        <span style={{ color: selectedContract.profit >= 0 ? 'green' : 'red' }}>
                          ¥{selectedContract.profit.toFixed(2)}
                        </span>
                      </p>
                    )}
                  </div>

                  {selectedContract.status === 'open' && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">设置结果</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSetResult('win')}
                          className="flex-1 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
                        >
                          盈利
                        </button>
                        <button
                          onClick={() => handleSetResult('loss')}
                          className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
                        >
                          亏损
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>请选择合约查看详情</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="font-semibold mb-2">账户信息</h3>
                <p>可用余额: ¥{user.currentBalance.toFixed(2)}</p>
                <button
                  onClick={() => navigate('/fund-logs/1')}
                  className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  查看合约记录 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundContract;
