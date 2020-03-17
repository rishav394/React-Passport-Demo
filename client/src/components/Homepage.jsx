import Header from './Header';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import OrderTable from './OrderTable';
import NoAuth from './NoAuth';
import Profile from './Profile';
import AddOrder from './AddOrder';

class HomePage extends Component {
	state = {
		user: {},
		error: null,
		authenticated: false,
	};

	componentDidMount() {
		// Fetch does not send cookies. So you should add credentials: 'include'
		fetch('http://localhost:4000/auth/login/success', {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		})
			.then(response => {
				if (response.status === 200) return response.json();
				throw new Error('failed to authenticate user');
			})
			.then(responseJson => {
				this.setState({
					authenticated: true,
					user: responseJson.user,
				});
			})
			.catch(error => {
				this.setState({
					authenticated: false,
					error: 'Failed to authenticate user',
				});
			});
	}

	render() {
		const { authenticated } = this.state;
		const stateOrders = this.props.orders;

		var page_no = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).page;

		if (!page_no || page_no * 10 > stateOrders.length)
			this.props.history.push('/?page=1');
		var orderSeries = page_no - 1;
		var start = orderSeries * 10 < stateOrders.length ? orderSeries * 10 : 0;
		var end = start + 15 < stateOrders.length ? start + 15 : stateOrders.length;

		var orders = stateOrders.slice(start, end);

		const jsx = !authenticated ? (
			<h1>You are not authenticated</h1>
		) : (
			<Profile profile={this.state} />
		);

		return (
			<div>
				<Header
					authenticated={authenticated}
					handleNotAuthenticated={this._handleNotAuthenticated}
				/>

				{!authenticated ? (
					<NoAuth />
				) : (
					<div className="row">
						<div className="col s12 m3">
							<div>{jsx}</div>

							{/* Add order */}
							<AddOrder />
						</div>
						<div className="col s12 m9">
							<OrderTable
								orders={orders}
								deleteOrder={this._deleteOrder}
								editOrder={this._editOrder}
							/>
							<div className="center ">
								<span>
									<Link to={'/?page=' + (parseInt(page_no) - 1)}>
										<i className="material-icons med">chevron_left</i>
									</Link>
								</span>
								<span>Page {page_no}</span>
								<span>
									<Link to={'/?page=' + (parseInt(page_no) + 1)}>
										<i className="material-icons med">chevron_right</i>
									</Link>
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	_createOrder = order => {
		this.props.createOrder(order);
	};

	_deleteOrder = id => {
		// Delete Order now
		console.log(id);
		this.props.deleteOrder(id);
	};

	_editOrder = order => {
		// Edit order
		console.log(order);
		this.props.modifyOrder(order);
	};

	_handleNotAuthenticated = () => {
		this.setState({ authenticated: false });
	};
}

const mapStateToProps = state => {
	return {
		orders: state.orders,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteOrder: orderId => {
			dispatch({
				type: 'DELETE_ORDER',
				orderId,
			});
		},
		modifyOrder: order => {
			dispatch({
				type: 'MODIFY_ORDER',
				order,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
