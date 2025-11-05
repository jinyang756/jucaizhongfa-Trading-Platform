import React from 'react';

const Trade: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">交易页面</h1>
      <p className="mb-4">在这里您可以进行各种金融产品的交易。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">基金交易</h2>
          <p>进行基金产品的申购和赎回</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">期权交易</h2>
          <p>进行二元期权交易</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">合约交易</h2>
          <p>进行金融合约交易</p>
        </div>
      </div>
    </div>
  );
};

export default Trade;