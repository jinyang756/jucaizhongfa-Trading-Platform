import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { LoginCredentials } from '../types/auth';
import { config } from '../config/env';
import { showToast } from '../utils/showToast';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'user'>('user');
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      showToast('请输入用户名和密码', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(credentials, userType);
      if (result.success) {
        navigate('/');
      } else {
        showToast(result.message || '登录失败，请检查用户名和密码', 'error');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      showToast(`登录失败: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserTypeChange = (type: 'admin' | 'user') => {
    setUserType(type);
    setCredentials(prev => ({ ...prev, password: '' }));
  };

  useEffect(() => {
    console.log('API URL:', config.apiUrl);
    console.log('App Name:', config.appName);
    console.log('Is Dev:', config.isDev);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo和标题 */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">聚财众发</h2>
            <p className="mt-2 text-gray-600">基金交易平台</p>
          </div>

          {/* 用户类型切换 */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleUserTypeChange('user')}
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'user'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              用户登录
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange('admin')}
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'admin'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              管理员登录
            </button>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                disabled={isSubmitting}
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="请输入用户名"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                disabled={isSubmitting}
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="请输入密码"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={isSubmitting}
              style={{ backgroundColor: 'blue' }}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  登录中...
                </div>
              ) : (
                '登录'
              )}
            </button>
          </form>

          {/* 提示信息 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {userType === 'admin' ? '管理员账号由系统分配' : '如需注册账号，请联系管理员'}
            </p>
          </div>

          {/* ✅ Vite 开发环境测试账号提示 */}
          {config.isDev && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-600 font-medium mb-1">🔧 开发环境测试账号：</p>
              <p className="text-xs text-blue-600 font-mono">
                {userType === 'admin' ? 'admin001 / jczf@2025' : 'testuser01 / 8a3k7z9x'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};