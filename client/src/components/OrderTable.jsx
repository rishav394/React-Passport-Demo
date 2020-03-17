import React, { Component } from 'react';
import M from 'materialize-css';
import validate from '../lib/validator';

class Ordertable extends Component {
	state = {
		tempOrder: {
			id: '',
			customer_name: '',
			customer_email: '',
			product: '',
			quantity: '',
		},
		error: '',
	};

	componentDidMount() {
		var elems = document.querySelectorAll('.modal');
		M.Modal.init(elems);
	}

	_handleModal = e => {
		var ob = {};
		var id = e.currentTarget.dataset.id;
		var x = document.getElementById(id);
		x = x.querySelectorAll('td');
		for (let index = 0; index < 4; index++) {
			const element = x[index];
			ob[element.id] = element.innerText;
		}
		ob['id'] = id;
		this.setState({
			tempOrder: ob,
		});
	};

	_handleEditChange = e => {
		this.setState({
			tempOrder: {
				...this.state.tempOrder,
				[e.target.id]: e.target.value,
			},
			error: validate(e.target.id, e.target.value),
		});
	};

	_handleSubmit = e => {
		e.preventDefault();
		// validate

		if (!this.state.error) {
			this.props.editOrder(this.state.tempOrder);
			var instance = M.Modal.getInstance(document.querySelector('#modal1'));
			instance.close();
			this.setState({
				error: '',
			});
		}
	};

	render() {
		const { orders, deleteOrder } = this.props;

		return (
			<div>
				<div id="modal1" className="modal container section">
					<h4 className="center">Edit</h4>
					<div className="container">
						<form action="#" onSubmit={this._handleSubmit}>
							<input
								className="validate"
								type="text"
								name="id"
								id="id"
								defaultValue={this.state.tempOrder.id}
								readOnly
							/>
							<div className="input-field">
								<input
									className="validate"
									type="text"
									name="customer_name"
									id="customer_name"
									value={this.state.tempOrder.customer_name}
									onChange={this._handleEditChange}
								/>
							</div>
							<div className="input-field">
								<input
									className="validate"
									type="email"
									name="customer_email"
									id="customer_email"
									value={this.state.tempOrder.customer_email}
									onChange={this._handleEditChange}
								/>
							</div>
							<div className="input-field">
								<input
									className="validate"
									type="text"
									name="product"
									id="product"
									value={this.state.tempOrder.product}
									onChange={this._handleEditChange}
								/>
							</div>
							<div className="input-field">
								<input
									className="validate"
									type="number"
									name="quantity"
									id="quantity"
									min="1"
									required
									value={this.state.tempOrder.quantity}
									onChange={this._handleEditChange}
								/>
							</div>
							<p className="error red-text small center">{this.state.error}</p>
							<div className="center center-align">
								<button
									onClick={this._handleSubmit}
									type="submit"
									className="waves-effect center waves-green btn blue white-text"
								>
									<span className="center">Confirm Edit</span>
								</button>
							</div>
						</form>
					</div>
				</div>

				<table className="highlight">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Product</th>
							<th>Quantity</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order.id} id={order.id}>
								<td id="customer_name">{order.customer_name}</td>
								<td id="customer_email">{order.customer_email}</td>
								<td id="product">{order.product}</td>
								<td id="quantity">{order.quantity}</td>
								<td onClick={this._handleModal.bind(this)} data-id={order.id}>
									<button
										data-target="modal1"
										className="warn btn-flat modal-trigger transparent black-text"
									>
										Edit
									</button>
								</td>
								<td onClick={() => deleteOrder(order.id)}>
									<button className="danger btn-flat transparent black-text">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Ordertable;
