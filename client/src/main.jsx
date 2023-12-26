import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App.jsx';
import '@/index.css';

export const Token = createContext();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className='pinkTheme'>
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
