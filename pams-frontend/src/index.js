import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store/store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
reportWebVitals();
