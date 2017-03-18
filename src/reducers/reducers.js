import { combineReducers } from 'redux'

const rootReducer = combineReducers({ 
	items,
	currencies
});

function items (state = [], action) {
	switch (action.type) {
		case 'ADD_ITEM':
			return [
				...state, action.item
			]
		case 'TOGGLE_ACTIVE':
			return(
				state.map((val, idx) => {
					if( idx == action.idx ){
						return Object.assign({}, val, {
							active: !val.active
						})
					}
					return val;
				})
			);
		default:
			return state;
	}
}

function currencies (state = ['NTD'], action) {
	switch (action.type) {
		case 'ADD_CURRENCY':
			return [
				...state, action.currency
			]
		case 'DEL_CURRENCY':
			let newState = state.slice(0);
			newState.splice(action.idx, 1);
			return (
				newState
			);
		default:
			return state;
	}
}

export default rootReducer;