import React, { useState } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Box,
	AccordionIcon,
	Text,
	Center,
	VStack,
	Image,
	Button,
	Grid,
	HStack,
	Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Moment from 'moment';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Share from '../components/Share';
import BlogCard from '../components/BlogCard';
import {
	useGetUserProfile,
	useGetPostsByUserId,
	useIsLoggedIn,
	useGetUserPhoto,
	useSigninout,
} from '../queries/Queries';
import { Navigate } from 'react-router-dom';
import PopoverItem from '../components/PopoverItem';
import Overlay from '../components/Overlay';
import DeleteAndSignoutPopover from '../components/DeleteAndSignoutPopover';
import placeholderCircle from '../images/placeholderCircle.png';
import user from '../icons/user.svg';
import signout from '../icons/signout.svg';
import calendar from '../icons/calendar.svg';
import contact from '../icons/contact.svg';
import setting from '../icons/settings.svg';
import { pageDisplayAnimation } from '../components/Animations';

const MotionVStack = motion(VStack);
const Profile = () => {
	const [showSignout, setShowSignout] = useState(false);
	const { status: loggedInStatus, isLoading: checkingIfUserIsLoggedIn } =
		useIsLoggedIn();
	const {
		isLoading: userLoading,
		isError: userError,
		isSuccess: userSuccess,
		data: userData,
	} = useGetUserProfile();
	const { isLoading: photoLoading, data: photoData } = useGetUserPhoto(
		userData?.user._id
	);
	const {
		isLoading: postsLoading,
		isError: postsError,
		isSuccess: potsSuccess,
		data: postData,
	} = useGetPostsByUserId();
	const signoutProcess = useSigninout();

	const SignoutHandler = () => {
		setShowSignout(false);
		signoutProcess.mutate();
	};

	const aboutSection = () => {
		return (
			<Accordion allowToggle w='100%' color='brand.mutedText'>
				<AccordionItem border='none'>
					<h2>
						<AccordionButton _hover={{ bg: 'none' }} px='0'>
							<HStack w='100%'>
								<Image src={user} alt='user' className='mutedIconColor' />
								<Text as='p' color='brand.mutedText'>
									About
								</Text>
							</HStack>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} color='brand.mutedText' p='0'>
						{userData.user.about}
						<Link
							href={`/editProfile`}
							variant='blueLink'
							alignSelf='flex-start'
							w='100%'
						>
							<HStack w='100%' my='2'>
								<Image src={setting} className='iconColor' />
								<Text>EDIT PROFILE</Text>
							</HStack>
						</Link>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		);
	};

	const signoutPopover = () => {
		return (
			<Button w='7rem' variant='base' onClick={() => setShowSignout(true)}>
				<HStack>
					<Image src={signout} className='mutedIconColor' />{' '}
					<Text as='p' color='brand.mutedText'>
						Signout
					</Text>
				</HStack>
			</Button>
		);
	};
	const showSignoutOption = () => {
		return (
			<Box zIndex={99}>
				<DeleteAndSignoutPopover
					toOpen={showSignout}
					toClose={setShowSignout}
					deleteHandler={SignoutHandler}
					postId={postData?.data._id}
					header={'Are you sure you want to signout ?'}
				/>
			</Box>
		);
	};

	const userSignedoutSuccessfully = () => {
		setTimeout(() => {
			window.location.href = `/signin`;
		}, 2000);
	};

	const displayUserInfoShareAndSignout = () => {
		return (
			<HStack w='100%' alignItems='flex-end' justifyContent='space-between'>
				<VStack w='55%' h='100%'>
					<HStack w='100%' spacing={1}>
						<Image src={contact} className='mutedIconColor' />
						<Text as='p' color='brand.mutedTextLight'>
							{userData.user.email}
						</Text>
					</HStack>
					<HStack w='100%' spacing={1}>
						<Image src={calendar} className='mutedIconColor' />
						<Text as='p' color='brand.mutedTextLight' w='100%'>
							joined {Moment(userData.user.createdAt).from(Date.now())}
						</Text>
					</HStack>
				</VStack>

				<HStack
					spacing={-5}
					maxH='1.5rem'
					maxW='6.5rem'
					justifyContent='center'
				>
					<Share showText={false} />
					<PopoverItem passedInput={signoutPopover()} />
				</HStack>
			</HStack>
		);
	};

	const showOverlay = () => {
		return (
			<Box zIndex={1000}>
				<Overlay />
			</Box>
		);
	};

	const profilePageContent = () => {
		return (
			<VStack w='100%' h='fit-content'>
				<Banner
					heading={userData?.user.name}
					icon={photoData ? photoData : placeholderCircle}
				/>
				{aboutSection()}
				{displayUserInfoShareAndSignout()}
				{showSignoutOption()}
				{signoutProcess.isSuccess && showOverlay()}
				<Grid
					templateColumns={[
						'repeat(auto-fit, minmax(300px, 1fr))',
						'repeat(auto-fit, minmax(600px, 500xp))',
						'repeat(2, minmax(600px, 1fr))',
					]}
				>
					{postData?.data.postsFound.map((post, index) => (
						<BlogCard
							key={index}
							cardWidth='90%'
							title={post.title}
							author={post.postedBy.name}
							authorId={post.postedBy._id}
							category={post.postCategory.title}
							body={post.body}
							postId={post._id}
							posted={post.createdAt}
							slug={post.slug}
						/>
					))}
				</Grid>
			</VStack>
		);
	};
	return userLoading ||
		checkingIfUserIsLoggedIn ||
		postsLoading ||
		photoLoading ? (
		<Center minH='100%' w='100%'>
			<Loader />
		</Center>
	) : loggedInStatus === 'error' ? (
		<Navigate to='/signin' />
	) : (
		<MotionVStack {...pageDisplayAnimation} w='100%' my='56px' py='5'>
			{profilePageContent()}
			{signoutProcess.isSuccess && userSignedoutSuccessfully()}
		</MotionVStack>
	);
};

export default Profile;
