import React from 'react';

const ErrorTest = () => {
  const handleThrowError = () => {
    throw new Error('This is a test error for error boundary');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">错误测试页面</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">错误边界测试</h2>
        <p className="mb-4">点击下面的按钮来测试错误边界功能：</p>
        <button
          onClick={handleThrowError}
          className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition-colors"
        >
          抛出错误
        </button>
      </div>
    </div>
  );
};

export default ErrorTest;
