export function addItem(item) {
	return {
		type: 'ADD_ITEM',
		item
	};
}

export function toggleActive(idx) {
	return {
		type: 'TOGGLE_ACTIVE',
		idx
	};
}