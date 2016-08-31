import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store = window.store = configureStore();
  if (window.currentUser) {
    const initialState = {session: {currentUser: window.currentUser}};
    store = configureStore(initialState);
    // debugger
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store}/>, root);
});
