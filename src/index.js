import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import rootReducer from './reducers/reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { addItem } from './actions/actions.js'

var store = createStore(rootReducer);
var unsubscribe = store.subscribe(() => {
  console.log(store.getState())
});
let a = {
	active: true, name: 'A', pricePerUnit: 100, currency: 'TWD', amount: 1
};
let b = {
	active: false, name: 'B', pricePerUnit: 300, currency: 'JPY', amount: 2
};
let c = {
	active: true, name: 'CCC', pricePerUnit: 400, currency: 'USD', amount: 1
};

store.dispatch(addItem(a));
store.dispatch(addItem(b));
store.dispatch(addItem(c));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('main')
);
