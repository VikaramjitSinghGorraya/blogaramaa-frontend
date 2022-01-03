import React from 'react';
import {
	VStack,
	HStack,
	Input,
	Text,
	Link,
	Button,
	Heading,
	Image,
} from '@chakra-ui/react';
import go from '../icons/go.svg';
import { UserInfo } from '../types/UserAuth';

const UserAuth = ({ signup }: UserInfo) => {
	return (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				{signup ? 'Welcome Aboard!' : 'Welcome Back!'}
			</Heading>
			{signup ? (
				<Input type='text' placeholder='Full Name' size='lg' required />
			) : null}
			<Input type='email' placeholder='Email' size='lg' required />
			<Input type='password' placeholder='Password' size='lg' required />
			{signup ? (
				<Input
					type='password'
					placeholder='Confirm Password'
					size='lg'
					required
				/>
			) : null}
			<HStack w='100%' justifyContent='space-between'>
				<VStack alignItems='flex-start'>
					<Text as='small' color='brand.mutedText'>
						{signup ? 'Already joined?' : 'Yet to join?'}
					</Text>
					<Link href={signup ? '/signin' : '/signup'} variant='blueLink'>
						{signup ? 'SIGN IN' : 'SIGN UP'}
					</Link>
				</VStack>
				<Button variant='round'>
					<Image src={go} />
				</Button>
			</HStack>
		</VStack>
	);
};

export default UserAuth;
