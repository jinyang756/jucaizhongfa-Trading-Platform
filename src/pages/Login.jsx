import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/useAuth.js';
import { useNavigate } from 'react-router-dom';
// import type { LoginCredentials } from '../types/auth';
import { config } from '../utils/env';
import { useSweetAlert } from '../hooks/useSweetAlert';
import useAppSound from '../hooks/useSound';
import { UserIcon, KeyIcon, EnvelopeIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/ui/input';
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
  const { login, sendVerificationCode } = useAuth();
  const { error, success, info } = useSweetAlert();
  const { playLogin, playAlert, playNotification, playButtonClick, playPageTransition } = useAppSound();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState('user');
  const [requiresEmailVerification, setRequiresEmailVerification] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    verificationCode: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerificationCode = async () => {
    if (!credentials.email) {
      error('请输入邮箱地址', '邮箱不能为空');
      return;
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      error('请输入有效的邮箱地址', '邮箱格式不正确');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendVerificationCode(credentials.email);
      if (result.success) {
        success('验证码已发送', '验证码已发送至您的邮箱，请查收');
      } else {
        error('发送验证码失败', result.message || '请稍后重试');
      }
    } catch (error) {
      console.error('Send verification code error:', error);
      error('发送验证码失败', `发送验证码时出现错误: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      error('请输入用户名和密码', '用户名和密码不能为空');
      return;
    }

    // 如果需要邮箱验证但未输入验证码
    if (requiresEmailVerification && !credentials.verificationCode.trim()) {
      error('请输入邮箱验证码', '验证码不能为空');
      return;
    }

    setIsSubmitting(true);

    try {
      const loginCredentials = {
        username: credentials.username,
        password: credentials.password,
        verificationCode: credentials.verificationCode,
      };

      const result = await login(loginCredentials, userType);
      if (result.success) {
        playLogin();
        success('登录成功', `欢迎${userType === 'admin' ? '基金管理人' : '会员'}登录`);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (result.requiresEmailVerification) {
        setRequiresEmailVerification(true);
        playNotification();
        info('需要邮箱验证', result.message || '请输入验证码进行验证');
      } else {
        playAlert();
        error('登录失败', result.message || '请检查用户名和密码');
      }
    } catch (error) {
      console.error('Login error:', error);
      error('登录失败', `登录时出现错误: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCredentials((prev) => ({ ...prev, password: '' }));
  };

  const handleBindEmail = async () => {
    if (!credentials.email) {
      error('请输入邮箱地址', '邮箱不能为空');
      return;
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      error('请输入有效的邮箱地址', '邮箱格式不正确');
      return;
    }

    // 在实际应用中，这里应该调用API绑定邮箱
    success('邮箱绑定成功', '邮箱绑定功能将在生产环境中实现');
  };

  useEffect(() => {
    console.log('API URL:', config.apiUrl);
    console.log('App Name:', config.appName);
    console.log('Is Dev:', config.isDev);
    playPageTransition();
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
            backgroundPosition: 'center',
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

          {/* 用户类型切换 - 基金管理人图标按钮 */}
          <div className="flex justify-end mb-6">
            {userType === 'user' ? (
              <button
                type="button"
                onClick={() => {
                  playButtonClick();
                  handleUserTypeChange('admin');
                  setRequiresEmailVerification(false);
                }}
                disabled={isSubmitting}
                className="p-2 rounded-full bg-indigo-900/50 hover:bg-indigo-800/70 transition-all border border-indigo-500/30 shadow-lg"
                title="切换到基金管理人登录"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-indigo-400" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playButtonClick();
                  handleUserTypeChange('user');
                  setRequiresEmailVerification(false);
                }}
                disabled={isSubmitting}
                className="p-2 rounded-full bg-indigo-900/50 hover:bg-indigo-800/70 transition-all border border-indigo-500/30 shadow-lg"
                title="切换到会员登录"
              >
                <UserIcon className="h-6 w-6 text-indigo-400" />
              </button>
            )}
          </div>

          {/* 登录标题 */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {userType === 'admin' ? '基金管理人登录' : '会员登录'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {userType === 'admin' ? '基金管理人专属入口' : '会员账户登录'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <Input
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
              <div className="absolute left-3 top-3 text-slate-400">
                <KeyIcon className="h-5 w-5" />
              </div>
              <Input
                type="password"
                name="password"
                placeholder="请输入密码"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[rgba(15,23,42,0.6)] border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all"
              />
            </div>

            {/* 邮箱绑定输入框 */}
            {userType === 'admin' && (
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-400">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="绑定邮箱（可选）"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[rgba(15,23,42,0.6)] border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={handleBindEmail}
                  disabled={isSubmitting}
                  className="absolute right-2 top-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded disabled:opacity-50"
                >
                  绑定
                </button>
              </div>
            )}

            {/* 邮箱验证码输入框 */}
            {requiresEmailVerification && (
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-400">
                  <KeyIcon className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  name="verificationCode"
                  placeholder="请输入邮箱验证码"
                  value={credentials.verificationCode}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-24 py-2.5 rounded-md bg-[rgba(15,23,42,0.6)] border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  disabled={isSubmitting}
                  className="absolute right-2 top-2 text-xs bg-amber-600 hover:bg-amber-700 text-white py-1 px-2 rounded disabled:opacity-50"
                >
                  获取验证码
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 mt-1 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/40 transform transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {requiresEmailVerification ? '验证中...' : '登录中...'}
                </div>
              ) : requiresEmailVerification ? (
                '验证并登录'
              ) : (
                '立即登录'
              )}
            </button>
          </form>

          {/* 合规与信任信息 */}
          <div className="border-t border-indigo-500/20 mt-6 pt-4 text-xs text-slate-400 space-y-2">
            <p className="flex items-center justify-center text-amber-300 font-semibold">
              <i className="far fa-shield-alt text-amber-400 mr-2"></i> 资金由
              <span className="mx-1 text-amber-300 font-semibold">中国银行</span>存管，安全可靠
            </p>
            <p className="flex items-center justify-center">
              <i className="far fa-certificate text-amber-400 mr-2"></i>{' '}
              证券投资咨询资质编号：ZX20240018
            </p>
            <p className="flex items-center justify-center">
              <i className="far fa-lock text-amber-400 mr-2"></i> 多重加密技术保障数据安全
            </p>
            <p className="flex items-center justify-center">
              <i className="far fa-check-circle text-amber-400 mr-2"></i> 严格遵守金融监管政策
            </p>
          </div>

          {/* ✅ Vite 开发环境测试账号提示 */}
          {config.isDev && (
            <div className="mt-4 p-3 bg-slate-800 border border-indigo-500/30 rounded-lg">
              <p className="text-xs text-slate-300 font-medium mb-1">🔧 开发环境测试账号：</p>
              <p className="text-xs text-slate-400 font-mono">
                {userType === 'admin' ? 'admin001-003 / 123456' : 'testuser01 / 8a3k7z9x'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {userType === 'admin' ? '基金管理人账号' : '会员账号'}
              </p>
            </div>
          )}
        </div>
      </div>
      <LoginFooter />
    </>
  );
};

export default Login;
