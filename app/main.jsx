import React from 'react';
import { render } from 'react-dom';
import { persistStore } from 'redux-persist';
import localforage from 'localforage';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configure-store';
import Root from './root';

const rootEl = document.getElementById('app');
const store = configureStore();

const onRehydrate = () => {
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    rootEl
  );
}

persistStore(
  store,
  { storage: localforage },
  onRehydrate
);


if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').rotues;

    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      rootEl
    );
  });
}
