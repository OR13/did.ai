import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '.';
import history from './history';

export default (appReducers = {}) => {
  // Persistance configuration
  const persistConfig = {
    key: 'root',
    whitelist: ['hello'], // TODO: UPDATE PLACEHOLDER
    storage,
  };

  // Store.
  const store = createStore(
    persistReducer(
      persistConfig,
      combineReducers({ ...rootReducer, ...appReducers })
    ),
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  );

  // Persistor.
  const persistor = persistStore(store);
  return {
    store,
    persistor,
    history,
  };
};
