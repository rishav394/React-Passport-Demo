import orders from '../data/DummyData.json';

const initState = {
	orders: orders,
};

const rootReducer = (state = initState, action) => {
	switch (action.type) {
		case 'DELETE_ORDER':
			const orderId = action.orderId;
			var orders = state.orders.filter(order => {
				return order.id !== orderId;
			});
			return {
				orders: orders,
			};
		case 'MODIFY_ORDER':
			var editOrder = action.order;
			var index = state.orders.findIndex(x => x.id === editOrder.id);
			state.orders[index] = editOrder;
			return {
				orders: [...state.orders],
			};
		case 'ADD_ORDER':
			return {
				orders: [action.order, ...state.orders],
			};

		default:
			break;
	}
	return {
		...state,
	};
};

export default rootReducer;
