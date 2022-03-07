import React, { useState } from 'react';
import {
	VStack,
	HStack,
	Link,
	Text,
	Button,
	Image,
	Heading,
} from '@chakra-ui/react';
import InputField from '../components/InputField';
import { usePreSignup } from '../queries/Queries';
import { UserInfo } from '../types/User';
import go from '../icons/go.svg';

const Signup = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const preSignupProcess = usePreSignup();

	const inputChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({ ...userData });
		preSignupProcess.mutate(userData);
	};

	return (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Aboard!
			</Heading>
			<InputField
				name='name'
				type='text'
				placeholder='Full name'
				onChange={inputChangeHandler}
			/>
			<InputField
				name='email'
				type='email'
				placeholder='Email'
				onChange={inputChangeHandler}
			/>
			<InputField
				name='password'
				type='password'
				placeholder='Password'
				onChange={inputChangeHandler}
			/>
			<InputField
				name='confirmPassword'
				type='password'
				placeholder='Confirm Password'
				onChange={inputChangeHandler}
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
				<Button variant='round' onClick={submitHandler}>
					<Image src={go} />
				</Button>
			</HStack>
		</VStack>
	);
};

export default Signup;
