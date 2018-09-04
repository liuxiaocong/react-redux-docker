/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';
import '!file-loader?name=[name].[ext]!./manifest.json';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import 'sanitize.css/sanitize.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.css';
import { selectLocationState } from 'containers/App/selectors';
import configureStore from './store';
import i18n from './i18n';
import createRoutes from './routes';
const initialState = {};
const store = configureStore(initialState, browserHistory);


const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

const rootRoute = createRoutes(store);

const render = () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router
          history={history}
          routes={rootRoute}
        />
      </Provider>
    </I18nextProvider>,
    document.getElementById('app')
  );
};

if (module.hot) {
  module.hot.accept('./i18n', () => {
    render();
  });
}

render();

