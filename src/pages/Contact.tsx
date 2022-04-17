import React from 'react';
import {
	HStack,
	VStack,
	Text,
	Button,
	Image,
	Textarea,
	Divider,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { useIsLoggedIn } from '../queries/Queries';
import contactPage from '../icons/contactPage.svg';
import send from '../icons/send.svg';
import contact from '../icons/contact.svg';
import user from '../icons/user.svg';
import signin from '../icons/signin.svg';
const Contact = () => {
	const { isLoading: checkingIfUserIsLoggedIn, status: loggedInStatus } =
		useIsLoggedIn();
	const emailAndDateJoinedInfo = () => {
		return (
			<VStack w='100%' h='100%'>
				<HStack w='100%' p='14px'>
					<Image src={user} />
					<Text as='p' color='brand.mutedTextLight'>
						Vikaramjit Singh
					</Text>
				</HStack>
				<HStack w='100%' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						f1freak96@gmail.com
					</Text>
				</HStack>
			</VStack>
		);
	};

	const messageInput = () => {
		return (
			<VStack w='100%' alignItems='flex-end'>
				<Textarea h='150px' />
				<Button variant='long'>
					<Image src={send} className='iconColor' />
					SEND
				</Button>
			</VStack>
		);
	};

	const userNotLggedIn = () => {
		return (
			<VStack w='100%' h='100%' justifyContent='center'>
				<Button
					variant='long'
					onClick={() => (window.location.href = '/signin')}
				>
					<Image className='iconColor' src={signin} />
					SIGNIN TO SEND MAIL
				</Button>
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
				{loggedInStatus === 'success' &&
					emailAndDateJoinedInfo() &&
					messageInput()}
				{loggedInStatus === 'error' && userNotLggedIn()}
			</VStack>
		);
	};
	return (
		<VStack w='100%' h='100%' my='56px' py='5'>
			{contactPageContent()}
		</VStack>
	);
};

export default Contact;
