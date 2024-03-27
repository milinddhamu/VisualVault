import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { ApolloProviderWrapper } from './apollo/ApolloProviderWrapper';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProviderWrapper>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </ApolloProviderWrapper>
  </React.StrictMode>,
)
