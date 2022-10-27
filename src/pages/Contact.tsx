import React, { useState, useEffect } from 'react';
import {
	HStack,
	VStack,
	Text,
	Button,
	Image,
	Textarea,
	Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Banner from '../components/Banner';
import { useGetUserProfile, useContactUser } from '../queries/Queries';
import MessageBox from '../components/MessageBox';
import contactPage from '../icons/contactPage.svg';
import send from '../icons/send.svg';
import contact from '../icons/contact.svg';
import user from '../icons/user.svg';
import { ReactComponent as Signin } from '../icons/signin.svg';
import { checkforUserIdInLocalStorage } from '../helpers/Functions';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const Contact = () => {
	const { data: userData } = useGetUserProfile();

	const sendMessage = useContactUser();

	const [message, setMessageData] = useState({
		text: '',
		userEmail: userData?.user.email,
		inputCleared: false,
	});

	useEffect(() => {
		console.log(checkforUserIdInLocalStorage());
	}, []);
	const inputChangehandler = (e) => {
		setMessageData({ ...message, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setMessageData({ ...message, userEmail: userData?.user.email });
	}, [message, sendMessage.data, userData?.user.email]);

	const submitHandler = () => {
		setMessageData({ ...message, inputCleared: false });
		sendMessage.mutate(message);
	};

	const displaySuccessMessage = () => {
		if (!message.inputCleared) {
			setMessageData({
				...message,
				userEmail: '',
				text: '',
				inputCleared: true,
			});
		}
		return (
			<MessageBox
				toastId='success-id'
				title='You did it!!!'
				description={sendMessage.data}
				successStatus={true}
			/>
		);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={sendMessage.error}
				successStatus={false}
			/>
		);
	};

	const emailAndDateJoinedInfo = () => {
		return (
			<VStack w='100%' h='100%'>
				<HStack w='100%' p='14px'>
					<Image src={user} />
					<Text as='p' color='brand.mutedTextLight'>
						{userData?.user.name}
					</Text>
				</HStack>
				<HStack w='100%' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						{userData?.user.email}
					</Text>
				</HStack>
			</VStack>
		);
	};

	const messageInput = () => {
		return (
			<VStack w='100%' alignItems='flex-end'>
				<Textarea
					h='150px'
					name='text'
					value={message.text}
					onChange={inputChangehandler}
				/>
				<MotionButton
					{...buttonAnimation}
					variant='long'
					onClick={submitHandler}
					isLoading={sendMessage.isLoading ? true : false}
				>
					<Image src={send} className='iconColor' />
					SEND
				</MotionButton>
			</VStack>
		);
	};

	const userNotLggedIn = () => {
		return (
			<VStack w='100%' h='100%' justifyContent='center'>
				<MotionButton
					{...buttonAnimation}
					variant='long'
					onClick={() => (window.location.href = '/signin')}
				>
					<Signin className='iconColor' />
					SIGNIN TO SEND MAIL
				</MotionButton>
				<Divider w='100%' />
				<Text as='p' color='brand.mutedText' textAlign='center'>
					OR <br />
					Mail us at <br />
					blogaramaa@gmail.com
				</Text>
			</VStack>
		);
	};
	const contactPageContent = () => {
		return (
			<VStack w='100%' h='100%'>
				<Banner heading='Contact Us' icon={contactPage} />
				{checkforUserIdInLocalStorage() && emailAndDateJoinedInfo()}
				{checkforUserIdInLocalStorage() && messageInput()}
				{!checkforUserIdInLocalStorage() && userNotLggedIn()}
			</VStack>
		);
	};
	return (
		<MotionVStack {...pageDisplayAnimation} w='100%' h='100%' my='56px' py='5'>
			{contactPageContent()}
			{sendMessage.isError && displayErrorMessage()}
			{sendMessage.isSuccess && displaySuccessMessage()}
		</MotionVStack>
	);
};

export default Contact;
