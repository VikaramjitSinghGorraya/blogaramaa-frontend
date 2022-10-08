import React, { useState } from 'react';
import {
	VStack,
	HStack,
	Link,
	Text,
	Button,
	Image,
	Heading,
	Checkbox,
	Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { useSignin, useIsLoggedIn } from '../queries/Queries';
import go from '../icons/go.svg';
import InputField from '../components/InputField';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';
import { checkforUserIdInLocalStorage } from '../helpers/Functions';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const Signin = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		inputCleared: false,
	});

	const [agreedToTerms, setAgreedToTerms] = useState(false);

	const signinProcess = useSignin();
	const { status: loggedInStatus } = useIsLoggedIn();

	const inputChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const termsAndConditionHandler = (e) => {
		if (!agreedToTerms) {
			setAgreedToTerms(true);
			return;
		}
		setAgreedToTerms(false);
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

	return checkforUserIdInLocalStorage() ? (
		<Navigate to='/' />
	) : (
		<MotionVStack
			{...pageDisplayAnimation}
			my='auto'
			w='100%'
			justifyContent='center'
		>
			<VStack w={['100%', '', '', '', '50%']} h='fit-content'>
				<Heading as='h2' color='brand.primaryBlue'>
					Welcome Back!
				</Heading>
				<form style={{ width: '100%' }} onSubmit={submitHandler}>
					<VStack w='100%' h='100%' justifyContent='space-around'>
						<Tooltip
							label='Please read and agree with terms / conditions.'
							shouldWrapChildren
							hasArrow
							isDisabled={agreedToTerms}
							bg='red.500'
							p='2'
							borderRadius={5}
						>
							<InputField
								name='email'
								type='email'
								placeholder='Email'
								value={userData.email}
								onChange={inputChangeHandler}
								disabled={agreedToTerms ? false : true}
							/>
						</Tooltip>
						<Tooltip
							label='Please read and agree with terms / conditions.'
							shouldWrapChildren
							hasArrow
							isDisabled={agreedToTerms}
							bg='red.500'
							arrowPadding={20}
							p='2'
							borderRadius={5}
						>
							<InputField
								name='password'
								type='password'
								placeholder='Password'
								value={userData.password}
								onChange={inputChangeHandler}
								disabled={agreedToTerms ? false : true}
							/>
						</Tooltip>
						<HStack
							w='100%'
							px='5'
							justifyContent='center'
							spacing={2}
							alignItems='baseline'
						>
							<Checkbox onChange={termsAndConditionHandler} />
							<Text as='p' textAlign='center'>
								I have read & agree with the{' '}
								<Link
									href='/post/terms-and-conditions'
									isExternal
									color='brand.primaryBlue'
								>
									TERMS & CONDITIONS
								</Link>
							</Text>
						</HStack>
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
						<MotionButton
							{...buttonAnimation}
							variant='round'
							type='submit'
							isLoading={signinProcess.isLoading ? true : false}
							isDisabled={!agreedToTerms}
						>
							<Image src={go} />
						</MotionButton>
					</HStack>
				</form>
				{signinProcess.isSuccess && window.location.reload()}
				{signinProcess.isError &&
					!signinProcess.isLoading &&
					displayErrorMessage()}
			</VStack>
		</MotionVStack>
	);
};

export default Signin;
