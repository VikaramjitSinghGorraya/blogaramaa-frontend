import React from 'react';
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
import InputField from '../components/InputField';
import contact from '../icons/contact.svg';
import addImage from '../icons/addImage.svg';
import editProfile from '../icons/editProfile.svg';
import send from '../icons/send.svg';
import key from '../icons/key.svg';
import placeholderCircle from '../images/placeholderCircle.png';
import Banner from '../components/Banner';
const EditProfile = () => {
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
				<Link variant='blueLink'>RESET PASSWORD</Link>
			</HStack>
		);
	};

	const emailAndDateJoinedInfo = () => {
		return (
			<VStack w='100%' h='100%'>
				<HStack w='100%' border='1px solid lightGray' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						f1freak96@gmail.com
					</Text>
				</HStack>
				<HStack w='100%' border='1px solid lightGray' p='14px'>
					<Image src={contact} />
					<Text as='p' color='brand.mutedTextLight'>
						joined a year ago
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
					bgImage={placeholderCircle}
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
							<Image className='whiteIconColor' src={addImage} />
							<Input type='file' accept='image/*' hidden />
						</FormLabel>
					</Box>
				</HStack>
				<VStack w={['100%', '70%']}>
					<InputField type='text' name='fullName' placeholder='FullName' />
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
				<Textarea h='150px' />
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
				<Button variant='long'>
					<Image className='iconColor' src={send} />
					UPDATE
				</Button>
			</VStack>
		);
	};
	return (
		<VStack w='100%' my='56px' py='5'>
			{editProfilePageContent()}
		</VStack>
	);
};

export default EditProfile;
