import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import '@/Global_reference/index.css';
import { createContext } from 'react';

export const Token = createContext();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Token.Provider value='user'>
        <Router>
          <main className='pinkTheme'>
            <App />
          </main>
        </Router>
      </Token.Provider>
    </NextUIProvider>
  </React.StrictMode>,
);
