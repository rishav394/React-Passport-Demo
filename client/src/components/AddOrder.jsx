import M from 'materialize-css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import uid from '../lib/uid';
import validate from '../lib/validator';
class AddOrder extends Component {
	state = {
		tempOrder: {
			id: '',
			customer_name: '',
			customer_email: '',
			product: '',
			quantity: '',
		},
		error: 'Please fill the form above',
	};

	_handleSubmit = e => {
		e.preventDefault();
		this.setState(
			{
				tempOrder: {
					...this.state.tempOrder,
					id: uid(),
				},
			},
			() => {
				if (!this.state.error) {
					this.props.createOrder(this.state.tempOrder);
					var instance = M.Modal.getInstance(
						document.querySelector('#addmodal'),
					);
					instance.close();
					document.querySelectorAll('input').forEach(q => (q.value = ''));
					this.setState({
						error: 'Please fill the form above',
					});
				}
			},
		);
	};

	_handleChange = e => {
		this.setState({
			tempOrder: {
				...this.state.tempOrder,
				[e.target.id]: e.target.value,
			},
			error: validate(e.target.id, e.target.value),
		});
	};

	render() {
		return (
			<div>
				<div id="addmodal" className="modal container section">
					<h4 className="center">Add New Order</h4>
					<div className="container">
						<form action="#" onSubmit={this._handleSubmit}>
							<div className="input-field">
								<label htmlFor="customer_name">Customer Name</label>
								<input
									className="validate"
									type="text"
									name="customer_name"
									id="customer_name"
									onChange={this._handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="customer_email">Customer Email</label>
								<input
									className="validate"
									type="email"
									name="customer_email"
									id="customer_email"
									onChange={this._handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="product">Product</label>
								<input
									className="validate"
									type="text"
									name="product"
									id="product"
									onChange={this._handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="quantity">Quantity</label>
								<input
									className="validate"
									type="number"
									name="quantity"
									id="quantity"
									onChange={this._handleChange}
								/>
							</div>
							<p className="error red-text small center">{this.state.error}</p>
							<div className="center center-align">
								<button
									onClick={this._handleSubmit}
									type="submit"
									className="waves-effect center waves-green btn blue white-text"
								>
									<span className="center">Add new order</span>
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="center">
					<button
						data-target="addmodal"
						className="btn-flat modal-trigger blue white-text center"
					>
						Add new Order
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createOrder: order => {
			dispatch({
				type: 'ADD_ORDER',
				order,
			});
		},
	};
};
export default connect(null, mapDispatchToProps)(AddOrder);
