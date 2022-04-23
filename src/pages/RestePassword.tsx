import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { HStack, VStack, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Banner from '../components/Banner';
import { useResetPassword, useIsLoggedIn } from '../queries/Queries';
import AccountActivationCard from '../components/AccountActivationCard';
import InputField from '../components/InputField';
import resetPassword from '../icons/resetPassword.svg';
import go from '../icons/go.svg';
import AlertIcon from '../icons/alert.svg';
import Thumbsup from '../icons/thumbs-up.svg';
import { pageDisplayAnimation } from '../components/Animations';

const MotionVStack = motion(VStack);
const ForgotPassword = () => {
	const { token } = useParams();
	const resetPasswordProcess = useResetPassword();
	const { status: loggedInStatus, isLoading: checkingIfUserIsLoggedIn } =
		useIsLoggedIn();
	const [resetPasswordData, setPasswordData] = useState({
		newPassword: '',
		confirmPassword: '',
		token: token,
	});

	const inputChangeHandler = (e) => {
		setPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
	};

	const handlePasswordReset = () => {
		if (resetPasswordProcess.isSuccess) {
			if (loggedInStatus === 'success') {
				window.location.href = '/profile';
			}
			window.location.href = '/signin';
		}

		if (resetPasswordProcess.isError) {
			if (loggedInStatus === 'success') {
				window.location.href = '/editProfile';
			}
			window.location.href = '/signup';
		}

		resetPasswordProcess.mutate(resetPasswordData);
	};

	const SuccessMessage = () => {
		return (
			<AccountActivationCard
				heading=''
				body={resetPasswordProcess.data}
				imageSrc={Thumbsup}
				buttonText='PROFILE'
				error={true}
				onClick={handlePasswordReset}
			/>
		);
	};

	const ErrorMessage = () => {
		return (
			<AccountActivationCard
				heading=''
				body={resetPasswordProcess.error}
				imageSrc={AlertIcon}
				buttonText='OKAY'
				error={true}
				onClick={handlePasswordReset}
			/>
		);
	};

	const welcomeScreen = () => {
		return (
			<VStack w={['100%', '50%']} spacing={25} m='auto'>
				<InputField
					type='password'
					name='newPassword'
					onChange={inputChangeHandler}
					placeholder='New Password'
				/>
				<InputField
					type='password'
					name='confirmPassword'
					onChange={inputChangeHandler}
					placeholder='Confrim Password'
				/>
				<HStack w='100%' justifyContent='flex-end'>
					<Button
						variant='round'
						isLoading={resetPasswordProcess.isLoading ? true : false}
						onClick={handlePasswordReset}
					>
						<Image src={go} />
					</Button>
				</HStack>
			</VStack>
		);
	};
	return (
		<MotionVStack
			{...pageDisplayAnimation}
			w='100%'
			h='100%'
			justifyContent={['flex-start', 'center']}
			my={['56px', '']}
		>
			<Banner heading='Reset Password' icon={resetPassword} />
			{!resetPasswordProcess.isError &&
				!resetPasswordProcess.isSuccess &&
				welcomeScreen()}
			{resetPasswordProcess.error && ErrorMessage()}
			{resetPasswordProcess.isSuccess && SuccessMessage()}
		</MotionVStack>
	);
};

export default ForgotPassword;
