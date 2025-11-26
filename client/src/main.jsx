import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <div onContextMenu={(e) => e.preventDefault()}></div>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);
