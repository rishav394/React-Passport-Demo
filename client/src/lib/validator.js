const validEmailRegex = RegExp(
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
);

const validate = (name, value) => {
	var error = '';
	switch (name) {
		case 'customer_name':
			error =
				value.length < 5 ? 'Full Name must be atleast 5 characters long!' : '';
			break;
		case 'customer_email':
			error = validEmailRegex.test(value) ? '' : 'Email is not valid!';
			break;
		case 'quantity':
			error = isNaN(parseInt(value))
				? 'Quantity must be a number!'
				: parseInt(value) < 1
				? 'Quantity must be greater than 0'
				: '';
			break;
		case 'product':
			error = value.length < 6 ? 'Invalid Product name' : '';
			break;
		default:
			break;
	}
	return error;
};

export default validate;
