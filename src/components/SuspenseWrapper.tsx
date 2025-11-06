import React, { Suspense } from 'react';
import { Spin } from 'antd';

interface SuspenseWrapperProps {
  children: React.ReactNode;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <Spin size="large" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;