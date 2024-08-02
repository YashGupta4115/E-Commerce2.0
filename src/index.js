import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/userContext';
import { CartContextProvider } from './Context/cartContext';
import { SearchContextProvider } from './Context/searchContext';
import { DocContextProvider } from './Context/docsContext';
import { QueryContextProvoder } from './Context/queryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <SearchContextProvider>
      <CartContextProvider>
        <DocContextProvider>
          <QueryContextProvoder>
    <App />
          </QueryContextProvoder>
        </DocContextProvider>
      </CartContextProvider>
      </SearchContextProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
