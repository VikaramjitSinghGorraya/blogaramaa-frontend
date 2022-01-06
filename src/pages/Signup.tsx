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

const Signup = () => {
	return (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Aboard!
			</Heading>
			<InputField name='name' type='text' placeholder='Full name' />
			<InputField name='email' type='email' placeholder='Email' />
			<InputField name='password' type='password' placeholder='Password' />
			<InputField
				name='confirmPassword'
				type='password'
				placeholder='Confirm Password'
			/>
			<HStack w='100%' justifyContent='space-between'>
				<VStack alignItems='flex-start'>
					<Text as='small' color='brand.mutedText'>
						Already joined?
					</Text>
					<Link href='/signin' variant='blueLink'>
						SIGN IN
					</Link>
				</VStack>
				<Button variant='round'>
					<Image src={go} />
				</Button>
			</HStack>
		</VStack>
	);
};

export default Signup;
