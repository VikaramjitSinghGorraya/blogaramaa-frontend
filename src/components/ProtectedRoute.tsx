import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useIsLoggedIn } from '../queries/Queries';
import { ProtectedRouteInfo } from '../types/ProtectRoute';
import Loader from './Loader';

const ProtectedRoute = ({ children }: ProtectedRouteInfo) => {
	const { status: loggedInStatus, data: loggedInData } = useIsLoggedIn();

	useEffect(() => {
		localStorage.setItem('infoId', loggedInData?.data.userId);
	}, [loggedInData]);

	return loggedInStatus === 'loading' ? (
		<Loader />
	) : loggedInStatus === 'success' ? (
		children
	) : (
		<Navigate to='/Signin' />
	);
};

export default ProtectedRoute;
