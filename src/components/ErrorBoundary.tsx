import React, { Component } from 'react';
import { useToast } from './Toast';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// 错误边界组件，用于捕获子组件中的JavaScript错误
class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 可以在这里记录错误信息
    console.error('ErrorBoundary捕获到错误:', error, errorInfo);
    // 在这里调用Toast显示错误信息
    // 注意：在类组件中直接使用hook是不允许的，需要通过props传递或使用高阶组件
    // 暂时不在这里直接调用showToast，而是通过外部包装组件传递
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // 如果提供了自定义的fallback，则使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // 默认的错误UI
      return (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                页面出现错误
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {this.state.error?.message || '发生未知错误，请刷新页面重试'}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  刷新页面
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 包装组件，结合Toast通知
export const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const { showToast } = useToast(); // 在函数组件中使用useToast

  // 使用一个内部组件来捕获错误并触发Toast
  class InnerErrorBoundary extends ErrorBoundaryClass {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      super.componentDidCatch(error, errorInfo);
      showToast(error.message || '发生未知错误', 'error'); // 通过Toast显示错误
    }
  }

  return (
    <InnerErrorBoundary fallback={fallback}>
      {children}
    </InnerErrorBoundary>
  );
};

// 用于测试的错误组件
export const ErrorThrower: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('这是一个测试错误');
  }
  return <div>如果你看到这个，说明没有抛出错误</div>;
};

export default ErrorBoundary;