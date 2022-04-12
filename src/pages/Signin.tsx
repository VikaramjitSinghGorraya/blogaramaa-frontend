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
import { Navigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { useSignin, useIsLoggedIn } from '../queries/Queries';
import go from '../icons/go.svg';
import InputField from '../components/InputField';

const Signin = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		inputCleared: false,
	});
	const signinProcess = useSignin();
	const { status: loggedInStatus } = useIsLoggedIn();

	const inputChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({ ...userData, inputCleared: false });
		signinProcess.mutate(userData);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={signinProcess.error}
				successStatus={false}
			/>
		);
	};

	return loggedInStatus === 'success' ? (
		<Navigate to='/' />
	) : (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Back!
			</Heading>
			<form style={{ width: '100%' }} onSubmit={submitHandler}>
				<VStack w='100%' h='100%' justifyContent='space-around'>
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
					<Link
						href='/forgotPassword'
						variant='blueLink'
						alignSelf='flex-start'
					>
						FORGOT PASSWORD
					</Link>
				</VStack>
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
						type='submit'
						isLoading={signinProcess.isLoading ? true : false}
					>
						<Image src={go} />
					</Button>
				</HStack>
			</form>
			{signinProcess.isSuccess && <Navigate to='/' />}
			{signinProcess.isError &&
				!signinProcess.isLoading &&
				displayErrorMessage()}
		</VStack>
	);
};

export default Signin;
