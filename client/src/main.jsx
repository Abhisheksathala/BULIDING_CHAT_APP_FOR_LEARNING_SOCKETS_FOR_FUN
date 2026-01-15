import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import {Provider} from "react-redux"
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <div onContextMenu={(e) => e.preventDefault()}>
        <App />
        </div>
      </HelmetProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
);
