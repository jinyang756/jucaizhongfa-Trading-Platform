# 变更日志 | Changelog

## 1.0.5 (2025-11-05)

### ✨ 新增功能 | New Features

- 为基金管理人添加了三个默认账号：admin001、admin002、admin003，密码均为123456 / Added three default fund manager accounts: admin001, admin002, admin003, all with password 123456
- 实现了基金管理人邮箱绑定和验证码验证功能 / Implemented email binding and verification code functionality for fund managers
- 在生产环境中，基金管理人登录时如已绑定邮箱需输入验证码验证 / In production environment, fund managers with bound email need to enter verification code upon login
- 为基金管理人创建了会员管理表格，用于跟踪其创建的会员 / Created member management tables for fund managers to track members they create
- 更新了数据库结构，添加了邮箱验证相关表和索引 / Updated database schema with email verification related tables and indexes

### 🐛 Bug 修复 | Bug Fixes

- 修复了 `src/pages/MemberManagement.tsx` 中 `InputNumber` 组件 `parser` 函数的类型问题 / Fixed type issue with `InputNumber` component `parser` function in `src/pages/MemberManagement.tsx`
- 修复了 `src/pages/AdminUsers.jsx` 中 Excel 导出模块的导入路径问题 / Fixed Excel export module import path issue in `src/pages/AdminUsers.jsx`
- 修复了多个页面中 `useToast` Hook 的导入路径问题 / Fixed `useToast` hook import path issues in multiple pages
- 修复了模拟数据模块的导出问题，创建了统一的 `mockProducts.ts` 文件 / Fixed mock data module export issues by creating a unified `mockProducts.ts` file
- 重建了损坏的 `OptionTrading.jsx` 页面组件 / Rebuilt the corrupted `OptionTrading.jsx` page component

### ✅ 工程化改进 | Engineering Improvements

- 完善了 TypeScript 类型检查，解决了所有 TypeScript 类型错误 / Improved TypeScript type checking, resolved all TypeScript type errors
- 优化了项目结构，统一了模拟数据管理 / Optimized project structure with unified mock data management
- 修正了所有错误的模块导入路径，确保构建成功 / Corrected all incorrect module import paths to ensure successful builds
- 通过了所有代码格式化和 lint 检查 / Passed all code formatting and lint checks

## 1.0.4 (2025-11-05)

### ✨ 新增功能 | New Features

- 完善了项目结构文档，明确区分会员页面和基金管理人页面 / Improved project structure documentation with clear distinction between member pages and fund manager pages
- 更新了技术栈信息，确保与实际依赖一致 / Updated technology stack information to match actual dependencies

### 🐛 Bug 修复 | Bug Fixes

- 修复了 `src/pages/MemberManagement.tsx` 中 `InputNumber` 组件 `parser` 函数的类型问题 / Fixed type issue with `InputNumber` component `parser` function in `src/pages/MemberManagement.tsx`
- 修复了 `src/pages/AdminUsers.jsx` 中 Excel 导出模块的导入路径问题 / Fixed Excel export module import path issue in `src/pages/AdminUsers.jsx`
- 修复了多个页面中 `useToast` Hook 的导入路径问题 / Fixed `useToast` hook import path issues in multiple pages
- 修复了模拟数据模块的导出问题，创建了统一的 `mockProducts.ts` 文件 / Fixed mock data module export issues by creating a unified `mockProducts.ts` file
- 重建了损坏的 `OptionTrading.jsx` 页面组件 / Rebuilt the corrupted `OptionTrading.jsx` page component

### ✅ 工程化改进 | Engineering Improvements

- 完善了 TypeScript 类型检查，解决了所有 TypeScript 类型错误 / Improved TypeScript type checking, resolved all TypeScript type errors
- 优化了项目结构，统一了模拟数据管理 / Optimized project structure with unified mock data management
- 修正了所有错误的模块导入路径，确保构建成功 / Corrected all incorrect module import paths to ensure successful builds
- 通过了所有代码格式化和 lint 检查 / Passed all code formatting and lint checks

## 1.0.3 (2025-11-05)

### 🐛 Bug 修复 | Bug Fixes

- 修复了 `src/pages/MemberManagement.tsx` 中 `InputNumber` 组件 `parser` 函数的类型问题 / Fixed type issue with `InputNumber` component `parser` function in `src/pages/MemberManagement.tsx`

### ✅ 工程化改进 | Engineering Improvements

- 完善了 TypeScript 类型检查，解决了所有 TypeScript 类型错误 / Improved TypeScript type checking, resolved all TypeScript type errors

## 1.0.2 (2025-11-05)

### 🐛 Bug 修复 | Bug Fixes

- 修复了 `src/pages/DataIntegration.tsx` 中 `'entry'` 未使用的问题。 / Fixed unused `'entry'` variable in `src/pages/DataIntegration.tsx`.
- 修复了 `src/pages/AdminDashboard.tsx` 中未使用的 `React` 导入问题。 / Fixed unused `React` import in `src/pages/AdminDashboard.tsx`.
- 修复了 `src/pages/MemberManagement.tsx` 中 `InputNumber` 组件 `parser` 函数的类型问题。 / Fixed type issue with `InputNumber` component `parser` function in `src/pages/MemberManagement.tsx`.
- 修复了 `src/pages/AdminOptions.tsx` 中 `debounce` 函数参数类型不匹配的问题。 / Fixed parameter type mismatch issue with `debounce` function in `src/pages/AdminOptions.tsx`.
- 修复了多个文件中的 React Hook 依赖警告问题。 / Fixed React Hook dependency warning issues in multiple files.

### ✅ 工程化改进 | Engineering Improvements

- 完善了 TypeScript 类型检查，提高了代码质量。 / Improved TypeScript type checking, enhanced code quality.
- 优化了 React Hook 使用，避免不必要的重新渲染。 / Optimized React Hook usage, avoided unnecessary re-renders.

## 1.0.1 (2025-11-05)

### 🐛 Bug 修复 | Bug Fixes

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

### ✅ 工程化改进 | Engineering Improvements

- 完善了项目构建流程，确保项目可以成功构建和部署。 / Improved project build process to ensure successful build and deployment.
- 增加了 Playwright E2E 测试文件，提高测试覆盖率。 / Added Playwright E2E test files to improve test coverage.
- 修复了环境变量配置文件，确保与文档一致。 / Fixed environment variable configuration file to ensure consistency with documentation.

## 1.0.0 (2025-11-5)

### ✨ 新功能 | Features

- 初始化项目结构，完成基础页面和组件开发。 / Initialized project structure, completed basic page and component development.

### 🐛 Bug 修复 | Bug Fixes

- 修复了登录页面在移动端显示不正确的问题。 / Fixed incorrect display of the login page on mobile devices.

### 🚀 性能优化 | Performance Improvements

- 优化了图片加载策略，提升了首屏加载速度。 / Optimized image loading strategy, improved first screen loading speed.

### 📝 文档 | Documentation

- 完成了 `README.md` 文件的中英文双语版本。 / Completed the bilingual Chinese and English versions of the `README.md` file。
