import React, { useState } from 'react';
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
import { useNavigate, Navigate } from 'react-router-dom';
import {
	useGetCategories,
	useIsLoggedIn,
	useCreatePost,
} from '../queries/Queries';
import { motion } from 'framer-motion';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';
import Banner from '../components/Banner';
import MessageBox from '../components/MessageBox';
import Overlay from '../components/Overlay';
import BlogEditor from '../components/BlogEditor';
import send from '../icons/send.svg';
import check from '../icons/check.svg';
import addImage from '../icons/addImage.svg';
import removeImage from '../icons/remove.svg';
import writeBlog from '../icons/writeBlog.svg';
import bannerImage from '../icons/bannerImage.png';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);
const Blog = () => {
	const { status: loggedInStatus } = useIsLoggedIn();
	const postCreation = useCreatePost();
	const navigate = useNavigate();
	const { data } = useGetCategories();

	const blogTextFromLocalStorage = () => {
		if (localStorage.getItem('blog')) {
			return localStorage.getItem('blog');
		}
		return '';
	};
	const [blogPost, setBlogPost] = useState({
		photo: null,
		title: '',
		category: '',
	});

	const [bannerBackground, setBannerBackground] = useState('');
	const [savedBlog, setSavedBlog] = useState(blogTextFromLocalStorage() || '');

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
		setSavedBlog(e);
		localStorage.setItem('blog', e);
	};

	const removeSelectedBannerImage = (e) => {
		setBannerBackground('');
		return;
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.set('photo', blogPost.photo || '');
		formData.set('title', blogPost.title);
		formData.set('category', blogPost.category);
		formData.set('body', savedBlog || '');
		postCreation.mutate(formData);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={postCreation.error}
				successStatus={false}
			/>
		);
	};

	const blogPostedSuccessfully = () => {
		setTimeout(() => {
			localStorage.removeItem('blog');
			navigate(`/post/${postCreation.data?.data.slug}`);
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
						{data?.data?.categories.map((category, index) => (
							<option key={index} value={category._id}>
								{category.title}
							</option>
						))}
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
				<BlogEditor
					contents={savedBlog ? savedBlog : ''}
					onChange={bodyChangeHandler}
				/>
				{postCreation.isSuccess && !postCreation.isLoading && <Overlay />}
			</>
		);
	};

	const blogPageContent = () => {
		return (
			<VStack w='100%' h='100%' alignItems='flex-end' overflow='hidden'>
				<Banner heading='Write blog' icon={writeBlog} />
				{BannerImg()}
				{titleAndCategory()}
				{textEditor()}
				{!postCreation.isSuccess && (
					<MotionButton
						{...buttonAnimation}
						variant='long'
						onClick={submitHandler}
						isLoading={postCreation.isLoading ? true : false}
					>
						<Image className='iconColor' src={send} />
						PUBLISH
					</MotionButton>
				)}
				{postCreation.isSuccess && (
					<HStack>
						<Image src={check} />
						<Text color='green.500'>Blog created successfully</Text>
					</HStack>
				)}
			</VStack>
		);
	};
	return loggedInStatus === 'error' ? (
		<Navigate to='/' />
	) : (
		<MotionVStack {...pageDisplayAnimation} w='100%' my='56px' py='5'>
			{blogPageContent()}
			{postCreation.error && displayErrorMessage()}
			{postCreation.isSuccess && blogPostedSuccessfully()}
		</MotionVStack>
	);
};

export default Blog;
