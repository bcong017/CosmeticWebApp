import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import '@/Global_reference/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <main className='pinkTheme'>
          <App />
        </main>
      </Router>
    </NextUIProvider>
  </React.StrictMode>,
);
