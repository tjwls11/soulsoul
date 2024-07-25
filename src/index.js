import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import "./style/mainpage.css";
import "./style/login.css";
import "./style/calendar.css"
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

