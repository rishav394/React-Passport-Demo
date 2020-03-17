import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<nav>
				<div className="nav-wrapper notsowide">
					<ul id="nav-mobile" className="right">
						{authenticated ? (
							<li onClick={this._handleLogoutClick}>Logout</li>
						) : (
							<li onClick={this._handleSignInClick}>Login</li>
						)}
					</ul>
				</div>
			</nav>
		);
	}

	_handleSignInClick = () => {
		window.open('http://localhost:4000/auth/google', '_self');
	};

	_handleLogoutClick = () => {
		window.open('http://localhost:4000/auth/logout', '_self');
		this.props.handleNotAuthenticated();
	};
}
