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
import { motion } from 'framer-motion';
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
	useGetUserPhoto,
} from '../queries/Queries';
import DeleteAndSignoutPopover from '../components/DeleteAndSignoutPopover';
import MessageBox from '../components/MessageBox';
import CommentSection from '../components/CommentSection';
import bannerImage from '../icons/bannerImage.png';
import box from '../icons/box.svg';
import placeholderCircle from '../images/placeholderCircle.png';
import edit from '../icons/edit.svg';
import deletePost from '../icons/deletePost.svg';
import calendar from '../icons/calendar.svg';
import Overlay from '../components/Overlay';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const Post = () => {
	let { slug } = useParams();
	const [isLargerThan768] = useMediaQuery('(min-width: 769px)');
	const { isLoading: postLoading, data: postData } = useGetPostBySlug(slug);
	const { isLoading: photoLoading, data: photoData } = useGetPostPhoto(
		postData?.data._id
	);
	const postDeletionProcess = useDeletePost();
	const { status: loggedInStatus, data: loggedInData } = useIsLoggedIn();
	const { isLoading: userPhotoLoading, data: userPhotoData } = useGetUserPhoto(
		postData?.data.postedBy._id
	);

	const [showDelete, setShowDelete] = useState(false);

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

				{loggedInStatus === 'success' &&
					loggedInData?.data.userId === postData?.data.postedBy._id && (
						<>
							<MotionButton
								{...buttonAnimation}
								variant='base'
								color='brand.mutedText'
								onClick={() => (window.location.href = `/EditBlog/${slug}`)}
							>
								<Image src={edit} className='mutedIconColor' />
								Edit
							</MotionButton>
							<MotionButton
								{...buttonAnimation}
								variant='base'
								color='brand.mutedText'
								onClick={() => setShowDelete(true)}
							>
								<Image src={deletePost} className='mutedIconColor' />
								Delete
							</MotionButton>
						</>
					)}
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
						minW='80%'
						maxW='80%'
						alignItems='flex-start'
						position='relative'
						top='-30px'
					>
						<Heading as='h2' w='100%' color='brand.mutedText'>
							{postData?.data.title}
						</Heading>
						<HStack w='100%'>
							<Image
								h='2rem'
								w='2rem'
								borderRadius='50%'
								src={userPhotoData ? userPhotoData : placeholderCircle}
							/>
							<Link
								href={
									loggedInStatus === 'success' &&
									loggedInData?.data.userId === postData?.data.postedBy._id
										? '/profile'
										: `/profile/${postData?.data.postedBy._id}`
								}
								variant='grayLink'
							>
								{postData?.data.postedBy.name}
							</Link>
						</HStack>
						<Stack
							direction={['column', 'column', 'column', 'row']}
							justifyContent='flex-start'
							w={['100%', '50%']}
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
					{isLargerThan768 ? (
						authorInfoAndOptions()
					) : (
						<PopoverItem
							passedInput={authorInfoAndOptions()}
							left='-5.3rem'
							top={
								loggedInData?.data.userId !== postData?.data.postedBy._id
									? '-3rem'
									: '-7rem'
							}
							width='7rem'
						/>
					)}
				</HStack>
			</VStack>
		);
	};

	const postBody = () => {
		return (
			<Box w='100%' textAlign='justify' pb='150px' px='10px'>
				{parser(postData?.data.body)}
			</Box>
		);
	};

	const showDeleteOption = () => {
		return (
			<Box zIndex={99}>
				<DeleteAndSignoutPopover
					toOpen={showDelete}
					toClose={setShowDelete}
					deleteHandler={deleteHandler}
					postId={postData?.data._id}
					header={'Are you sure you want to delete this blog ?'}
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
				<CommentSection
					name={process.env.REACT_APP_SHORTNAME ?? ''}
					config={{
						url: window.location.href,
						identifier: postData?.data._id,
						title: postData?.data.title,
					}}
				/>
				{showDeleteOption()}
				{postDeletionProcess.isSuccess && showOverlay()}
			</VStack>
		);
	};
	return postLoading || photoLoading || userPhotoLoading ? (
		<Center minH='100%' w='100%'>
			<Loader />
		</Center>
	) : (
		<MotionVStack {...pageDisplayAnimation} w='100%' py='4.5'>
			{postContent()}
			{postDeletionProcess.isError && displayErrorMessage()}
			{postDeletionProcess.isSuccess && blogDeletedSuccessfully()}
		</MotionVStack>
	);
};

export default Post;
