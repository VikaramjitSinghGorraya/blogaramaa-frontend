import React, { useEffect } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Text,
	Center,
	VStack,
	Image,
	Grid,
	HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Moment from 'moment';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Share from '../components/Share';
import BlogCard from '../components/BlogCard';
import {
	useGetOtherUserProfile,
	useGetPostsByOtherUserId,
	useGetUserPhoto,
	useIsLoggedIn,
} from '../queries/Queries';
import placeholderCircle from '../images/placeholderCircle.png';
import user from '../icons/user.svg';
import calendar from '../icons/calendar.svg';
import contact from '../icons/contact.svg';
import { pageDisplayAnimation } from '../components/Animations';

const MotionVStack = motion(VStack);
const OtherUserProfile = () => {
	const { authorId } = useParams();
	const { data: loggedInData } = useIsLoggedIn();
	useEffect(() => {
		console.log(loggedInData);
	}, [loggedInData]);
	const {
		isLoading: userLoading,
		isError: userError,
		isSuccess: userSuccess,
		data: userData,
	} = useGetOtherUserProfile(authorId);

	const { isLoading: photoLoading, data: photoData } =
		useGetUserPhoto(authorId);

	const {
		isLoading: postsLoading,
		isError: postsError,
		isSuccess: potsSuccess,
		data: postData,
	} = useGetPostsByOtherUserId(authorId);

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
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		);
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
				</HStack>
			</HStack>
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
	return userLoading || postsLoading ? (
		<Center minH='100%' w='100%'>
			<Loader />
		</Center>
	) : loggedInData?.data.userId === authorId ? (
		<Navigate to='/profile' />
	) : (
		<MotionVStack {...pageDisplayAnimation} w='100%' my='56px' py='5'>
			{profilePageContent()}
		</MotionVStack>
	);
};

export default OtherUserProfile;
