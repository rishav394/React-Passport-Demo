import React from 'react';

function Profile({ profile }) {
	return (
		<div>
			<div className="row" style={{ marginBottom: 0 }}>
				<div className="col s10 offset-s1">
					<div className="card z-depth-0">
						<div className="card-image hide-on-small-and-down">
							<img src={profile.user.avatar} />
						</div>
						<div className="card-content center">
							<p>{profile.user.username}</p>
							<p className="grey-text">{profile.user.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
