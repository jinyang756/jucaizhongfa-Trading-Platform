import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/useAuth.js';
import { useNavigate } from 'react-router-dom';
// import type { LoginCredentials } from '../types/auth';
import { config } from '../config/env';
import { showToast } from '../utils/showToast';
import backgroundImage from '../assets/jucai.jpg';
import LoginFooter from '../components/LoginFooter';

/**
 * 登录页组件（高对比度赛博金融风格）
 * - 深蓝背景 + 粒子渐变动画
 * - 玻璃态居中卡片 + 品牌渐变文字
 * - 带图标的输入框 + 发光登录按钮
 * - 合规资质与信任信息区域
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState('user');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
    } catch (error) {
      console.error('Login error:', error);
      showToast(`登录失败: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCredentials(prev => ({ ...prev, password: '' }));
  };

  useEffect(() => {
    console.log('API URL:', config.apiUrl);
    console.log('App Name:', config.appName);
    console.log('Is Dev:', config.isDev);
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            opacity: 30,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
    
        {/* 粒子渐变层 */}
        <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.15),transparent_70%)]"></div>
    
        {/* 登录卡片 */}
        <div className="relative z-10 w-11/12 max-w-sm bg-[rgba(15,23,42,0.75)] rounded-2xl p-8 border border-indigo-500/30 backdrop-blur-xl shadow-2xl text-slate-200 animate-fade-in hover:-translate-y-1 hover:shadow-indigo-500/30 hover:shadow-lg transition-all">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              聚财众发量化平台
            </h1>
            <p className="text-sm text-slate-400 mt-1">专业 · 安全 · 智能的一站式金融系统</p>
          </div>
    
          {/* 用户类型切换 */}
          <div className="flex mb-6 bg-slate-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleUserTypeChange('user')}
              disabled={isSubmitting}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'user'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
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
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              管理员登录
            </button>
          </div>
    
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <i className="far fa-user absolute left-3 top-3 text-slate-400"></i>
              <input
                type="text"
                name="username"
                placeholder="请输入用户名"
                required
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[rgba(15,23,42,0.6)] border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all"
              />
            </div>
            <div className="relative">
              <i className="far fa-lock absolute left-3 top-3 text-slate-400"></i>
              <input
                type="password"
                name="password"
                placeholder="请输入密码"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[rgba(15,23,42,0.6)] border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all"
              />
            </div>
    
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 mt-1 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/40 transform transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  登录中...
                </div>
              ) : (
                '立即登录'
              )}
            </button>
          </form>
    
          {/* 合规与信任信息 */}
          <div className="border-t border-indigo-500/20 mt-6 pt-4 text-xs text-slate-400 space-y-2">
            <p className="flex items-center justify-center text-amber-300 font-semibold"><i className="far fa-shield-alt text-amber-400 mr-2"></i> 资金由<span className="mx-1 text-amber-300 font-semibold">中国银行</span>存管，安全可靠</p>
            <p className="flex items-center justify-center"><i className="far fa-certificate text-amber-400 mr-2"></i> 证券投资咨询资质编号：ZX20240018</p>
            <p className="flex items-center justify-center"><i className="far fa-lock text-amber-400 mr-2"></i> 多重加密技术保障数据安全</p>
            <p className="flex items-center justify-center"><i className="far fa-check-circle text-amber-400 mr-2"></i> 严格遵守金融监管政策</p>
          </div>
  
          {/* ✅ Vite 开发环境测试账号提示 */}
          {config.isDev && (
            <div className="mt-4 p-3 bg-slate-800 border border-indigo-500/30 rounded-lg">
              <p className="text-xs text-slate-300 font-medium mb-1">🔧 开发环境测试账号：</p>
              <p className="text-xs text-slate-400 font-mono">
                {userType === 'admin' ? 'admin001 / jczf@2025' : 'testuser01 / 8a3k7z9x'}
              </p>
            </div>
          )}
        </div>
      </div>
      <LoginFooter />
    </>
  );
}

export default Login;
