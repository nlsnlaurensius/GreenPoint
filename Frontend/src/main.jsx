import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);