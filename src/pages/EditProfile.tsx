import React, { useEffect, useState } from 'react';
import {
	HStack,
	Link,
	VStack,
	Text,
	Image,
	Flex,
	FormLabel,
	Input,
	Textarea,
	Button,
	Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import Moment from 'moment';
import {
	useIsLoggedIn,
	useGetUserProfile,
	useGetUserPhoto,
	useUpdatePost,
	useUpdateUser,
} from '../queries/Queries';
import Banner from '../components/Banner';
import InputField from '../components/InputField';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import contact from '../icons/contact.svg';
import addImage from '../icons/addImage.svg';
import editProfile from '../icons/editProfile.svg';
import send from '../icons/send.svg';
import key from '../icons/key.svg';
import placeholderCircle from '../images/placeholderCircle.png';
import removeImage from '../icons/remove.svg';
import Overlay from '../components/Overlay';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const EditProfile = () => {
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

	const updateUser = useUpdateUser();

	const [bannerBackground, setBannerBackground] = useState('');

	const [userInfo, setUserData] = useState({
		fullName: userData?.user.name || '',
		about: userData?.user.about || '',
		photo: '',
	});

	useEffect(() => {
		setUserData({
			...userInfo,
			fullName: userData?.user.name || '',
			about: userData?.user.about || '',
			photo: photoData ? photoData : '',
		});
		setBannerBackground(photoData ? photoData : '');
	}, [userData, photoData]);

	const inputChangeHandler = (e) => {
		if (e.target.name === 'photo') {
			setUserData({ ...userInfo, [e.target.name]: e.target.files[0] });
			setBannerBackground(URL.createObjectURL(e.target.files[0]));
			console.log(userInfo);
			return;
		}
		setUserData({ ...userInfo, [e.target.name]: e.target.value });
		console.log(userInfo);
	};

	const removeSelectedBannerImage = (e) => {
		if (userInfo.photo) {
			setUserData({ ...userInfo, photo: '' });
		}
		setBannerBackground('');
		return;
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('Submitting form');
		console.log(userInfo);
		let formData = new FormData();
		formData.set('fullName', userInfo.fullName);
		formData.set('about', userInfo.about);
		formData.set('photo', userInfo.photo);
		updateUser.mutate(formData);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={updateUser.error}
				successStatus={false}
			/>
		);
	};

	const profileUpdatedSuccessfully = () => {
		setTimeout(() => {
			window.location.href = `/profile`;
		}, 2000);
	};

	const resetPassword = () => {
		return (
			<HStack
				w='100%'
				border='1px solid lightGray'
				borderRight='none'
				borderLeft='none'
				p='14px'
			>
				<Image className='iconColor' src={key} />
				<Link variant='blueLink' href='/forgotPassword'>
					RESET PASSWORD
				</Link>
			</HStack>
		);
	};

	const emailAndDateJoinedInfo = () => {
		return (
			<VStack w='100%' h='100%'>
				<HStack w='100%' border='1px solid lightGray' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						{userData?.user.email}
					</Text>
				</HStack>
				<HStack w='100%' border='1px solid lightGray' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						joined {Moment(userData?.user.createdAt).from(Date.now())}
					</Text>
				</HStack>
			</VStack>
		);
	};

	const photoAndUserInfo = () => {
		return (
			<Flex
				direction={['column', 'row']}
				justifyContent='space-between'
				alignItems={'center'}
				w='100%'
				position='relative'
			>
				<HStack
					h='200px'
					mb={['5', '0']}
					w='200px'
					color='white'
					bgImage={
						bannerBackground ? `url(${bannerBackground})` : placeholderCircle
					}
					bgPos='center center !important'
					bgSize='cover'
					justifyContent='center'
					position='relative'
					borderRadius='50%'
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
										onChange={inputChangeHandler}
										accept='image/*'
										hidden
									/>
								</>
							)}
						</FormLabel>
					</Box>
				</HStack>
				<VStack w={['100%', '70%']}>
					<InputField
						type='text'
						name='fullName'
						placeholder='FullName'
						value={userInfo.fullName}
						onChange={inputChangeHandler}
					/>
				</VStack>
			</Flex>
		);
	};

	const aboutSection = () => {
		return (
			<VStack w='100%' alignItems='flex-start' spacing={0}>
				<Text as='small' color='brand.mutedTextLight'>
					About
				</Text>
				<Textarea
					name='about'
					h='150px'
					value={userInfo.about}
					onChange={inputChangeHandler}
				/>
			</VStack>
		);
	};
	const editProfilePageContent = () => {
		return (
			<VStack alignItems='flex-end' w='100%' h='100%' spacing={5}>
				<Banner heading='Edit Profile' icon={editProfile} />
				{resetPassword()}
				{emailAndDateJoinedInfo()}
				{photoAndUserInfo()}
				{aboutSection()}
				<MotionButton
					{...buttonAnimation}
					variant='long'
					onClick={submitHandler}
					isLoading={updateUser.isLoading ? true : false}
				>
					<Image className='iconColor' src={send} />
					UPDATE
				</MotionButton>
				{updateUser.isSuccess && <Overlay />}
			</VStack>
		);
	};
	return loggedInStatus === 'error' ? (
		<Navigate to='/signin' />
	) : userLoading || photoLoading ? (
		<Loader />
	) : (
		<MotionVStack {...pageDisplayAnimation} w='100%' my='56px' py='5'>
			{editProfilePageContent()}
			{updateUser.isError && displayErrorMessage()}
			{updateUser.isSuccess && profileUpdatedSuccessfully()}
		</MotionVStack>
	);
};

export default EditProfile;
