const LoginFooter = () => {
  return (
    <div className="mt-8 text-center text-xs text-gray-500">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-center space-x-4">
          <a
            href="/武汉聚财众发私募基金管理有限公司用户协议.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            会员协议
          </a>
          <span>|</span>
          <a
            href="/武汉聚财众发私募基金管理有限公司隐私政策.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            隐私政策
          </a>
          <span>|</span>
          <a
            href="/武汉聚财众发私募基金管理有限公司版权信息.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            版权信息
          </a>
        </div>
        <div className="mt-2">
          <p>© 2024 武汉聚财众发私募基金管理有限公司. 保留所有权利.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;
