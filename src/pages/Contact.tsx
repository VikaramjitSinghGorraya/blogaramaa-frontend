import React from 'react';
import {
	HStack,
	VStack,
	Text,
	Button,
	Image,
	Textarea,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import contactPage from '../icons/contactPage.svg';
import send from '../icons/send.svg';
import contact from '../icons/contact.svg';
import user from '../icons/user.svg';
const Contact = () => {
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
	const contactPageContent = () => {
		return (
			<VStack w='100%' h='100%'>
				<Banner heading='Contact Blogaramaa' icon={contactPage} />
				{emailAndDateJoinedInfo()}
				{messageInput()}
			</VStack>
		);
	};
	return (
		<VStack w='100%' my='56px' py='5'>
			{contactPageContent()}
		</VStack>
	);
};

export default Contact;
