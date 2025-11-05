import React from 'react';

const LoginFooter = () => {
  return (
    <div className="relative z-10 mt-8 text-center text-xs text-slate-400">
      <p>
        <a
          href="/武汉聚财众发私募基金管理有限公司用户协议.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          用户协议
        </a>
        <span className="mx-2">|</span>
        <a
          href="/武汉聚财众发私募基金管理有限公司隐私政策.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          隐私政策
        </a>
        <span className="mx-2">|</span>
        <a
          href="/武汉聚财众发私募基金管理有限公司版权信息.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          版权信息
        </a>
      </p>
      <p className="mt-2">&copy; 2024 聚财众发量化平台. All rights reserved.</p>
    </div>
  );
};

export default LoginFooter;
