export function addItem (item) {
	return {
		type: 'ADD_ITEM',
		item
	};
}

export  function editItem (idx, field, value) {
	return {
		type: 'EDIT_ITEM',
		idx,
		field,
		value
	};
}

export function delItem (idx) {
	return {
		type: 'DEL_ITEM',
		idx
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