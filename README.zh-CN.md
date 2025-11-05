# 🚀 聚财众发量化交易平台 | Accumulate wealth Pro Trading Platform

<div align="center">

[聚财众发|JUCAIZHONGFA]

**专业 · 安全 · 智能 的一站式金融交易系统**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)

[在线演示](https://jucaizhongfa-trading-platform.vercel.app) · [报告问题](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) · [功能建议](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues/new)

</div>

## 📖 项目简介

**聚财众发量化交易平台** 是一款面向中国中产投资者的移动端优先金融科技平台，整合了：

- 🛒 **新购申购**：新股认购服务
- 🏢 **机构席位**：机构专属交易通道
- 🤝 **大宗交易**：大额撮合交易
- 🛡️ **私募基金**：高端理财产品
- 📊 **二元期权**：快速收益工具

### 🎯 核心特性

| 功能模块            | 描述                                                     |
| ------------------- | -------------------------------------------------------- |
| 🎨 **赛博金融主题** | 深色玻璃态设计，霓虹渐变交互，支持红涨绿跌配色           |
| 📱 **移动端优先**   | 完美适配手机浏览器，支持微信内置浏览器                   |
| 🤖 **AI 智能助理**  | 实时行情解读、智能选股、一键跟单                         |
| 📈 **专业级图表**   | 基于 ECharts / Recharts 的 K线图、多指标叠加、趋势线绘制 |
| 🔒 **安全可信**     | 模拟银行存管、证监会资质展示、SSL 加密                   |
| ⚡ **极致性能**     | Lighthouse 评分 90+，首屏加载 < 1.5s                     |

## 🛠️ 技术栈

### 前端核心

- **框架**：React ^19.1.1, React Router DOM ^7.9.5
- **UI 组件库**：Ant Design ^5.28.0, Ant Design Icons ^6.1.0
- **状态管理**：Zustand ^5.0.8
- **样式处理**：Tailwind CSS ^4.1.16, PostCSS ^8.5.6
- **图表组件**：ECharts ^6.0.0, Recharts ^3.3.0
- **数据交互**：Supabase JS ^2.78.0
- **工具库**：date-fns ^4.1.0, uuid ^13.0.0, xlsx ^0.18.5

### 工程化与质量

- **构建工具**：Vite (rolldown-vite@7.1.14), TypeScript ~5.9.3
- **代码质量**：ESLint ^9.39.1, Prettier ^3.6.2, Husky ^9.1.7
- **测试工具**：Cypress ^15.6.0 (E2E)

### 部署与运维

- **托管平台**：Vercel
- **CI/CD**：GitHub Actions

## 📂 项目结构

```
jucaizhongfa-Trading-Platform/
├── public/                 # 静态资源
├── scripts/                # 脚本文件 (e.g., db schema/init)
├── src/
│   ├── api/                # 接口封装（模拟数据 + 真实接口）
│   ├── assets/             # 静态资源文件 (images, icons)
│   ├── components/         # 可复用组件
│   │   ├── BottomNavigationBar.tsx     # 底部导航栏（会员）
│   │   ├── ManagerNavigationBar.tsx    # 基金管理人导航栏
│   │   ├── TopNavigationBar.tsx        # 顶部导航栏
│   │   ├── RealTimeChart.tsx           # 实时图表组件
│   │   ├── ProtectedRoute.tsx          # 受保护路由
│   │   └── Toast.tsx                   # 消息提示组件
│   ├── hooks/              # 自定义 Hook
│   │   ├── useSupabase.ts              # Supabase 数据交互 Hook
│   │   └── useToast.tsx                # 消息提示 Hook
│   ├── pages/              # 页面组件
│   │   ├── Login.jsx                   # 登录页
│   │   ├── Home.tsx                    # 首页
│   │   ├── Trade.tsx                   # 交易大厅
│   │   ├── Profile.tsx                 # 个人中心
│   │   ├── TradeDashboard.jsx          # 交易仪表板
│   │   ├── FundTrading.jsx             # 基金交易
│   │   ├── ContractTrading.jsx         # 合约交易
│   │   ├── OptionTrading.jsx           # 期权交易
│   │   ├── BlockTrading.jsx            # 大宗交易
│   │   ├── IPOSubscription.jsx         # 新股申购
│   │   ├── Positions.tsx               # 持仓管理
│   │   ├── TransactionHistory.tsx      # 交易历史
│   │   ├── ProfilePage.jsx             # 个人资料
│   │   ├── AccountSettings.jsx         # 账户设置
│   │   ├── FundLogs.jsx                # 基金日志
│   │   ├── AdminDashboard.tsx          # 管理员仪表盘
│   │   ├── AdminUsers.jsx              # 会员管理
│   │   ├── AdminFunds.tsx              # 基金管理
│   │   ├── AdminContracts.tsx          # 合约管理
│   │   ├── AdminOptions.tsx            # 期权管理
│   │   ├── ManagerDashboard.tsx        # 基金管理人首页
│   │   ├── MemberManagement.tsx        # 会员管理
│   │   ├── TradeManagement.tsx         # 交易管理
│   │   ├── DataIntegration.tsx         # 数据集成
│   │   └── SystemSettings.tsx          # 系统设置
│   ├── store/              # Zustand 状态管理
│   │   ├── useAuth.ts                  # 会员认证
│   │   └── useToastStore.js            # 消息提示状态
│   ├── utils/              # 工具函数
│   │   ├── authService.ts              # 认证服务
│   │   ├── supabase.ts                 # Supabase 配置
│   │   ├── supabaseService.ts          # Supabase 服务
│   │   ├── tradeValidation.ts          # 交易验证
│   │   ├── mockDataService.ts          # 模拟数据服务
│   │   ├── mockProducts.ts             # 模拟产品数据
│   │   ├── exportExcel.ts              # Excel 导出
│   │   ├── helpers.ts                  # 辅助函数
│   │   └── validation.ts               # 表单验证
│   ├── styles/             # 全局样式
│   │   └── globalStyles.css            # 全局样式
│   ├── App.tsx             # 主应用入口
│   ├── auth.ts             # 认证类型定义
│   └── main.tsx            # 应用入口文件
├── .env.example            # 环境变量示例
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 项目文档
```

## 🎨 设计系统

### 色彩规范（赛博金融主题）

| 用途   | 颜色名称 | Hex       | CSS 变量       |
| ------ | -------- | --------- | -------------- |
| 主背景 | 深空蓝   | `#0A0E27` | `--bg-dark`    |
| 品牌色 | 赛博紫   | `#6366F1` | `--primary`    |
| 上涨   | 信号红   | `#EF4444` | `--price-up`   |
| 下跌   | 活力绿   | `#10B981` | `--price-down` |
| 强调色 | 霓虹金   | `#FFD700` | `--accent`     |

### 响应式断点

- **移动端**：`< 640px`
- **平板**：`640px - 1024px`
- **桌面**：`> 1024px`

## 🔑 环境变量配置

创建 `.env` 文件（参考 `.env.example`）：

```env
# API 配置
VITE_API_BASE_URL=https://api.example.com
VITE_TUSHARE_TOKEN=your_tushare_token_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Firebase 配置（可选）
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# 微信支付（模拟）
VITE_WECHAT_APP_ID=wx1234567890
```

## 📱 移动端适配说明

### 微信内置浏览器兼容

- ✅ 已测试微信 iOS/Android 版本
- ✅ 禁用横屏模式
- ✅ 适配安全区域（刘海屏）

### 性能优化

- 图片懒加载
- 路由代码分割
- ECharts / Recharts Canvas 优化
- 本地缓存（IndexedDB）

## 🧪 测试

### 运行单元测试

```bash
npm run test
```

### 运行 E2E 测试

```bash
npm run test-e2e # 使用 Playwright
npm run e2e:open # 启动 Cypress UI
```

### 测试覆盖率

```bash
npm run test:coverage
```

## 📦 部署指南

### Vercel 部署（推荐）

1. **连接 GitHub 仓库**
   - 登录 [Vercel](https://vercel.com)
   - 导入项目：`https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git`

2. **配置环境变量**
   - 在 Vercel 项目设置中添加 `.env` 中的变量 (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

3. **自动部署**
   - 每次 `git push` 到 `main` 分支，自动触发部署

### 手动部署

```bash
# 构建项目
npm run build

# 部署到服务器
scp -r dist/* user@server:/var/www/html/
```

## 🤝 贡献指南

我们非常欢迎并感谢您对 **聚财众发量化交易平台** 项目的贡献！您的参与是项目持续发展的重要动力。在您开始贡献之前，请花几分钟阅读以下指南，以确保您的贡献能够顺利并高效地被采纳。

## 🚀 如何贡献

1.  **Fork 本仓库**
    点击 GitHub 页面右上角的 "Fork" 按钮，将项目复制到您的个人账户下。

2.  **克隆您的 Fork**
    将您 Fork 后的仓库克隆到本地开发环境。

    ```bash
    git clone https://github.com/您的用户名/jucaizhongfa-Trading-Platform.git
    cd jucaizhongfa-Trading-Platform
    ```

3.  **创建特性分支**
    从 `main` 分支创建新的特性分支。请使用有意义的名称，例如 `feature/add-dark-mode` 或 `fix/login-bug`。

    ```bash
    git checkout -b feature/YourAmazingFeature
    ```

4.  **安装依赖并启动开发服务器**
    请参考 `README.md` 中的 [快速开始](#🚀-快速开始--quick-start) 部分来设置您的开发环境。

5.  **进行更改**
    在您的特性分支上进行代码更改、添加新功能或修复 Bug。请确保您的代码符合项目的 [代码规范](#📝-代码规范--code-style-and-formatting) 和 [测试要求](#✅-测试要求--testing-requirements)。

6.  **提交更改**
    请遵循 [Commit 规范](#📝-commit-规范--commit-specification) 提交您的更改。

    ```bash
    git commit -m 'feat: add some amazing feature'
    ```

7.  **推送到分支**
    将您的本地更改推送到 GitHub 上的特性分支。

    ```bash
    git push origin feature/YourAmazingFeature
    ```

8.  **提交 Pull Request (PR)**
    在 GitHub 上打开您的 Fork 仓库，然后点击 "New pull request" 按钮。请填写清晰的 PR 描述，说明您的更改内容、解决的问题或实现的功能。

## 📝 代码规范

本项目使用 ESLint 和 Prettier 来维护代码风格和格式的一致性。在提交代码之前，请确保您的代码通过了以下检查：

- **ESLint**：用于代码质量检查和潜在错误发现。
- **Prettier**：用于代码格式化，确保统一的代码风格。

您可以使用以下命令在本地运行检查和自动修复：

```bash
npm run lint
npm run format
```

## ✅ 测试要求

我们鼓励为您的新功能或 Bug 修复编写测试。本项目使用 Cypress 和 Playwright 进行 E2E 测试。请确保您的更改不会破坏现有测试，并尽可能为新功能添加相应的测试。

- **运行单元测试**
  ```bash
  npm run test
  ```
- **运行 E2E 测试**
  ```bash
  npm run test-e2e # 使用 Playwright
  npm run e2e:open # 启动 Cypress UI
  ```

## 📝 Commit 规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。请确保您的提交信息清晰、简洁，并遵循以下类型：

- `feat`: 新功能 (A new feature)
- `fix`: 修复 Bug (A bug fix)
- `docs`: 文档更新 (Documentation only changes)
- `style`: 代码格式调整 (Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.))
- `refactor`: 重构 (A code change that neither fixes a bug nor adds a feature)
- `test`: 测试相关 (Adding missing tests or correcting existing tests)
- `chore`: 构建/工具链更新 (Changes to the build process or auxiliary tools and libraries such as documentation generation)

示例：

```
feat: add member authentication module
fix: resolve login redirect issue
docs: update contributing guide
```

## ❓ 疑问与帮助

如果您在贡献过程中遇到任何问题，或者对项目有任何疑问，请随时通过以下方式联系我们：

- **问题反馈**：[Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱**：AthenDrakomin@proton.me

再次感谢您的贡献！

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ECharts](https://echarts.apache.org/)
- [Recharts](https://recharts.org/)
- [Vercel](https://vercel.com/)
- 所有贡献者

## 📞 联系方式

- **项目维护者**：[@jinyang756](https://github.com/jinyang756)
- **问题反馈**：[Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱**：AthenDrakomin@proton.me

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐ Star！**

Made with ❤️ by JinYang756

</div>
