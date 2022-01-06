import React from 'react';
import {
	VStack,
	HStack,
	Link,
	Text,
	Button,
	Image,
	Heading,
} from '@chakra-ui/react';
import go from '../icons/go.svg';
import InputField from '../components/InputField';

const Signin = () => {
	return (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Back!
			</Heading>
			<InputField name='email' type='email' placeholder='Email' />
			<InputField name='password' type='password' placeholder='Password' />
			<Link href='/forgotPassword' variant='blueLink' alignSelf='flex-start'>
				FORGOT PASSWORD
			</Link>
			<HStack w='100%' justifyContent='space-between'>
				<VStack alignItems='flex-start'>
					<Text as='small' color='brand.mutedText'>
						Yet to join?
					</Text>
					<Link href='/signup' variant='blueLink'>
						SIGN UP
					</Link>
				</VStack>
				<Button variant='round'>
					<Image src={go} />
				</Button>
			</HStack>
		</VStack>
	);
};

export default Signin;
