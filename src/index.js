import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import App from 'App';
import channelsReducer from './reducers/channelsReducer';
import { fetchData, initState } from './actions/index'
import { saveToStorage, getFromStorage } from './api/api'

require('./styles/index.scss');

const reducers = combineReducers({
  channels: channelsReducer
})

let store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : noop => noop));

store.subscribe(() => {
  let state = store.getState();
  saveToStorage({names: state.channels.names, filter: state.channels.filter})
})

let initialData = getFromStorage('channels');

if (initialData) {
  store.dispatch(initState(initialData))
}

store.dispatch(fetchData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
