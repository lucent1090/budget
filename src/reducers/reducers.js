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
			return (
				state.map((val, idx) => {
					if( idx == action.idx ){
						return Object.assign({}, val, {
							active: !val.active
						})
					}
					return val;
				})
			);
		case 'EDIT_ITEM':
			let { field, value } = action;
			let change;
			if(field == 'pricePerUnit'){
				change = {pricePerUnit: value};
			}
			if(field == 'amount'){
				change = {amount: value};
			}
			return (
				state.map((val, idx) => {
					if( idx == action.idx ){
						return Object.assign({}, val, change)
					}
					return val;
				})
			);
		case 'DEL_ITEM':
			let newState = state.slice(0);
			newState.splice(action.idx, 1);
			return (
				newState
			);
		default:
			return state;
	}
}

function currencies (state = ['TWD'], action) {
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