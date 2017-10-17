/**
 * @flow
 * configureStore
 *   Create a redux store with middlewares and data persistence
 *   management
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const useDevtool = typeof window === 'object'
                 && typeof window.devToolsExtension !== 'undefined'
                 && !isProd;

export default function configureStore(initialState) {
  const middlewares = useDevtool
                    ? applyMiddleware(thunk)
                    : applyMiddleware(thunk, createLogger());
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      autoRehydrate(),
      middlewares,
      useDevtool ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
