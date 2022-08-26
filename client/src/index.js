import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { PollingProvider } from './context/PollingContext';
import NotificationProvider from "./components/Notifications/NotificationProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <PollingProvider>
    <React.StrictMode>
      <NotificationProvider>
          <App />
      </NotificationProvider>
    </React.StrictMode>
  </PollingProvider>
);