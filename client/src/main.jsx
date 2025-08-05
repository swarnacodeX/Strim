import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './context/UserContextProvider';
import './index.css'; // Ensure you have a global CSS file for basic styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
