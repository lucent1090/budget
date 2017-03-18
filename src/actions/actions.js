export function addItem (item) {
	return {
		type: 'ADD_ITEM',
		item
	};
}

export function toggleActive (idx) {
	return {
		type: 'TOGGLE_ACTIVE',
		idx
	};
}

export function addCurrency (currency) {
	return {
		type: 'ADD_CURRENCY',
		currency
	};
}

export function delCurrency (idx) {
	return {
		type: 'DEL_CURRENCY',
		idx
	};
}