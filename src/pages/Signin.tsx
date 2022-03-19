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
import { useParams, useNavigate } from 'react-router-dom';
import { useSignin } from '../queries/Queries';
import go from '../icons/go.svg';
import InputField from '../components/InputField';

const Signin = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		inputCleared: false,
	});

	const signinProcess = useSignin();
	const navigate = useNavigate();

	const inputChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({ ...userData, inputCleared: false });
		signinProcess.mutate(userData);
	};

	const redirectToHome = () => {
		navigate('/');
	};
	return (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Back!
			</Heading>
			<InputField
				name='email'
				type='email'
				placeholder='Email'
				value={userData.email}
				onChange={inputChangeHandler}
			/>
			<InputField
				name='password'
				type='password'
				placeholder='Password'
				value={userData.password}
				onChange={inputChangeHandler}
			/>
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
				<Button
					variant='round'
					onClick={submitHandler}
					isLoading={signinProcess.isLoading ? true : false}
				>
					<Image src={go} />
				</Button>
			</HStack>
			{/* {signinProcess.isSuccess && redirectToHome()} */}
		</VStack>
	);
};

export default Signin;
