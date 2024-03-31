import React, { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';

const Profile = () => {
	const { isAuthenticated, setAuthenticated, loading, user } =
		useContext(Context);
	return loading ? (
		<Loader />
	) : (
		<div>
			<h1>{user?.name}</h1>
			<h1>{user?.email}</h1>
		</div>
	);
};

export default Profile;
