import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useIsLoggedIn } from '../queries/Queries';
import { ProtectedRouteInfo } from '../types/ProtectRoute';
import Loader from './Loader';

const ProtectedRoute = ({ children }: ProtectedRouteInfo) => {
	const { status: loggedInStatus, data: loggedInData } = useIsLoggedIn();
	const location = useLocation();

	useEffect(() => {
		localStorage.setItem('infoId', loggedInData?.data.userId);
	}, [loggedInData]);

	return loggedInStatus === 'loading' ? (
		<Loader />
	) : loggedInStatus === 'success' ? (
		location.pathname.includes('Signin') ||
		location.pathname.includes('Signup') ? (
			<Navigate to='/' />
		) : (
			children
		)
	) : location.pathname.includes('Signin') ||
	  location.pathname.includes('Signup') ? (
		children
	) : (
		<Navigate to='/Signin' />
	);
};

export default ProtectedRoute;
