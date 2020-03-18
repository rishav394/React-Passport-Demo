import qs from 'qs';

const manageQuery = props => {
	const stateOrders = props.orders;

	var page_no = qs.parse(props.location.search, {
		ignoreQueryPrefix: true,
	}).page;

	if (
		!page_no ||
		isNaN(parseInt(page_no)) ||
		page_no < 1 ||
		page_no * 10 > stateOrders.length
	)
		props.history.push('/?page=1');

	var orderSeries = page_no - 1;
	var start = orderSeries * 10 < stateOrders.length ? orderSeries * 10 : 0;
	var end = start + 15 < stateOrders.length ? start + 15 : stateOrders.length;

	var sortField = qs.parse(props.location.search, {
		ignoreQueryPrefix: true,
	}).sort;

	if (
		sortField &&
		(sortField === 'customer_name' ||
			sortField === 'customer_email' ||
			sortField === 'product' ||
			sortField === 'quantity')
	) {
		stateOrders.sort((a, b) =>
			String(a[sortField]).localeCompare(String(b[sortField])),
		);
	}

	if (
		qs.parse(props.location.search, {
			ignoreQueryPrefix: true,
		}).des == 'true'
	) {
		stateOrders.reverse();
	}

	return { stateOrders, start, end, page_no };
};

export default manageQuery;
