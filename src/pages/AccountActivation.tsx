import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import AccountActivationCard from '../components/AccountActivationCard';
import AccountActivationIcon from '../icons/accountActivation.svg';
import { useSignup } from '../queries/Queries';
import CheckIcon from '../icons/check.svg';
import AlertIcon from '../icons/alert.svg';
import Thumbsup from '../icons/thumbs-up.svg';

const AccountActivation = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const signupProcess = useSignup();
	const handleSignup = () => {
		if (signupProcess.isSuccess) {
			navigate('/signin');
		}
		if (signupProcess.isError) {
			navigate('/signup');
		}
		const tokenInfo = {
			token: token || '',
		};
		signupProcess.mutate(tokenInfo);
	};

	const SuccessMessage = () => {
		return (
			<AccountActivationCard
				heading=''
				body='You have done it. Please go ahead and signin.'
				imageSrc={Thumbsup}
				buttonText='SIGNIN'
				error={true}
				onClick={handleSignup}
			/>
		);
	};

	const WelcomeMessage = () => {
		return (
			<AccountActivationCard
				heading='Hi!!!'
				body='You are almost there. Please, click below to activate your account.'
				imageSrc={CheckIcon}
				buttonText='ACTIVATE ACCOUNT'
				isLoading={signupProcess.isLoading}
				onClick={handleSignup}
			/>
		);
	};

	const ErrorMessage = () => {
		return (
			<AccountActivationCard
				heading=''
				body='Activation link expired. Please signup again.'
				imageSrc={AlertIcon}
				buttonText='OKAY'
				error={true}
				onClick={handleSignup}
			/>
		);
	};
	return (
		<VStack w='100%' my='56px' py='5'>
			<Banner heading='Account Activation' icon={AccountActivationIcon} />
			{!signupProcess.isError && !signupProcess.isSuccess && WelcomeMessage()}
			{!signupProcess.isSuccess && signupProcess.isError && ErrorMessage()}
			{!signupProcess.isError && signupProcess.isSuccess && SuccessMessage()}
		</VStack>
	);
};

export default AccountActivation;
