import axios from 'axios';
import { userInfo } from 'os';
import { useQuery, useMutation } from 'react-query';
import { UserInfo } from '../types/User';
import { SignupInfo } from '../types/Signup';

//------------------------POST RELATED QUERIES------------------------------------

export const getPhotoOfPost = async (postId: string) => {
	const photo = await axios.get(
		`http://localhost:4000/post/getPhoto/${postId}`
	);
	return photo.config.url;
};

export const getAllPosts = async () => {
	const postsRetrieved = await axios.get('http://localhost:4000/post/allPosts');
	return postsRetrieved;
};

export const getPostBySlug = async (slug: string) => {
	const postRetrieved = await axios.get(
		`http://localhost:4000/post/read/${slug}`
	);
	return postRetrieved;
};

export const getPostBySearchTerm = async (term) => {
	const postRetrieved = await axios.get(
		`http://localhost:4000/post/find/${term}`
	);
	return postRetrieved;
};

export const getPostsByUserId = async () => {
	const postRetrieved = await axios.get(
		`http://localhost:4000/post/postsByUser`,
		{ withCredentials: true }
	);
	return postRetrieved;
};

export const createNewPost = async (postBody) => {
	const postRetrieved = await axios.post(
		`http://localhost:4000/post/createPost`,
		postBody,
		{ withCredentials: true }
	);
	return postRetrieved;
};

export const updatePost = async (postBody, slug) => {
	const postRetrieved = await axios.post(
		`http://localhost:4000/post/updatePost/${slug}`,
		postBody,
		{ withCredentials: true }
	);
	return postRetrieved;
};

export const useGetPosts = () => {
	return useQuery(['allPosts'], () => getAllPosts());
};

export const useGetPostBySlug = (slug) => {
	return useQuery([`post-${slug}`], () => getPostBySlug(slug), {
		enabled: !!slug,
	});
};

export const useGetPostsByUserId = () => {
	return useQuery([`postByUser`], () => getPostsByUserId());
};

export const useGetPostBySearchTerm = (term) => {
	return useMutation([`search-${term}`], (term: string) =>
		getPostBySearchTerm(term)
	);
};

export const useGetPostPhoto = (postId) => {
	return useQuery([`postPhoto-${postId}`], () => getPhotoOfPost(postId), {
		enabled: !!postId,
		retry: false,
		refetchOnWindowFocus: false,
	});
};

export const useCreatePost = () => {
	return useMutation(['createPost'], (postBody: FormData) =>
		createNewPost(postBody)
	);
};

export const useUpdatePost = (slug) => {
	return useMutation(['updatePost'], (postBody: FormData) =>
		updatePost(postBody, slug)
	);
};

//--------------------------CATEGORY QUERIES--------------------------------

export const getCategories = async () => {
	const categoriesRetrieved = await axios.get(
		`http://localhost:4000/category/getCategories`
	);
	return categoriesRetrieved;
};

export const useGetCategories = () => {
	return useQuery([`categories`], () => getCategories());
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
	const userSignedInd = await axios.post(
		`http://localhost:4000/auth/signin`,
		userData,
		{ withCredentials: true }
	);
	return userSignedInd;
};

export const isLoggedIn = async () => {
	const userSignedInd = await axios.get(
		`http://localhost:4000/auth/isLoggedIn`,
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

export const useIsLoggedIn = () => {
	return useQuery(['isLoggedIn'], () => isLoggedIn(), {
		retry: 0,
		refetchOnMount: true,
		cacheTime: 0,
	});
};
//----------------------------------USER QUERIES-------------------------------

export const getUserById = async () => {
	const userRegistered = await axios.get(
		`http://localhost:4000/user/getUserById`,
		{ withCredentials: true }
	);
	return userRegistered.data;
};

export const useGetUserById = () => {
	return useQuery([`user`], () => getUserById());
};
