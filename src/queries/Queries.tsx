import axios from 'axios';
import { userInfo } from 'os';
import { useQuery, useMutation } from 'react-query';
import { UserInfo } from '../types/User';
import { SignupInfo } from '../types/Signup';
//POSTS

export const getAllPosts = async () => {
	const postsRetrieved = await axios.get('http://localhost:4000/api/posts');
	return postsRetrieved;
};

export const useGetAllProducts = () => {
	return useQuery(`allProducts`, () => getAllPosts(), {
		refetchOnMount: false,
	});
};

export const preSignup = async (userData) => {
	const userPreRegistered = await axios.post(
		`http://localhost:4000/auth/verification`,
		userData
	);
	return userPreRegistered.data;
};

export const signup = async (tokenInfo) => {
	const userRegistered = await axios.post(
		`http://localhost:4000/auth/signup`,
		tokenInfo
	);
	return userRegistered.data;
};

export const usePreSignup = () => {
	return useMutation(['preSignup'], (userData: UserInfo) =>
		preSignup(userData)
	);
};

export const useSignup = () => {
	return useMutation(['signup'], (tokenInfo: SignupInfo) => signup(tokenInfo));
};
