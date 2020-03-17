import React from 'react';

function Profile({ profile }) {
	return (
		<div>
			<div>
				<div className="card-panel grey lighten-5 z-depth-0">
					<div className="row valign-wrapper">
						<div className="col s4">
							<img
								src={profile.user.avatar}
								alt="X"
								className="circle responsive-img"
							/>
						</div>
						<div className="col s8">
							<span className="black-text flow-text">
								{profile.user.username}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
