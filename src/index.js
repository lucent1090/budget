import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import rootReducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

var store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('main'));
