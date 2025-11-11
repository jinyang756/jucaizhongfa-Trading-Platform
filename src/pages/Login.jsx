import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
// import type { LoginCredentials } from '../types/auth';
import { config } from '../utils/env';
import { useSweetAlert } from '../hooks/useSweetAlert';
import useAppSound from '../hooks/useSound';
import {
  UserIcon,
  KeyIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
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
  const { playLogin, playAlert, playNotification, playButtonClick, playPageTransition } =
    useAppSound();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState('user');
  const [requiresEmailVerification, setRequiresEmailVerification] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    verificationCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted with credentials:', credentials);

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

      console.log('Calling login function with:', loginCredentials, userType);
      const result = await login(loginCredentials, userType);
      console.log('Login result:', result);

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

  useEffect(() => {
    console.log('API URL:', config.apiUrl);
    console.log('App Name:', config.appName);
    console.log('Is Dev:', config.isDev);
    playPageTransition();
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center flex-col bg-gray-100">
        {/* 登录卡片 */}
        <div className="form-container bg-white shadow-lg rounded-lg box-border p-6 w-11/12 max-w-sm">
          <div className="title text-center font-sans mb-6 mt-2 text-2xl font-bold">
            聚财众发量化平台
          </div>

          {/* 登录标题 */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              {userType === 'admin' ? '基金管理人登录' : '会员登录'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="form w-full flex flex-col gap-4 mb-4">
            <Input
              type="text"
              name="username"
              placeholder="请输入用户名"
              required
              value={credentials.username}
              onChange={handleInputChange}
              className="input rounded-2xl border border-gray-300 outline-none box-sizing p-3 w-full"
            />
            <Input
              type="password"
              name="password"
              placeholder="请输入密码"
              required
              value={credentials.password}
              onChange={handleInputChange}
              className="input rounded-2xl border border-gray-300 outline-none box-sizing p-3 w-full"
            />

            {/* 邮箱验证码输入框 */}
            {requiresEmailVerification && (
              <div className="relative">
                <Input
                  type="text"
                  name="verificationCode"
                  placeholder="请输入邮箱验证码"
                  value={credentials.verificationCode}
                  onChange={handleInputChange}
                  className="input rounded-2xl border border-gray-300 outline-none box-sizing p-3 w-full"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="form-btn rounded-2xl border-0 outline-none bg-teal-500 text-white cursor-pointer shadow-md p-2.5 font-sans"
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
          <div className="border-t border-gray-300 mt-6 pt-4 text-xs text-gray-500 space-y-2">
            <p className="flex items-center justify-center text-teal-600 font-semibold">
              <i className="far fa-shield-alt text-teal-500 mr-2"></i> 资金由
              <span className="mx-1 text-teal-600 font-semibold">中国银行</span>存管，安全可靠
            </p>
            <p className="flex items-center justify-center">
              <i className="far fa-lock text-teal-500 mr-2"></i> 多重加密技术保障数据安全
            </p>
            <p className="flex items-center justify-center">
              <i className="far fa-check-circle text-teal-500 mr-2"></i> 严格遵守金融监管政策
            </p>
          </div>

          {/* ✅ Vite 开发环境测试账号提示 */}
          {config.isDev && (
            <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-xs text-gray-600 font-medium mb-1">🔧 开发环境测试账号：</p>
              <p className="text-xs text-gray-500 font-mono">
                {userType === 'admin' ? 'admin001-003 / 12345' : 'testuser01 / 8a3k7z9x'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {userType === 'admin' ? '基金管理人账号' : '会员账号'}
              </p>
            </div>
          )}
          {/* 用户类型切换 */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              {userType === 'admin' ? (
                <span>
                  基金管理人登录？
                  <span
                    className="sign-up-link ml-1 text-xs underline text-teal-600 cursor-pointer font-bold font-sans"
                    onClick={() => {
                      playButtonClick();
                      handleUserTypeChange('user');
                      setRequiresEmailVerification(false);
                    }}
                  >
                    切换到会员登录
                  </span>
                </span>
              ) : (
                <span>
                  会员登录？
                  <span
                    className="sign-up-link ml-1 text-xs underline text-teal-600 cursor-pointer font-bold font-sans"
                    onClick={() => {
                      playButtonClick();
                      handleUserTypeChange('admin');
                      setRequiresEmailVerification(false);
                    }}
                  >
                    切换到基金管理人登录
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
  );
};

export default Login;
