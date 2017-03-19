import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import rootReducer from './reducers/reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { addItem } from './actions/actions.js'

var store = createStore(rootReducer);
var unsubscribe = store.subscribe(() => {
  // console.log(store.getState())
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('main')
);
