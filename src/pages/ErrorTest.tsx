import React, { useState } from 'react';
import { ErrorThrower } from '../components/ErrorBoundary';

const ErrorTest: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">错误边界测试页面</h1>
      
      <div className="mb-4">
        <button
          onClick={() => setShouldThrow(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          触发错误
        </button>
      </div>
      
      <div className="p-4 border rounded">
        <ErrorThrower shouldThrow={shouldThrow} />
      </div>
    </div>
  );
};

export default ErrorTest;