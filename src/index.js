import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { AppManager } from './utilities';

ReactDOM.render(
  <Provider store={store}>
    <AppManager>
      <App />
    </AppManager>
  </Provider>,
  document.getElementById('root')
);