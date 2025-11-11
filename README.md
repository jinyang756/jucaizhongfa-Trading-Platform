# 🚀 聚财众发量化交易平台 | QuantumX Pro Trading Platform

<div align="center">

[聚财众发|JUCAIZHONGFA]

**专业 · 安全 · 智能 的一站式金融交易系统 | Professional · Secure · Intelligent All-in-One Financial Trading System**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)

[在线演示](https://jucaizhongfa-trading-platform.vercel.app) · [报告问题](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) · [功能建议](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues/new)

</div>

## 📖 项目简介 | Project Introduction

**聚财众发量化交易平台** 是一款面向中国中产投资者的移动端优先金融科技平台，整合了：

**QuantumX Pro Trading Platform** is a mobile-first fintech platform designed for middle-class investors in China, integrating:

- 🛒 **新购申购** | **New Stock Subscription**: 新股认购服务 | New stock IPO subscription services
- 🏢 **机构席位** | **Institutional Seats**: 机构专属交易通道 | Exclusive trading channels for institutions
- 🤝 **大宗交易** | **Block Trading**: 大额撮合交易 | Large-volume matched transactions
- 🛡️ **私募基金** | **Private Equity Funds**: 高端理财产品 | High-end wealth management products
- 📊 **二元期权** | **Binary Options**: 快速收益工具 | Fast-return investment tools
- 📈 **基金合约** | **Fund Contracts**: 灵活的基金合约交易 | Flexible fund contract trading

### 🎯 核心特性 | Core Features

| 功能模块            | Feature Module            | 描述                                                     | Description                                                                                    |
| ------------------- | ------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 🎨 **赛博金融主题** | **Cyber Financial Theme** | 深色玻璃态设计，霓虹渐变交互，支持红涨绿跌配色           | Dark glassmorphism design, neon gradient interactions, supports red-up green-down color scheme |
| 📱 **移动端优先**   | **Mobile-First**          | 完美适配手机浏览器，支持微信内置浏览器                   | Perfectly adapted for mobile browsers, supports WeChat'''s built-in browser                      |
| 🤖 **AI 智能助理**  | **AI Smart Assistant**    | 实时行情解读、智能选股、一键跟单                         | Real-time market interpretation, intelligent stock selection, one-click follow trading         |
| 📈 **专业级图表**   | **Professional Charts**   | 基于 ECharts / Recharts 的 K线图、多指标叠加、趋势线绘制 | K-line charts based on ECharts / Recharts, multiple indicator overlays, trend line drawing     |
| 🔒 **安全可信**     | **Secure & Trustworthy**  | 模拟银行存管、证监会资质展示、SSL 加密                   | Simulated bank custody, display of CSRC qualifications, SSL encryption                         |
| ⚡ **极致性能**     | **Extreme Performance**   | Lighthouse 评分 90+，首屏加载 < 1.5s                     | Lighthouse score 90+, first screen load < 1.5s                                                 |

## 🛠️ 技术栈 | Technology Stack

### 前端核心 | Frontend Core

- **框架 | Framework**: React ^19.1.1, React Router DOM ^7.9.5
- **UI 组件库 | UI Component Library**: Ant Design ^5.28.0, Ant Design Icons ^6.1.0, Heroicons, Shadcn-ui
- **状态管理 | State Management**: Zustand ^5.0.8
- **样式处理 | Styling**: Tailwind CSS ^4.1.16, PostCSS ^8.5.6
- **图表组件 | Charting**: ECharts ^6.0.0, Recharts ^3.3.0
- **数据交互 | Data Interaction**: Supabase JS ^2.78.0
- **工具库 | Utilities**: date-fns ^4.1.0, uuid ^13.0.0, exceljs ^4.4.0
- **弹窗库 | Modal Library**: SweetAlert2
- **动画库 | Animation Library**: Framer Motion
- **音效库 | Sound Library**: easy-sound

### 工程化与质量 | Engineering & Quality

- **构建工具 | Build Tools**: Vite (rolldown-vite@7.1.14), TypeScript ~5.9.3
- **代码质量 | Code Quality**: ESLint ^9.39.1, Prettier ^3.6.2, Husky ^9.1.7
- **测试工具 | Testing**: Cypress ^15.6.0 (E2E)

### 部署与运维 | Deployment & Operations

- **托管平台 | Hosting Platform**: Vercel
- **CI/CD**: GitHub Actions

## 📂 项目结构 | Project Structure

```
jucaizhongfa-Trading-Platform/
├── public/                 # 静态资源 | Static assets
├── scripts/                # 脚本文件 | Script files (e.g., db schema/init)
├── src/
│   ├── api/                # 接口封装 | API encapsulation (mock data + real API)
│   ├── assets/             # 静态资源文件 | Static asset files (images, icons)
│   ├── components/         # 可复用组件 | Reusable components
│   │   ├── BottomNavigationBar.tsx     # 底部导航栏（会员） | Bottom navigation bar (Members)
│   │   ├── ManagerNavigationBar.tsx    # 基金管理人导航栏 | Fund manager navigation bar
│   │   ├── TopNavigationBar.tsx        # 顶部导航栏 | Top navigation bar
│   │   ├── MarketDashboard.tsx         # 市场仪表板组件 | Market dashboard component
│   │   ├── RealTimeChart.tsx           # 实时图表组件 | Real-time chart component
│   │   ├── ProtectedRoute.tsx          # 受保护路由 | Protected route
│   │   ├── Toast.tsx                   # 消息提示组件 | Toast notification component
│   │   ├── ui/                         # Shadcn/ui 组件库 | Shadcn/ui component library
│   │   │   ├── button.tsx              # 按钮组件 | Button component
│   │   │   ├── card.tsx                # 卡片组件 | Card component
│   │   │   ├── input.tsx               # 输入框组件 | Input component
│   │   │   ├── select.tsx              # 选择器组件 | Select component
│   │   │   ├── switch.tsx              # 开关组件 | Switch component
│   │   │   ├── label.tsx               # 标签组件 | Label component
│   │   │   ├── slider.tsx              # 滑块组件 | Slider component
│   │   │   └── index.ts                # 组件统一导出 | Component unified export
│   │   ├── Notification.tsx            # 通知组件 | Notification component
│   │   ├── SoundSettings.tsx           # 音效设置组件 | Sound settings component
│   │   ├── NotificationSystemExample.tsx # 通知系统示例 | Notification system example
│   │   ├── SoundExample.tsx            # 音效示例 | Sound example
│   │   ├── ShadcnExample.tsx           # Shadcn/ui 组件示例 | Shadcn/ui component example
│   │   ├── HeroiconsExample.tsx        # Heroicons 示例 | Heroicons example
│   │   ├── AnimatedComponentsExample.tsx # 动画组件示例 | Animated components example
│   │   ├── CompositeComponentsExample.tsx # 复合组件示例 | Composite components example
│   │   ├── TestComponents.tsx          # 测试组件 | Test components
│   │   └── TestImports.tsx             # 测试导入 | Test imports
│   ├── hooks/              # 自定义 Hook | Custom Hooks
│   │   ├── useSupabase.ts              # Supabase 数据交互 Hook | Supabase data interaction Hook
│   │   ├── useToast.tsx                # 消息提示 Hook | Toast notification Hook
│   │   └── useToast.ts                 # 消息提示 Hook | Toast notification Hook
│   ├── pages/              # 页面组件 | Page components
│   │   ├── Login.jsx                   # 登录页 | Login page
│   │   ├── Home.tsx                    # 首页 | Home page
│   │   ├── Trade.tsx                   # 交易大厅 | Trading dashboard
│   │   ├── Profile.tsx                 # 个人中心 | Profile page
│   │   ├── ProfilePage.jsx             # 个人资料 | Profile page
│   │   ├── TradeDashboard.jsx          # 交易仪表板 | Trading dashboard
│   │   ├── FundTrading.jsx             # 基金交易 | Fund trading page
│   │   ├── ContractTrading.jsx         # 合约交易 | Contract trading page
│   │   ├── OptionTrading.jsx           # 期权交易 | Option trading page
│   │   ├── BlockTrading.jsx            # 大宗交易 | Block trading page
│   │   ├── IPOSubscription.jsx         # 新股申购 | IPO subscription page
│   │   ├── FundContract.jsx            # 基金合约 | Fund contract page
│   │   ├── Positions.tsx               # 持仓管理 | Positions management
│   │   ├── TransactionHistory.tsx      # 交易历史 | Transaction history
│   │   ├── AccountSettings.jsx         # 账户设置 | Account settings
│   │   ├── FundLogs.jsx                # 基金日志 | Fund logs
│   │   ├── AdminDashboard.tsx          # 管理员仪表盘 | Admin dashboard
│   │   ├── AdminUsers.jsx              # 会员管理 | User management
│   │   ├── AdminFunds.tsx              # 基金管理 | Fund management
│   │   ├── AdminContracts.tsx          # 合约管理 | Contract management
│   │   ├── AdminOptions.tsx            # 期权管理 | Option management
│   │   ├── ManagerDashboard.tsx        # 基金管理人首页 | Manager dashboard
│   │   ├── MemberManagement.tsx        # 会员管理 | Member management
│   │   ├── TradeManagement.tsx         # 交易管理 | Trade management
│   │   ├── DataIntegration.tsx         # 数据集成 | Data integration
│   │   └── SystemSettings.tsx          # 系统设置 | System settings
│   ├── store/              # Zustand 状态管理 | Zustand state management
│   │   ├── useAuth.ts                  # 会员认证 | Member authentication
│   │   ├── useAuth.js                  # 会员认证 | Member authentication
│   │   ├── useToastStore.ts            # 消息提示状态 | Toast notification state
│   │   ├── useToastStore.js            # 消息提示状态 | Toast notification state
│   │   └── useTradeData.ts             # 交易数据状态 | Trade data state
│   ├── utils/              # 工具函数 | Utility functions
│   │   ├── authService.ts              # 认证服务 | Authentication service
│   │   ├── supabase.ts                 # Supabase 配置 | Supabase configuration
│   │   ├── supabaseService.ts          # Supabase 服务 | Supabase service
│   │   ├── tradeValidation.ts          # 交易验证 | Trade validation
│   │   ├── mockDataService.ts          # 模拟数据服务 | Mock data service
│   │   ├── mockProducts.ts             # 模拟产品数据 | Mock product data
│   │   ├── exportExcel.ts              # Excel 导出 | Excel export
│   │   ├── helpers.ts                  # 辅助函数 | Helper functions
│   │   ├── simEngine.ts                # 模拟引擎集成 | Simulation engine integration
│   │   └── validation.ts               # 表单验证 | Form validation
│   ├── styles/             # 全局样式 | Global styles
│   │   └── globalStyles.css            # 全局样式 | Global styles
│   ├── App.tsx             # 主应用入口 | Main application entry
│   ├── auth.ts             # 认证类型定义 | Authentication type definitions
│   └── main.tsx            # 应用入口文件 | Application entry file
├── .env.example            # 环境变量示例 | Environment variable example
├── tailwind.config.js      # Tailwind 配置 | Tailwind configuration
├── vite.config.ts          # Vite 配置 | Vite configuration
└── README.md               # 项目文档 | Project documentation
```

## 🎨 设计系统 | Design System

### 色彩规范（赛博金融主题） | Color Specification (Cyber Financial Theme)

| 用途   | Purpose         | 颜色名称 | Color Name      | Hex       | CSS Variable   |
| ------ | --------------- | -------- | --------------- | --------- | -------------- |
| 主背景 | Main Background | 深空蓝   | Deep Space Blue | `#0A0E27` | `--bg-dark`    |
| 品牌色 | Brand Color     | 赛博紫   | Cyber Violet    | `#6366F1` | `--primary`    |
| 上涨   | Price Up        | 信号红   | Signal Red      | `#EF4444` | `--price-up`   |
| 下跌   | Price Down      | 活力绿   | Vibrant Green   | `#10B981` | `--price-down` |
| 强调色 | Accent Color    | 霓虹金   | Neon Gold       | `#FFD700` | `--accent`     |

### 响应式断点 | Responsive Breakpoints

- **移动端 | Mobile**: `< 640px`
- **平板 | Tablet**: `640px - 1024px`
- **桌面 | Desktop**: `> 1024px`

## 🔑 环境变量配置 | Environment Variable Configuration

创建 `.env` 文件（参考 `.env.example`）：

Create a `.env` file (refer to `.env.example`):

``env

# API 配置 | API Configuration

VITE_API_BASE_URL=https://api.example.com
VITE_TUSHARE_TOKEN=your_tushare_token_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Firebase 配置（可选）| Firebase Configuration (Optional)

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# 微信支付（模拟）| WeChat Pay (Mock)

VITE_WECHAT_APP_ID=wx1234567890

````

> ⚠️ **安全警告 | Security Warning**:
> - 请勿将包含真实敏感信息的 `.env` 文件提交到代码仓库
> - 确保 `.env` 文件已在 `.gitignore` 中列出（本项目已配置）
> - 生产环境应通过部署平台（如 Vercel）的环境变量配置功能进行设置
> - Do not commit `.env` files containing real sensitive information to the code repository
> - Ensure the `.env` file is listed in `.gitignore` (already configured in this project)
> - Production environments should be configured through the deployment platform's (such as Vercel) environment variable configuration feature

## 📱 移动端适配说明 | Mobile Adaptation Instructions

### 微信内置浏览器兼容 | WeChat Built-in Browser Compatibility

- ✅ 已测试微信 iOS/Android 版本 | Tested on WeChat iOS/Android versions
- ✅ 禁用横屏模式 | Landscape mode disabled
- ✅ 适配安全区域（刘海屏） | Adapted for safe areas (notch screens)

### 性能优化 | Performance Optimization

- 图片懒加载 | Image lazy loading
- 路由代码分割 | Route code splitting
- ECharts / Recharts Canvas 优化 | ECharts / Recharts Canvas optimization
- 本地缓存（IndexedDB） | Local caching (IndexedDB)

## 🧪 测试 | Testing

### 运行单元测试 | Run Unit Tests

```bash
npm run test
````

### 运行 E2E 测试 | Run E2E Tests

```bash
npm run test-e2e # 使用 Playwright | Using Playwright
npm run e2e:open # 启动 Cypress UI | Launch Cypress UI
```

### 测试覆盖率 | Test Coverage

```bash
npm run test:coverage
```

## 🚀 快速开始 | Quick Start

### 前置要求 | Prerequisites

- Node.js >= 18.x
- npm >= 9.x 或 yarn >= 1.22.x | or yarn >= 1.22.x

### 安装依赖 | Install Dependencies

```bash
npm install
# 或 | or
yarn install
```

### 启动开发服务器 | Start Development Server

```bash
npm run dev
```

### 构建生产版本 | Build for Production

```bash
npm run build
```

## 📦 部署指南 | Deployment Guide

### Vercel 部署（推荐）| Vercel Deployment (Recommended)

1. **连接 GitHub 仓库 | Connect GitHub Repository**
   - 登录 [Vercel](https://vercel.com) | Log in to [Vercel](https://vercel.com)
   - 导入项目：`https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git` | Import project: `https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git`

2. **配置环境变量 | Configure Environment Variables**
   - 在 Vercel 项目设置中添加以下环境变量 | Add the following environment variables in Vercel project settings:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - 确保所有必需的环境变量都已配置 | Ensure all required environment variables are configured

3. **自动部署 | Automatic Deployment**
   - 每次 `git push` 到 `main` 分支，自动触发部署 | Every `git push` to the `main` branch automatically triggers deployment
   - Vercel 会自动运行 `npm run build` 并部署生成的文件 | Vercel will automatically run `npm run build` and deploy the generated files

4. **环境变量同步 | Environment Variable Synchronization**
   - 确保本地 `.env` 文件中的变量与 Vercel 项目设置中的变量保持一致 | Ensure variables in the local `.env` file are consistent with those in Vercel project settings
   - 本地开发环境使用 `.env` 文件，生产环境使用 Vercel 项目设置 | Local development environment uses `.env` file, production environment uses Vercel project settings

### 手动部署 | Manual Deployment

```bash
# 构建项目 | Build the project
npm run build

# 部署到服务器 | Deploy to server
scp -r dist/* user@server:/var/www/html/
```

## 🤝 贡献指南 | Contributing Guide

我们非常欢迎并感谢您对 **聚财众发量化交易平台** 项目的贡献！您的参与是项目持续发展的重要动力。在您开始贡献之前，请花几分钟阅读以下指南，以确保您的贡献能够顺利并高效地被采纳。

We warmly welcome and appreciate your contributions to the **QuantumX Pro Trading Platform** project! Your participation is a vital driving force for the project's continuous development. Before you start contributing, please take a few minutes to read the following guidelines to ensure your contributions can be smoothly and efficiently adopted.

## 🚀 如何贡献 | How to Contribute

1.  **Fork 本仓库 | Fork this repository**
    点击 GitHub 页面右上角的 "Fork" 按钮，将项目复制到您的个人账户下。 | Click the "Fork" button in the upper right corner of the GitHub page to copy the project to your personal account.

2.  **克隆您的 Fork | Clone Your Fork**
    将您 Fork 后的仓库克隆到本地开发环境。 | Clone your forked repository to your local development environment.

    ```bash
    git clone https://github.com/您的用户名/jucaizhongfa-Trading-Platform.git
    cd jucaizhongfa-Trading-Platform
    ```

    ```bash
    git clone https://github.com/your-username/jucaizhongfa-Trading-Platform.git
    cd jucaizhongfa-Trading-Platform
    ```

3.  **创建特性分支 | Create a Feature Branch**
    从 `main` 分支创建新的特性分支。请使用有意义的名称，例如 `feature/add-dark-mode` 或 `fix/login-bug`。 | Create a new feature branch from the `main` branch. Please use a meaningful name, such as `feature/add-dark-mode` or `fix/login-bug`.

    ```bash
    git checkout -b feature/YourAmazingFeature
    ```

4.  **安装依赖并启动开发服务器 | Install Dependencies and Start Development Server**
    请参考 `README.md` 中的 [快速开始](#🚀-快速开始--quick-start) 部分来设置您的开发环境。 | Please refer to the [Quick Start](#🚀-快速开始--quick-start) section in `README.md` to set up your development environment.

5.  **进行更改 | Make Your Changes**
    在您的特性分支上进行代码更改、添加新功能或修复 Bug。请确保您的代码符合项目的 [代码规范](#📝-代码规范--code-style-and-formatting) 和 [测试要求](#✅-测试要求--testing-requirements)。 | Make code changes, add new features, or fix bugs on your feature branch. Please ensure your code adheres to the project's [Code Style and Formatting](#📝-代码规范--code-style-and-formatting) and [Testing Requirements](#✅-测试要求--testing-requirements).

6.  **提交更改 | Commit Your Changes**
    请遵循 [Commit 规范](#📝-commit-规范--commit-specification) 提交您的更改。 | Please follow the [Commit Specification](#📝-commit-规范--commit-specification) when committing your changes.

    ```bash
    git commit -m 'feat: add some amazing feature'
    ```

7.  **推送到分支 | Push to Your Branch**
    将您的本地更改推送到 GitHub 上的特性分支。 | Push your local changes to your feature branch on GitHub.

    ```bash
    git push origin feature/YourAmazingFeature
    ```

8.  **提交 Pull Request (PR) | Submit a Pull Request (PR)**
    在 GitHub 上打开您的 Fork 仓库，然后点击 "New pull request" 按钮。请填写清晰的 PR 描述，说明您的更改内容、解决的问题或实现的功能。 | Open your forked repository on GitHub and click the "New pull request" button. Please provide a clear PR description, explaining your changes, the problem solved, or the feature implemented.

## 📝 代码规范 | Code Style and Formatting

本项目使用 ESLint 和 Prettier 来维护代码风格和格式的一致性。在提交代码之前，请确保您的代码通过了以下检查：

This project uses ESLint and Prettier to maintain consistent code style and formatting. Before submitting your code, please ensure it passes the following checks:

- **ESLint**: 用于代码质量检查和潜在错误发现。 | Used for code quality checks and potential error detection.
- **Prettier**: 用于代码格式化，确保统一的代码风格。 | Used for code formatting to ensure a consistent code style.

您可以使用以下命令在本地运行检查和自动修复：

You can use the following commands to run checks and auto-fix locally:

```bash
npm run lint
npm run format
```

## ✅ 测试要求 | Testing Requirements

我们鼓励为您的新功能或 Bug 修复编写测试。本项目使用 Cypress 和 Playwright 进行 E2E 测试。请确保您的更改不会破坏现有测试，并尽可能为新功能添加相应的测试。

We encourage writing tests for your new features or bug fixes. This project uses Cypress and Playwright for E2E testing. Please ensure your changes do not break existing tests and, if possible, add corresponding tests for new features.

- **运行单元测试 | Run Unit Tests**
  ```bash
  npm run test
  ```
- **运行 E2E 测试 | Run E2E Tests**
  ```bash
  npm run test-e2e # 使用 Playwright | Using Playwright
  npm run e2e:open # 启动 Cypress UI | Launch Cypress UI
  ```

## 📝 Commit 规范 | Commit Specification

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。请确保您的提交信息清晰、简洁，并遵循以下类型：

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Please ensure your commit messages are clear, concise, and follow these types:

- `feat`: 新功能 | A new feature
- `fix`: 修复 Bug | A bug fix
- `docs`: 文档更新 | Documentation only changes
- `style`: 代码格式调整 | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: 重构 | A code change that neither fixes a bug nor adds a feature
- `test`: 测试相关 | Adding missing tests or correcting existing tests
- `chore`: 构建/工具链更新 | Changes to the build process or auxiliary tools and libraries such as documentation generation

示例 | Example:

```
feat: add member authentication module
fix: resolve login redirect issue
docs: update contributing guide
```

## ❓ 疑问与帮助 | Questions and Help

如果您在贡献过程中遇到任何问题，或者对项目有任何疑问，请随时通过以下方式联系我们：

If you encounter any problems during the contribution process or have any questions about the project, please feel free to contact us through the following methods:

- **问题反馈 | Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱 | Email**: AthenDrakomin@proton.me

再次感谢您的贡献！ | Thank you again for your contributions!

## 📄 许可证 | License

本项目基于 [MIT License](LICENSE) 开源。
This project is open-sourced under the [MIT License](LICENSE).

## 🙏 致谢 | Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ECharts](https://echarts.apache.org/)
- [Recharts](https://recharts.org/)
- [Vercel](https://vercel.com/)
- 所有贡献者 | All contributors

## 📞 联系方式 | Contact Information

- **项目维护者 | Project Maintainer**: [@jinyang756](https://github.com/jinyang756)
- **问题反馈 | Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱 | Email**: AthenDrakomin@proton.me

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐ Star！**
**If this project is helpful to you, please give us a ⭐ Star！**

Made with ❤️ by JinYang756

</div>
