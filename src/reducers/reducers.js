import { combineReducers } from 'redux'

const rootReducer = combineReducers({ 
	items
});

function items(state = [], action) {
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

export default rootReducer;