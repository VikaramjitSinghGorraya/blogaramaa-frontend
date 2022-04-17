import React, { useState, useEffect } from 'react';
import {
	VStack,
	Image,
	Text,
	HStack,
	useMediaQuery,
	Link,
	Box,
	Stack,
	Heading,
	Button,
	Center,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import Moment from 'moment';
import Loader from '../components/Loader';
import PopoverItem from '../components/PopoverItem';
import Share from '../components/Share';
import {
	useGetPostBySlug,
	useGetPostPhoto,
	useIsLoggedIn,
	useDeletePost,
} from '../queries/Queries';
import DeletePostPopover from '../components/DeletePostPopover';
import MessageBox from '../components/MessageBox';
import bannerImage from '../icons/bannerImage.png';
import box from '../icons/box.svg';
import placeholderCircle from '../images/placeholderCircle.png';
import edit from '../icons/edit.svg';
import deletePost from '../icons/deletePost.svg';
import calendar from '../icons/calendar.svg';
import Overlay from '../components/Overlay';
const Post = () => {
	let { slug } = useParams();
	const [isLargerThan768] = useMediaQuery('(min-width: 769px)');
	const { isLoading: postLoading, data: postData } = useGetPostBySlug(slug);
	const { isLoading: photoLoading, data: photoData } = useGetPostPhoto(
		postData?.data._id
	);
	const postDeletionProcess = useDeletePost();
	const { status: loggedInStatus, data: loggedInData } = useIsLoggedIn();
	const navigate = useNavigate();
	const [showDelete, setShowDelete] = useState(false);
	useEffect(() => {
		console.log(photoData);
	}, [photoData]);
	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={postDeletionProcess.error}
				successStatus={false}
			/>
		);
	};

	const deleteHandler = (postId) => {
		console.log('Post deleted');
		postDeletionProcess.mutate(postId);
	};

	const blogDeletedSuccessfully = () => {
		setTimeout(() => {
			window.location.href = `/`;
		}, 2000);
	};

	const authorInfoAndOptions = () => {
		return (
			<Stack
				direction={['column', 'column', 'column', 'row']}
				spacing={0}
				w='100%'
				justifyContent='flex-end'
			>
				<Share showText={true} />
				<Button
					variant='base'
					color='brand.mutedText'
					onClick={() => (window.location.href = `/EditBlog/${slug}`)}
				>
					<Image src={edit} className='mutedIconColor' />
					Edit
				</Button>
				<Button
					variant='base'
					color='brand.mutedText'
					onClick={() => setShowDelete(true)}
				>
					<Image src={deletePost} className='mutedIconColor' />
					Delete
				</Button>
			</Stack>
		);
	};
	const postInfo = () => {
		return (
			<VStack
				w='100%'
				overflow='hidden'
				my='10'
				position='relative'
				spacing={2}
			>
				<Image
					h='200px'
					w='100%'
					src={photoData ? photoData : bannerImage}
					objectFit='cover'
				/>
				<Box
					bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.802959) 39%, rgba(250, 250, 250, 0.450018) 75%, rgba(250, 250, 250, 0) 100%)'
					h='150px'
					top='50px'
					position='absolute'
					left='0'
					right='0'
				></Box>
				<HStack w='100%'>
					<VStack
						p='2'
						w='100%'
						alignItems='flex-start'
						position='relative'
						top='-30px'
					>
						<Heading as='h2' color='brand.mutedText'>
							{postData?.data.title}
						</Heading>
						<HStack w='100%'>
							<Image h='2rem' w='2rem' src={placeholderCircle} />
							<Link variant='grayLink'>{postData?.data.postedBy.name}</Link>
						</HStack>
						<Stack
							direction={['column', 'column', 'column', 'row']}
							justifyContent='flex-start'
							w={['100%', '40%']}
						>
							<HStack w='fit-content'>
								<Image h='1.2rem' w='1.2rem' src={box} />
								<Text as='p' color='brand.mutedText'>
									{postData?.data.postCategory.title}
								</Text>
							</HStack>
							<HStack w='fit-content'>
								<Image h='1.2rem' w='1.2rem' src={calendar} />
								<Text as='p' color='brand.mutedText'>
									{Moment(postData?.data.createdAt).from(Date.now())}
								</Text>
							</HStack>
						</Stack>
					</VStack>
					{isLargerThan768 && loggedInStatus === 'success' ? (
						authorInfoAndOptions()
					) : loggedInStatus === 'success' &&
					  loggedInData?.data.userId === postData?.data.postedBy._id ? (
						<PopoverItem
							passedInput={authorInfoAndOptions()}
							left='-5.3rem'
							top='-7rem'
							width='7rem'
						/>
					) : null}
				</HStack>
			</VStack>
		);
	};

	const postBody = () => {
		return (
			<Box w='100%'>
				<Text as='p'>{parser(postData?.data.body)}</Text>
			</Box>
		);
	};

	const showDeleteOption = () => {
		return (
			<Box zIndex={99}>
				<DeletePostPopover
					toOpen={showDelete}
					toClose={setShowDelete}
					deleteHandler={deleteHandler}
					postId={postData?.data._id}
				/>
			</Box>
		);
	};

	const showOverlay = () => {
		return (
			<Box zIndex={1000}>
				<Overlay />
			</Box>
		);
	};
	const postContent = () => {
		return (
			<VStack alignItems='flex-end' w='100%' h='100%' spacing={0}>
				{postInfo()}
				{postBody()}
				{showDeleteOption()}
				{postDeletionProcess.isSuccess && showOverlay()}
			</VStack>
		);
	};
	return postLoading || photoLoading ? (
		<Center minH='100%' w='100%'>
			<Loader />
		</Center>
	) : (
		<VStack w='100%' py='4.5'>
			{postContent()}
			{postDeletionProcess.isError && displayErrorMessage()}
			{postDeletionProcess.isSuccess && blogDeletedSuccessfully()}
		</VStack>
	);
};

export default Post;
