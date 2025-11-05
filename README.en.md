# 🚀 QuantumX Pro Trading Platform

<div align="center">

[QuantumX Pro | JUCAIZHONGFA]

**Professional · Secure · Intelligent All-in-One Financial Trading System**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)

[Live Demo](https://jucaizhongfa-trading-platform.vercel.app) · [Report Issue](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues) · [Feature Request](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues/new)

</div>

## 📖 Project Introduction

**QuantumX Pro Trading Platform** is a mobile-first fintech platform designed for middle-class investors in China, integrating:

- 🛒 **New Stock Subscription**: New stock IPO subscription services
- 🏢 **Institutional Seats**: Exclusive trading channels for institutions
- 🤝 **Block Trading**: Large-volume matched transactions
- 🛡️ **Private Equity Funds**: High-end wealth management products
- 📊 **Binary Options**: Fast-return investment tools

### 🎯 Core Features

| Feature Module               | Description                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| 🎨 **Cyber Financial Theme** | Dark glassmorphism design, neon gradient interactions, supports red-up green-down color scheme |
| 📱 **Mobile-First**          | Perfectly adapted for mobile browsers, supports WeChat's built-in browser                      |
| 🤖 **AI Smart Assistant**    | Real-time market interpretation, intelligent stock selection, one-click follow trading         |
| 📈 **Professional Charts**   | K-line charts based on ECharts / Recharts, multiple indicator overlays, trend line drawing     |
| 🔒 **Secure & Trustworthy**  | Simulated bank custody, display of CSRC qualifications, SSL encryption                         |
| ⚡ **Extreme Performance**   | Lighthouse score 90+, first screen load < 1.5s                                                 |

## 🛠️ Technology Stack

### Frontend Core

- **Framework**: React ^19.1.1, React Router DOM ^7.9.5
- **UI Component Library**: Ant Design ^5.28.0, Ant Design Icons ^6.1.0
- **State Management**: Zustand ^5.0.8
- **Styling**: Tailwind CSS ^4.1.16, PostCSS ^8.5.6
- **Charting**: ECharts ^6.0.0, Recharts ^3.3.0
- **Data Interaction**: Supabase JS ^2.78.0
- **Utilities**: date-fns ^4.1.0, uuid ^13.0.0, xlsx ^0.18.5

### Engineering & Quality

- **Build Tools**: Vite (rolldown-vite@7.1.14), TypeScript ~5.9.3
- **Code Quality**: ESLint ^9.39.1, Prettier ^3.6.2, Husky ^9.1.7
- **Testing**: Cypress ^15.6.0 (E2E)

### Deployment & Operations

- **Hosting Platform**: Vercel
- **CI/CD**: GitHub Actions

## 📂 Project Structure

```
jucaizhongfa-Trading-Platform/
├── public/                 # Static assets
├── scripts/                # Script files (e.g., db schema/init)
├── src/
│   ├── api/                # API encapsulation (mock data + real API)
│   ├── assets/             # Static asset files (images, icons)
│   ├── components/         # Reusable components
│   │   ├── BottomNavigationBar.tsx     # Bottom navigation bar (Members)
│   │   ├── ManagerNavigationBar.tsx    # Fund manager navigation bar
│   │   ├── TopNavigationBar.tsx        # Top navigation bar
│   │   ├── RealTimeChart.tsx           # Real-time chart component
│   │   ├── ProtectedRoute.tsx          # Protected route
│   │   └── Toast.tsx                   # Toast notification component
│   ├── hooks/              # Custom Hooks
│   │   ├── useSupabase.ts              # Supabase data interaction Hook
│   │   └── useToast.tsx                # Toast notification Hook
│   ├── pages/              # Page components
│   │   ├── Login.jsx                   # Login page
│   │   ├── Home.tsx                    # Home page
│   │   ├── Trade.tsx                   # Trading dashboard
│   │   ├── Profile.tsx                 # Profile page
│   │   ├── TradeDashboard.jsx          # Trading dashboard
│   │   ├── FundTrading.jsx             # Fund trading
│   │   ├── ContractTrading.jsx         # Contract trading
│   │   ├── OptionTrading.jsx           # Option trading
│   │   ├── BlockTrading.jsx            # Block trading
│   │   ├── IPOSubscription.jsx         # IPO subscription
│   │   ├── Positions.tsx               # Position management
│   │   ├── TransactionHistory.tsx      # Transaction history
│   │   ├── ProfilePage.jsx             # Profile page
│   │   ├── AccountSettings.jsx         # Account settings
│   │   ├── FundLogs.jsx                # Fund logs
│   │   ├── AdminDashboard.tsx          # Admin dashboard
│   │   ├── AdminUsers.jsx              # Member management
│   │   ├── AdminFunds.tsx              # Fund management
│   │   ├── AdminContracts.tsx          # Contract management
│   │   ├── AdminOptions.tsx            # Option management
│   │   ├── ManagerDashboard.tsx        # Fund manager dashboard
│   │   ├── MemberManagement.tsx        # Member management
│   │   ├── TradeManagement.tsx         # Trade management
│   │   ├── DataIntegration.tsx         # Data integration
│   │   └── SystemSettings.tsx          # System settings
│   ├── store/              # Zustand state management
│   │   ├── useAuth.ts                  # Member authentication
│   │   └── useToastStore.js            # Toast notification state
│   ├── utils/              # Utility functions
│   │   ├── authService.ts              # Authentication service
│   │   ├── supabase.ts                 # Supabase configuration
│   │   ├── supabaseService.ts          # Supabase service
│   │   ├── tradeValidation.ts          # Trade validation
│   │   ├── mockDataService.ts          # Mock data service
│   │   ├── mockProducts.ts             # Mock product data
│   │   ├── exportExcel.ts              # Excel export
│   │   ├── helpers.ts                  # Helper functions
│   │   └── validation.ts               # Form validation
│   ├── styles/             # Global styles
│   │   └── globalStyles.css            # Global styles
│   ├── App.tsx             # Main application entry
│   ├── auth.ts             # Authentication type definitions
│   └── main.tsx            # Application entry file
├── .env.example            # Environment variable example
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Specification (Cyber Financial Theme)

| Purpose         | Color Name      | Hex       | CSS Variable   |
| --------------- | --------------- | --------- | -------------- |
| Main Background | Deep Space Blue | `#0A0E27` | `--bg-dark`    |
| Brand Color     | Cyber Violet    | `#6366F1` | `--primary`    |
| Price Up        | Signal Red      | `#EF4444` | `--price-up`   |
| Price Down      | Vibrant Green   | `#10B981` | `--price-down` |
| Accent Color    | Neon Gold       | `#FFD700` | `--accent`     |

### Responsive Breakpoints

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

## 🔑 Environment Variable Configuration

Create a `.env` file (refer to `.env.example`):

```env
# API Configuration
VITE_API_BASE_URL=https://api.example.com
VITE_TUSHARE_TOKEN=your_tushare_token_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Firebase Configuration (Optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# WeChat Pay (Mock)
VITE_WECHAT_APP_ID=wx1234567890
```

## 📱 Mobile Adaptation Instructions

### WeChat Built-in Browser Compatibility

- ✅ Tested on WeChat iOS/Android versions
- ✅ Landscape mode disabled
- ✅ Adapted for safe areas (notch screens)

### Performance Optimization

- Image lazy loading
- Route code splitting
- ECharts / Recharts Canvas optimization
- Local caching (IndexedDB)

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npm run test-e2e # Using Playwright
npm run e2e:open # Launch Cypress UI
```

### Test Coverage

```bash
npm run test:coverage
```

## 📦 Deployment Guide

### Vercel Deployment (Recommended)

1.  **Connect GitHub Repository**
    - Log in to [Vercel](https://vercel.com)
    - Import project: `https://github.com/jinyang756/jucaizhongfa-Trading-Platform.git`

2.  **Configure Environment Variables**
    - Add variables from `.env` in Vercel project settings (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

3.  **Automatic Deployment**
    - Every `git push` to the `main` branch automatically triggers deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to server
scp -r dist/* user@server:/var/www/html/
```

## 🤝 Contributing Guide

We warmly welcome and appreciate your contributions to the **QuantumX Pro Trading Platform** project! Your participation is a vital driving force for the project's continuous development. Before you start contributing, please take a few minutes to read the following guidelines to ensure your contributions can be smoothly and efficiently adopted.

## 🚀 How to Contribute

1.  **Fork this repository**
    Click the "Fork" button in the upper right corner of the GitHub page to copy the project to your personal account.

2.  **Clone Your Fork**
    Clone your forked repository to your local development environment.

    ```bash
    git clone https://github.com/your-username/jucaizhongfa-Trading-Platform.git
    cd jucaizhongfa-Trading-Platform
    ```

3.  **Create a Feature Branch**
    Create a new feature branch from the `main` branch. Please use a meaningful name, such as `feature/add-dark-mode` or `fix/login-bug`.

    ```bash
    git checkout -b feature/YourAmazingFeature
    ```

4.  **Install Dependencies and Start Development Server**
    Please refer to the [Quick Start](#🚀-quick-start) section in `README.md` to set up your development environment.

5.  **Make Your Changes**
    Make code changes, add new features, or fix bugs on your feature branch. Please ensure your code adheres to the project's [Code Style and Formatting](#📝-code-style-and-formatting) and [Testing Requirements](#✅-testing-requirements).

6.  **Commit Your Changes**
    Please follow the [Commit Specification](#📝-commit-specification) when committing your changes.

    ```bash
    git commit -m 'feat: add some amazing feature'
    ```

7.  **Push to Your Branch**
    Push your local changes to your feature branch on GitHub.

    ```bash
    git push origin feature/YourAmazingFeature
    ```

8.  **Submit a Pull Request (PR)**
    Open your forked repository on GitHub and click the "New pull request" button. Please provide a clear PR description, explaining your changes, the problem solved, or the feature implemented.

## 📝 Code Style and Formatting

This project uses ESLint and Prettier to maintain consistent code style and formatting. Before submitting your code, please ensure it passes the following checks:

- **ESLint**: Used for code quality checks and potential error detection.
- **Prettier**: Used for code formatting to ensure a consistent code style.

You can use the following commands to run checks and auto-fix locally:

```bash
npm run lint
npm run format
```

## ✅ Testing Requirements

We encourage writing tests for your new features or bug fixes. This project uses Cypress and Playwright for E2E testing. Please ensure your changes do not break existing tests and, if possible, add corresponding tests for new features.

- **Run Unit Tests**
  ```bash
  npm run test
  ```
- **Run E2E Tests**
  ```bash
  npm run test-e2e # Using Playwright
  npm run e2e:open # Launch Cypress UI
  ```

## 📝 Commit Specification

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Please ensure your commit messages are clear, concise, and follow these types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

Example:

```
feat: add member authentication module
fix: resolve login redirect issue
docs: update contributing guide
```

## ❓ Questions and Help

If you encounter any problems during the contribution process or have any questions about the project, please feel free to contact us through the following methods:

- **Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **Email**: AthenDrakomin@proton.me

Thank you again for your contributions!

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ECharts](https://echarts.apache.org/)
- [Recharts](https://recharts.org/)
- [Vercel](https://vercel.com/)
- All contributors

## 📞 Contact Information

- **Project Maintainer**: [@jinyang756](https://github.com/jinyang756)
- **Issue Feedback**: [Issues](https://github.com/jinyang756/jucaizhongfa-Trading-Platform/issues)
- **Email**: AthenDrakomin@proton.me

<div align="center">

**If this project is helpful to you, please give us a ⭐ Star!**

Made with ❤️ by JinYang756

</div>
