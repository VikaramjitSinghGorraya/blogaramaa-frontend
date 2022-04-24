import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	FormLabel,
	Input,
	VStack,
	HStack,
	Select,
	Image,
	Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Navigate, useParams } from 'react-router-dom';
import {
	useGetCategories,
	useIsLoggedIn,
	useUpdatePost,
	useGetPostBySlug,
	useGetPostPhoto,
} from '../queries/Queries';
import Banner from '../components/Banner';
import MessageBox from '../components/MessageBox';
import Overlay from '../components/Overlay';
import Loader from '../components/Loader';
import BlogEditor from '../components/BlogEditor';
import send from '../icons/send.svg';
import check from '../icons/check.svg';
import addImage from '../icons/addImage.svg';
import removeImage from '../icons/remove.svg';
import writeBlog from '../icons/writeBlog.svg';
import bannerImage from '../icons/bannerImage.png';
import { buttonAnimation } from '../components/Animations';

const MotionButton = motion(Button);

const Blog = () => {
	const { slug } = useParams();
	const { status: loggedInStatus } = useIsLoggedIn();
	const { isLoading: postToBeUpdatedLoading, data: postToBeUpdatedData } =
		useGetPostBySlug(slug);
	const updatePost = useUpdatePost(slug);
	const { isLoading: photoLoading, data: photoData } = useGetPostPhoto(
		postToBeUpdatedData?.data._id
	);
	const { data } = useGetCategories();
	const [blogPost, setBlogPost] = useState({
		photo: '',
		title: '',
		category: '',
	});
	const [blogText, setBlogText] = useState('');
	const [bannerBackground, setBannerBackground] = useState('');

	useEffect(() => {
		setBlogPost({
			...blogPost,
			photo: photoData ? photoData : '',
			title: postToBeUpdatedData?.data.title,
			category: postToBeUpdatedData?.data.postCategory._id,
		});
		setBlogText(postToBeUpdatedData?.data.body);
		setBannerBackground(photoData ? photoData : '');
	}, [postToBeUpdatedData?.data, photoData]);

	const titleChangeHandler = (e) => {
		setBlogPost({ ...blogPost, title: e.target.value });
	};
	const categoryChangeHandler = (e) => {
		setBlogPost({ ...blogPost, category: e.target.value });
	};
	const photoChangeHandler = (e) => {
		setBlogPost({ ...blogPost, photo: e.target.files[0] });
		setBannerBackground(URL.createObjectURL(e.target.files[0]));
	};

	const bodyChangeHandler = (e) => {
		setBlogText(e);
		console.log(blogPost);
	};

	const removeSelectedBannerImage = (e) => {
		if (blogPost.photo) {
			setBlogPost({ ...blogPost, photo: '' });
		}
		setBannerBackground('');
		return;
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.set('photo', blogPost.photo || '');
		formData.set('title', blogPost.title);
		formData.set('category', blogPost.category);
		formData.set('body', blogText || '');
		updatePost.mutate(formData);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={updatePost.error}
				successStatus={false}
			/>
		);
	};

	const blogPostedSuccessfully = () => {
		setTimeout(() => {
			localStorage.removeItem('blog');
			window.location.href = `/post/${updatePost.data?.data.slug}`;
		}, 2000);
	};

	const BannerImg = () => {
		return (
			<VStack
				w='100%'
				spacing={0}
				position='relative'
				h='200px'
				alignItems='flex-start'
			>
				<Text as='small' color='brand.mutedText'>
					Banner Image
				</Text>

				<HStack
					h='300px'
					w='100%'
					color='white'
					bg='brand.primaryBlueLight'
					bgImage={bannerBackground ? `url(${bannerBackground})` : bannerImage}
					bgPos='center center !important'
					bgSize='cover'
					justifyContent='center'
					position='relative'
				>
					<Box
						h='128px'
						w='128px'
						bg='rgba(0, 0, 0, 0.5)'
						borderRadius='50%'
						position='absolute'
						p='5'
					>
						<FormLabel mx='auto' cursor='pointer'>
							<Image
								className='whiteIconColor'
								src={bannerBackground ? removeImage : addImage}
							/>
							{bannerBackground ? (
								<>
									<Input onClick={removeSelectedBannerImage} hidden />
								</>
							) : (
								<>
									{''}
									<Input
										name='photo'
										type='file'
										onChange={photoChangeHandler}
										accept='image/*'
										hidden
									/>
								</>
							)}
						</FormLabel>
					</Box>
				</HStack>
				<Text as='small' color='brand.mutedTextLight'>
					featured image & used as a banner over the top of blog post
				</Text>
			</VStack>
		);
	};
	const titleAndCategory = () => {
		return (
			<VStack w='100%' spacing={5}>
				<VStack w='100%' alignItems='flex-start' spacing={0}>
					<Input
						type='text'
						name='title'
						value={blogPost.title}
						onChange={titleChangeHandler}
						placeholder='Blog Title*'
						p='5'
					/>
					<Text as='small' color='brand.mutedTextLight'>
						blog will be identified with this title
					</Text>
				</VStack>
				<VStack w='100%' alignItems='flex-start' spacing={0}>
					<Select
						name='category'
						vlaue={blogPost.category}
						placeholder='Category*'
						onChange={categoryChangeHandler}
						color='brand.mutedTextLight'
					>
						{data?.data?.categories.map((category, index) =>
							postToBeUpdatedData?.data.postCategory._id === category._id ? (
								<option key={index} value={category._id} selected={true}>
									{category.title}
								</option>
							) : (
								<option key={index} value={category._id}>
									{category.title}
								</option>
							)
						)}
					</Select>
					<Text as='small' color='brand.mutedTextLight'>
						please select a category
					</Text>
				</VStack>
			</VStack>
		);
	};
	const textEditor = () => {
		return (
			<>
				<BlogEditor contents={blogText} onChange={bodyChangeHandler} />
				{updatePost.isSuccess && <Overlay />}
			</>
		);
	};

	const blogPageContent = () => {
		return (
			<VStack w='100%' h='100%' alignItems='flex-end' overflow='hidden'>
				<Banner heading='Edit blog' icon={writeBlog} />
				{BannerImg()}
				{titleAndCategory()}
				{textEditor()}
				{!updatePost.isSuccess && (
					<MotionButton
						{...buttonAnimation}
						variant='long'
						onClick={submitHandler}
						isLoading={updatePost.isLoading ? true : false}
					>
						<Image className='iconColor' src={send} />
						UPDATE
					</MotionButton>
				)}
				{updatePost.isSuccess && (
					<HStack>
						<Image src={check} />
						<Text color='green.500'>Blog updated successfully</Text>
					</HStack>
				)}
			</VStack>
		);
	};
	return loggedInStatus === 'error' ? (
		<Navigate to='/' />
	) : postToBeUpdatedLoading || photoLoading ? (
		<Loader />
	) : (
		<HStack w='100%' my='56px' py='5'>
			{blogPageContent()}
			{updatePost.error && displayErrorMessage()}
			{updatePost.isSuccess && blogPostedSuccessfully()}
		</HStack>
	);
};

export default Blog;
