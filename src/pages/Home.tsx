import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">欢迎来到聚财众发量化交易平台</h1>
      <p className="mb-4">这是一个面向中国中产投资者的移动端优先金融科技平台。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">新购申购</h2>
          <p>新股认购服务</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">机构席位</h2>
          <p>机构专属交易通道</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">大宗交易</h2>
          <p>大额撮合交易</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">私募基金</h2>
          <p>高端理财产品</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">二元期权</h2>
          <p>快速收益工具</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
