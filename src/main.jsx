import React, { createContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Store from './store/store.js';


const store = new Store();
export const Context = createContext({
  store,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{store}}>
        <Routes>
          <Route path="/*" element={ <App /> }  />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
