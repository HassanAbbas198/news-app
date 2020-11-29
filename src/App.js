import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import articlesReducer from './store/reducers/articles';

const rootReducer = combineReducers({
  articles: articlesReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
