import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

if ('serviceWorker' in navigator) {
  // window.addEventListener('load', function() {
  //   navigator.serviceWorker.register('/sw.js');
  // });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
