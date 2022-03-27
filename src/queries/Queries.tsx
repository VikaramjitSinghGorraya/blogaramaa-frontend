import axios from 'axios';
import { userInfo } from 'os';
import { useQuery, useMutation } from 'react-query';
import { UserInfo } from '../types/User';
import { SignupInfo } from '../types/Signup';

//------------------------POST RELATED QUERIES------------------------------------

export const getPhotoOfPost = async (postId) => {
	const photo = await axios.get(
		`http://localhost:4000/post/getPhoto/${postId}`
	);
	return photo.config.url;
};

export const getAllPosts = async () => {
	const postsRetrieved = await axios.get('http://localhost:4000/post/allPosts');
	return postsRetrieved;
};

export const getPostBySlug = async (slug) => {
	const postRetrieved = await axios.get(
		`http://localhost:4000/post/read/${slug}`
	);
	return postRetrieved;
};

export const useGetPosts = () => {
	return useQuery(['allPosts'], () => getAllPosts());
};

export const useGetPostBySlug = (slug) => {
	return useQuery([`post-${slug}`], () => getPostBySlug(slug));
};

export const useGetPostPhoto = (postId) => {
	return useQuery([`postPhoto-${postId}`], () => getPhotoOfPost(postId));
};

//--------------------------AUTH QUERIES------------------------------------
export const preSignup = async (userData) => {
	const preRegisterUser = await axios.post(
		`http://localhost:4000/auth/verification`,
		userData
	);

	return preRegisterUser;
};

export const signup = async (tokenInfo) => {
	const userRegistered = await axios.post(
		`http://localhost:4000/auth/signup`,
		tokenInfo
	);
	return userRegistered.data;
};

export const signin = async (userData) => {
	console.log(userData);
	const userSignedInd = await axios.post(
		`http://localhost:4000/auth/signin`,
		userData,
		{ withCredentials: true }
	);
	return userSignedInd;
};

export const usePreSignup = () => {
	return useMutation(['preSignup'], (userData: UserInfo) =>
		preSignup(userData)
	);
};

export const useSignup = () => {
	return useMutation(['signup'], (tokenInfo: SignupInfo) => signup(tokenInfo));
};

export const useSignin = () => {
	return useMutation(['signin'], (userData: UserInfo) => signin(userData));
};
