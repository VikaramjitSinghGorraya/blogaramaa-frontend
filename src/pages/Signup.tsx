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
import InputField from '../components/InputField';
import { usePreSignup, useIsLoggedIn } from '../queries/Queries';
import MessageBox from '../components/MessageBox';
import go from '../icons/go.svg';

const Signup = () => {
	const { status: loggedInStatus } = useIsLoggedIn();

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		inputCleared: false,
	});

	const preSignupProcess = usePreSignup();
	const inputChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({ ...userData, inputCleared: false });
		preSignupProcess.mutate(userData);
	};

	const displaySuccessMessage = () => {
		if (!userData.inputCleared) {
			setUserData({
				...userData,
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
				inputCleared: true,
			});
		}
		return (
			<MessageBox
				toastId='success-id'
				title='You did it!!!'
				description={preSignupProcess.data}
				successStatus={true}
			/>
		);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={preSignupProcess.error}
				successStatus={false}
			/>
		);
	};

	return loggedInStatus === 'success' ? (
		<Navigate to='/' />
	) : (
		<VStack w={['100%', '50%']} spacing={25} m='auto'>
			<Heading as='h2' color='brand.primaryBlue'>
				Welcome Aboard!
			</Heading>
			<form style={{ width: '100%' }} onSubmit={submitHandler}>
				<VStack w='100%' h='100%' justifyContent='space-around'>
					<InputField
						name='name'
						type='text'
						placeholder='Full name'
						value={userData.name}
						onChange={inputChangeHandler}
					/>
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
					<InputField
						name='confirmPassword'
						type='password'
						placeholder='Confirm Password'
						value={userData.confirmPassword}
						onChange={inputChangeHandler}
					/>
				</VStack>
				<HStack w='100%' justifyContent='space-between'>
					<VStack alignItems='flex-start'>
						<Text as='small' color='brand.mutedText'>
							Already joined?
						</Text>
						<Link href='/signin' variant='blueLink'>
							SIGN IN
						</Link>
					</VStack>
					<Button
						variant='round'
						type='submit'
						isLoading={preSignupProcess.isLoading ? true : false}
					>
						<Image src={go} />
					</Button>
				</HStack>
			</form>

			{preSignupProcess.isSuccess &&
				!preSignupProcess.isLoading &&
				displaySuccessMessage()}
			{preSignupProcess.isError &&
				!preSignupProcess.isLoading &&
				displayErrorMessage()}
		</VStack>
	);
};

export default Signup;
