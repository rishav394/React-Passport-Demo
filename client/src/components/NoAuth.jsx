import React from 'react';

function NoAuth() {
	return (
		<div>
			<div className="row">
				<div className="col-3"></div>
				<div className="col-6 lord">
					<img src="noauth.png" alt="no" />
					<h3>You shall not pass</h3>
					<h4>Without authentication</h4>
				</div>
			</div>
		</div>
	);
}

export default NoAuth;
