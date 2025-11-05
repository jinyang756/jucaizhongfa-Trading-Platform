---
## 🚀 聚财众发量化交易平台 | QuantumX Pro Trading Platform

<div align="center">

![Platform Banner](https://via.placeholder.com/1200x300/0a0e27/6366f1?text=Jucaizhongfa+Trading+Platform)

**专业 · 安全 · 智能 的一站式金融交易系统**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)

[在线演示](https://jucaizhongfa-trading-platform.vercel.app) · [报告问题](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) · [功能建议](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues/new)

</div>
---

## 📖 项目简介 | Project Introduction

**聚财众发量化交易平台** 是一款面向中国中产投资者的移动端优先金融科技平台，整合了：

- 🛒 **新购申购**：新股认购服务
- 🏢 **机构席位**：机构专属交易通道
- 🤝 **大宗交易**：大额撮合交易
- 🛡️ **私募基金**：高端理财产品
- 📊 **二元期权**：快速收益工具

**QuantumX Pro Trading Platform** is a mobile-first fintech platform designed for middle-class investors in China, integrating:

- 🛒 **New Stock Subscription**: New stock IPO subscription services
- 🏢 **Institutional Seats**: Exclusive trading channels for institutions
- 🤝 **Block Trading**: Large-volume matched transactions
- 🛡️ **Private Equity Funds**: High-end wealth management products
- 📊 **Binary Options**: Fast-return investment tools

### 🎯 核心特性 | Core Features

| 功能模块            | 描述                                                     |
| ------------------- | -------------------------------------------------------- |
| 🎨 **赛博金融主题** | 深色玻璃态设计，霓虹渐变交互，支持红涨绿跌配色           |
| 📱 **移动端优先**   | 完美适配手机浏览器，支持微信内置浏览器                   |
| 🤖 **AI 智能助理**  | 实时行情解读、智能选股、一键跟单                         |
| 📈 **专业级图表**   | 基于 ECharts / Recharts 的 K线图、多指标叠加、趋势线绘制 |
| 🔒 **安全可信**     | 模拟银行存管、证监会资质展示、SSL 加密                   |
| ⚡ **极致性能**     | Lighthouse 评分 90+，首屏加载 < 1.5s                     |

| Feature Module               | Description                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| 🎨 **Cyber Financial Theme** | Dark glassmorphism design, neon gradient interactions, supports red-up green-down color scheme |
| 📱 **Mobile-First**          | Perfectly adapted for mobile browsers, supports WeChat's built-in browser                      |
| 🤖 **AI Smart Assistant**    | Real-time market interpretation, intelligent stock selection, one-click follow trading         |
| 📈 **Professional Charts**   | K-line charts based on ECharts / Recharts, multiple indicator overlays, trend line drawing     |
| 🔒 **Secure & Trustworthy**  | Simulated bank custody, display of CSRC qualifications, SSL encryption                         |
| ⚡ **Extreme Performance**   | Lighthouse score 90+, first screen load < 1.5s                                                 |

---

## 🛠️ 技术栈 | Technology Stack

### 前端核心 | Frontend Core

- **框架**：React ^19.1.1, React Router DOM ^7.9.5
- **UI 组件库**：Ant Design ^5.28.0, Ant Design Icons ^6.1.0
- **状态管理**：Zustand ^5.0.8
- **样式处理**：Tailwind CSS ^4.1.16, PostCSS ^8.5.6
- **图表组件**：ECharts ^6.0.0, Recharts ^3.3.0
- **数据交互**：Supabase JS ^2.78.0
- **工具库**：date-fns ^4.1.0, uuid ^13.0.0, xlsx ^0.18.5

### 工程化与质量 | Engineering & Quality

- **构建工具**：Vite (rolldown-vite@7.1.14), TypeScript ~5.9.3
- **代码质量**：ESLint ^9.39.1, Prettier ^3.6.2, Husky ^9.1.7
- **测试工具**：Cypress ^15.6.0 (E2E), Playwright ^15.6.1 (E2E)

### 部署与运维 | Deployment & Operations

- **托管平台**：Vercel
- **CI/CD**：GitHub Actions

---

## 🚀 快速开始 | Quick Start

### 前置要求 | Prerequisites

- Node.js >= 18.x (推荐)
- npm >= 9.x 或 yarn >= 1.22.x

### 1. 克隆项目 | Clone Project

```bash
git clone https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git
cd jucaizhongfa-Trading-Platform
```

### 2. 安装依赖 | Install Dependencies

```bash
npm install
# 或
yarn install
```

### 3. 本地开发流程 | Local Development Workflow

| 命令                | 描述 (中文)                 | Description (English)                 |
| ------------------- | --------------------------- | ------------------------------------- |
| `npm run dev`       | 启动开发服务器              | Start development server              |
| `npm run build`     | 构建生产环境代码            | Build for production                  |
| `npm run preview`   | 本地预览构建产物            | Preview production build locally      |
| `npm run lint`      | 运行 ESLint 进行代码检查    | Run ESLint for code linting           |
| `npm run format`    | 使用 Prettier 格式化代码    | Format code with Prettier             |
| `npm run typecheck` | 执行 TypeScript 类型检查    | Perform TypeScript type checking      |
| `npm run test-e2e`  | 运行 Playwright E2E 测试    | Run Playwright E2E tests              |
| `npm run e2e:open`  | 启动 Cypress 测试界面       | Launch Cypress test runner            |
| `npm run db:schema` | 初始化数据库结构 (Supabase) | Initialize database schema (Supabase) |
| `npm run db:init`   | 生成初始测试数据 (Supabase) | Generate initial test data (Supabase) |
| `npm run deploy`    | 部署到 Vercel               | Deploy to Vercel                      |

---

## 📂 项目结构 | Project Structure

```
jucaizhongfa-Trading-Platform/
├── public/                 # 静态资源 / Static assets
├── scripts/                # 脚本文件 / Script files (e.g., db schema/init)
├── src/
│   ├── api/                # 接口封装（模拟数据 + 真实接口） / API encapsulation (mock data + real API)
│   ├── assets/             # 静态资源文件 / Static asset files (images, icons)
│   ├── components/         # 可复用组件（Button, Card, Chart） / Reusable components (Button, Card, Chart)
│   ├── hooks/              # 自定义 Hook / Custom Hooks
│   ├── pages/              # 页面组件 / Page components
│   │   ├── Login.tsx       # 登录页 / Login page
│   │   ├── Home.tsx        # 首页 / Home page
│   │   ├── Trade.tsx       # 交易页 / Trading page
│   │   ├── Profile.tsx     # 个人中心 / Profile page
│   │   └── AdminDashboard.tsx # 管理员仪表盘 (可选) / Admin Dashboard (Optional)
│   ├── store/              # Zustand 状态管理 / Zustand state management
│   │   ├── useAuth.ts      # 用户认证 / User authentication
│   │   └── useTradeData.ts # 交易数据 / Trading data
│   ├── utils/              # 工具函数 / Utility functions (e.g., authService, supabase, tradeValidation)
│   ├── styles/             # 全局样式 / Global styles
│   ├── App.tsx             # 主应用入口 / Main application entry
│   ├── auth.ts             # 认证类型定义 / Authentication type definitions
│   └── main.tsx            # 应用入口文件 / Application entry file
├── .env.example            # 环境变量示例 / Environment variable example
├── tailwind.config.js      # Tailwind 配置 / Tailwind configuration
├── vite.config.ts          # Vite 配置 / Vite configuration
└── README.md               # 项目文档 / Project documentation
```

---

## 🎨 设计系统 | Design System

### 色彩规范（赛博金融主题） | Color Specification (Cyber Financial Theme)

| 用途   | 颜色名称 | Hex       | CSS 变量       |
| ------ | -------- | --------- | -------------- |
| 主背景 | 深空蓝   | `#0A0E27` | `--bg-dark`    |
| 品牌色 | 赛博紫   | `#6366F1` | `--primary`    |
| 上涨   | 信号红   | `#EF4444` | `--price-up`   |
| 下跌   | 活力绿   | `#10B981` | `--price-down` |
| 强调色 | 霓虹金   | `#FFD700` | `--accent`     |

| Purpose         | Color Name      | Hex       | CSS Variable   |
| --------------- | --------------- | --------- | -------------- |
| Main Background | Deep Space Blue | `#0A0E27` | `--bg-dark`    |
| Brand Color     | Cyber Violet    | `#6366F1` | `--primary`    |
| Price Up        | Signal Red      | `#EF4444` | `--price-up`   |
| Price Down      | Vibrant Green   | `#10B981` | `--price-down` |
| Accent Color    | Neon Gold       | `#FFD700` | `--accent`     |

### 响应式断点 | Responsive Breakpoints

- **移动端**：`< 640px`
- **平板**：`640px - 1024px`
- **桌面**：`> 1024px`

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

---

## 🔑 环境变量配置 | Environment Variable Configuration

创建 `.env` 文件（参考 `.env.example`）：
Create a `.env` file (refer to `.env.example`):

```env
# API 配置 / API Configuration
VITE_API_BASE_URL=https://api.example.com
VITE_TUSHARE_TOKEN=your_tushare_token_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Firebase 配置（可选） / Firebase Configuration (Optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# 微信支付（模拟） / WeChat Pay (Mock)
VITE_WECHAT_APP_ID=wx1234567890
```

---

## 📱 移动端适配说明 | Mobile Adaptation Instructions

### 微信内置浏览器兼容 | WeChat Built-in Browser Compatibility

- ✅ 已测试微信 iOS/Android 版本 / Tested on WeChat iOS/Android versions
- ✅ 禁用横屏模式 / Landscape mode disabled
- ✅ 适配安全区域（刘海屏） / Adapted for safe areas (notch screens)

### 性能优化 | Performance Optimization

- 图片懒加载 / Image lazy loading
- 路由代码分割 / Route code splitting
- ECharts / Recharts Canvas 优化 / ECharts / Recharts Canvas optimization
- 本地缓存（IndexedDB） / Local caching (IndexedDB)

---

## 🧪 测试 | Testing

### 运行单元测试 | Run Unit Tests

```bash
npm run test
```

### 运行 E2E 测试 | Run E2E Tests

```bash
npm run test-e2e # 使用 Playwright
npm run e2e:open # 启动 Cypress UI
```

### 测试覆盖率 | Test Coverage

```bash
npm run test:coverage
```

---

## 📦 部署指南 | Deployment Guide

### Vercel 部署（推荐） | Vercel Deployment (Recommended)

1. **连接 GitHub 仓库** | **Connect GitHub Repository**
   - 登录 [Vercel](https://vercel.com) / Log in to [Vercel](https://vercel.com)
   - 导入项目：`https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git` / Import project: `https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git`

2. **配置环境变量** | **Configure Environment Variables**
   - 在 Vercel 项目设置中添加 `.env` 中的变量 / Add variables from `.env` in Vercel project settings (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

3. **自动部署** | **Automatic Deployment**
   - 每次 `git push` 到 `main` 分支，自动触发部署 / Every `git push` to the `main` branch automatically triggers deployment

### 手动部署 | Manual Deployment

```bash
# 构建项目 / Build the project
npm run build

# 部署到服务器 / Deploy to server
scp -r dist/* user@server:/var/www/html/
```

---

## 🤝 贡献指南 | Contributing Guide

我们非常欢迎并感谢您对 **聚财众发量化交易平台** 项目的贡献！您的参与是项目持续发展的重要动力。在您开始贡献之前，请花几分钟阅读以下指南，以确保您的贡献能够顺利并高效地被采纳。

We warmly welcome and appreciate your contributions to the **QuantumX Pro Trading Platform** project! Your participation is a vital driving force for the project's continuous development. Before you start contributing, please take a few minutes to read the following guidelines to ensure your contributions can be smoothly and efficiently adopted.

---

## 🚀 如何贡献 | How to Contribute

1.  **Fork 本仓库** | **Fork this repository**
    点击 GitHub 页面右上角的 "Fork" 按钮，将项目复制到您的个人账户下。
    Click the "Fork" button in the upper right corner of the GitHub page to copy the project to your personal account.

2.  **克隆您的 Fork** | **Clone Your Fork**
    将您 Fork 后的仓库克隆到本地开发环境。
    Clone your forked repository to your local development environment.

    ```bash
    git clone https://github.com/您的用户名/jucaizhongfa-Trading-Platform.git
    cd jucaizhongfa-Trading-Platform
    ```

3.  **创建特性分支** | **Create a Feature Branch**
    从 `main` 分支创建新的特性分支。请使用有意义的名称，例如 `feature/add-dark-mode` 或 `fix/login-bug`。
    Create a new feature branch from the `main` branch. Please use a meaningful name, such as `feature/add-dark-mode` or `fix/login-bug`.

    ```bash
    git checkout -b feature/YourAmazingFeature
    ```

4.  **安装依赖并启动开发服务器** | **Install Dependencies and Start Development Server**
    请参考 `README.md` 中的 [快速开始](#🚀-快速开始--quick-start) 部分来设置您的开发环境。
    Please refer to the [Quick Start](#🚀-快速开始--quick-start) section in `README.md` to set up your development environment.

5.  **进行更改** | **Make Your Changes**
    在您的特性分支上进行代码更改、添加新功能或修复 Bug。请确保您的代码符合项目的 [代码规范](#📝-代码规范--code-style-and-formatting) 和 [测试要求](#✅-测试要求--testing-requirements)。
    Make code changes, add new features, or fix bugs on your feature branch. Please ensure your code adheres to the project's [Code Style and Formatting](#📝-代码规范--code-style-and-formatting) and [Testing Requirements](#✅-测试要求--testing-requirements).

6.  **提交更改** | **Commit Your Changes**
    请遵循 [Commit 规范](#📝-commit-规范--commit-specification) 提交您的更改。
    Please follow the [Commit Specification](#📝-commit-规范--commit-specification) when committing your changes.

    ```bash
    git commit -m 'feat: add some amazing feature'
    ```

7.  **推送到分支** | **Push to Your Branch**
    将您的本地更改推送到 GitHub 上的特性分支。
    Push your local changes to your feature branch on GitHub.

    ```bash
    git push origin feature/YourAmazingFeature
    ```

8.  **提交 Pull Request (PR)** | **Submit a Pull Request (PR)**
    在 GitHub 上打开您的 Fork 仓库，然后点击 "New pull request" 按钮。请填写清晰的 PR 描述，说明您的更改内容、解决的问题或实现的功能。
    Open your forked repository on GitHub and click the "New pull request" button. Please provide a clear PR description, explaining your changes, the problem solved, or the feature implemented.

---

## 📝 代码规范 | Code Style and Formatting

本项目使用 ESLint 和 Prettier 来维护代码风格和格式的一致性。在提交代码之前，请确保您的代码通过了以下检查：
This project uses ESLint and Prettier to maintain consistent code style and formatting. Before submitting your code, please ensure it passes the following checks:

- **ESLint**：用于代码质量检查和潜在错误发现。
- **ESLint**: Used for code quality checks and potential error detection.
- **Prettier**：用于代码格式化，确保统一的代码风格。
- **Prettier**: Used for code formatting to ensure a consistent code style.

您可以使用以下命令在本地运行检查和自动修复：
You can use the following commands to run checks and auto-fix locally:

```bash
npm run lint
npm run format
```

---

## ✅ 测试要求 | Testing Requirements

我们鼓励为您的新功能或 Bug 修复编写测试。本项目使用 Cypress 和 Playwright 进行 E2E 测试。请确保您的更改不会破坏现有测试，并尽可能为新功能添加相应的测试。
We encourage writing tests for your new features or bug fixes. This project uses Cypress and Playwright for E2E testing. Please ensure your changes do not break existing tests and, if possible, add corresponding tests for new features.

- **运行单元测试** | **Run Unit Tests**
  ```bash
  npm run test
  ```
- **运行 E2E 测试** | **Run E2E Tests**
  ```bash
  npm run test-e2e # 使用 Playwright
  npm run e2e:open # 启动 Cypress UI
  ```

---

## 📝 Commit 规范 | Commit Specification

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。请确保您的提交信息清晰、简洁，并遵循以下类型：
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Please ensure your commit messages are clear, concise, and follow these types:

- `feat`: 新功能 (A new feature)
- `fix`: 修复 Bug (A bug fix)
- `docs`: 文档更新 (Documentation only changes)
- `style`: 代码格式调整 (Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.))
- `refactor`: 重构 (A code change that neither fixes a bug nor adds a feature)
- `test`: 测试相关 (Adding missing tests or correcting existing tests)
- `chore`: 构建/工具链更新 (Changes to the build process or auxiliary tools and libraries such as documentation generation)

示例：
Example:

```
feat: add user authentication module
fix: resolve login redirect issue
docs: update contributing guide
```

---

## ❓ 疑问与帮助 | Questions and Help

如果您在贡献过程中遇到任何问题，或者对项目有任何疑问，请随时通过以下方式联系我们：
If you encounter any problems during the contribution process or have any questions about the project, please feel free to contact us through the following methods:

- **问题反馈**：[Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) / **Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱**：AthenDrakomin@proton.me / **Email**: AthenDrakomin@proton.me

再次感谢您的贡献！
Thank you again for your contributions！

---

## 📋 待办事项（Roadmap） | Roadmap

- [ ] 接入真实行情数据（Tushare API） / Integrate real-time market data (Tushare API)
- [ ] 集成 Firebase / Supabase 用户认证 / Integrate Firebase / Supabase user authentication
- [ ] 实现微信支付模拟 / Implement WeChat Pay simulation
- [ ] 增加 AI 投顾对话功能 / Add AI investment advisor chat function
- [ ] 多语言支持（国际版） / Multi-language support (international version)
- [ ] 暗色/亮色主题切换 / Dark/light theme toggle

---

## 📝 更新日志 | Changelog

### 1.0.1 (2025-11-05)

#### 🐛 Bug 修复 | Bug Fixes

- 修复了 `src/pages/Positions.tsx` 中 `Position` 接口 `id` 类型不匹配的问题。 / Fixed `Position` interface `id` type mismatch in `src/pages/Positions.tsx`.
- 修复了 `src/pages/Positions.tsx` 中 `allPositions` 隐式 `any` 类型的问题。 / Fixed implicit `any` type for `allPositions` in `src/pages/Positions.tsx`.
- 修复了 `src/pages/Positions.tsx` 中 `formatCurrency`, `formatPercentage`, `getProfitLossColor`, `getPositionTypeColor` 函数参数类型未定义的问题。 / Fixed undefined parameter types for `formatCurrency`, `formatPercentage`, `getProfitLossColor`, `getPositionTypeColor` functions in `src/pages/Positions.tsx`.
- 移除了 `src/pages/TransactionHistory.tsx` 中未使用的 `React` 导入。 / Removed unused `React` import in `src/pages/TransactionHistory.tsx`.
- 移除了 `src/App.tsx` 中未使用的 `AuthUser` 导入和 `scrolled` 状态变量。 / Removed unused `AuthUser` import and `scrolled` state variable in `src/App.tsx`.
- 移除了 `src/pages/AdminDashboard.tsx` 中未使用的 `React` 导入。 / Removed unused `React` import in `src/pages/AdminDashboard.tsx`.
- 修复了 `src/pages/AdminDashboard.tsx` 中 `navigateToPage` 函数 `path` 参数隐式 `any` 类型的问题。 / Fixed implicit `any` type for `path` parameter in `navigateToPage` function in `src/pages/AdminDashboard.tsx`.
- 移除了 `src/pages/Positions.tsx` 中未使用的 `React`, `RealTimeChart` 导入和 `showToast` 变量。 / Removed unused `React`, `RealTimeChart` imports and `showToast` variable in `src/pages/Positions.tsx`.
- 修复了 `src/api/funds.ts` 中 `fetchData` 期望数组但接收到单个 `FundRow` 的 `TS2345` 错误。 / Fixed `TS2345` error where `fetchData` in `src/api/funds.ts` expected an array but received a single `FundRow`.
- 移除了 `src/api/useFetch.ts` 中未使用的导入和 `FetchOptions` 接口。 / Removed unused imports and `FetchOptions` interface in `src/api/useFetch.ts`.
- 移除了 `src/App.tsx` 中未使用的 `AdminDashboard` 导入。 / Removed unused `AdminDashboard` import in `src/App.tsx`.
- 移除了 `src/pages/Positions.tsx` 中未使用的 `useToast` 导入。 / Removed unused `useToast` import in `src/pages/Positions.tsx`.
- 修复了 `src/api/contracts.ts` 中 `fetchData` 期望数组但接收到单个 `ContractRow` 的 `TS2345` 错误。 / Fixed `TS2345` error where `fetchData` in `src/api/contracts.ts` expected an array but received a single `ContractRow`.
- 修复了 `src/App.tsx` 中未使用的 `Link` 导入和 `user`、`logout` 变量问题。 / Fixed unused `Link` import and `user`, `logout` variables in `src/App.tsx`.
- 修复了 `src/pages/UserDashboard.tsx`、`src/utils/authService.ts`、`src/utils/supabase.ts` 和 `src/utils/tradeValidation.ts` 中的模块导入路径问题。 / Fixed module import path issues in `src/pages/UserDashboard.tsx`, `src/utils/authService.ts`, `src/utils/supabase.ts`, and `src/utils/tradeValidation.ts`.
- 修复了 `src/pages/Login.jsx` 和 `src/pages/FundTrading.jsx` 中的模块导入路径问题。 / Fixed module import path issues in `src/pages/Login.jsx` and `src/pages/FundTrading.jsx`.
- 修复了 `src/pages/UserDashboard.tsx` 中的类型不匹配问题。 / Fixed type mismatch issue in `src/pages/UserDashboard.tsx`.
- 修复了 `src/store/useAuth.d.ts` 中未使用的导入问题。 / Fixed unused imports in `src/store/useAuth.d.ts`.
- 修复了 `src/pages/UserDashboard.tsx` 中的变量重复声明问题。 / Fixed variable redeclaration issue in `src/pages/UserDashboard.tsx`.
- 修复了 `src/store/useAuth.ts` 中的类型不匹配问题。 / Fixed type mismatch issue in `src/store/useAuth.ts`.

#### ✅ 工程化改进 | Engineering Improvements

- 完善了项目构建流程，确保项目可以成功构建和部署。 / Improved project build process to ensure successful build and deployment.
- 增加了 Playwright E2E 测试文件，提高测试覆盖率。 / Added Playwright E2E test files to improve test coverage.
- 修复了环境变量配置文件，确保与文档一致。 / Fixed environment variable configuration file to ensure consistency with documentation.

### 1.0.0 (2025-11-5)

#### ✨ 新功能 | Features

- 初始化项目结构，完成基础页面和组件开发。 / Initialized project structure, completed basic page and component development.

#### 🐛 Bug 修复 | Bug Fixes

- 修复了登录页面在移动端显示不正确的问题。 / Fixed incorrect display of the login page on mobile devices.

#### 🚀 性能优化 | Performance Improvements

- 优化了图片加载策略，提升了首屏加载速度。 / Optimized image loading strategy, improved first screen loading speed.

#### 📝 文档 | Documentation

- 完成了 `README.md` 文件的中英文双语版本。 / Completed the bilingual Chinese and English versions of the `README.md` file.

---

## 📄 许可证 | License

本项目基于 [MIT License](LICENSE) 开源。
This project is open-sourced under the [MIT License](LICENSE).

---

## 🙏 致谢 | Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ECharts](https://echarts.apache.org/)
- [Recharts](https://recharts.org/)
- [Vercel](https://vercel.com/)
- 所有贡献者 / All contributors

---

## 📞 联系方式 | Contact Information

- **项目维护者**：[@jinyang756](https://github.com/jinyang756) / **Project Maintainer**: [@jinyang756](https://github.com/jinyang756)
- **问题反馈**：[Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) / **Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **邮箱**：AthenDrakomin@proton.me / **Email**: AthenDrakomin@proton.me

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐ Star！**
**If this project is helpful to you, please give us a ⭐ Star！**

Made with ❤️ by JinYang756

</div>
