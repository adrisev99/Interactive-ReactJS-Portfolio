import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();