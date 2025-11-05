import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from './components/Toast';
import { BrowserRouter } from 'react-router-dom';

// Clear localStorage for debugging purposes to ensure a clean authentication state
localStorage.clear();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider />
        <App />
    </BrowserRouter>
  </StrictMode>,
)