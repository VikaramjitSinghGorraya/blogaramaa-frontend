import React, { useState } from 'react';
import { HStack, VStack, Text, Link, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForgotPassword } from '../queries/Queries';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';
import Banner from '../components/Banner';
import InputField from '../components/InputField';
import MessageBox from '../components/MessageBox';
import forgotPassword from '../icons/forgotPassword.svg';
import go from '../icons/go.svg';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);
const ForgotPassword = () => {
	const [forgotPasswordData, setForgotPasswordData] = useState({
		email: '',
		inputCleared: false,
	});
	const forgotPasswordProcess = useForgotPassword();

	const inputChangeHandler = (e) => {
		setForgotPasswordData({
			...forgotPasswordData,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setForgotPasswordData({ ...forgotPasswordData, inputCleared: false });
		forgotPasswordProcess.mutate(forgotPasswordData.email);
	};

	const displaySuccessMessage = () => {
		if (!forgotPasswordData.inputCleared) {
			setForgotPasswordData({
				...forgotPasswordData,
				email: '',
				inputCleared: true,
			});
		}
		return (
			<MessageBox
				toastId='success-id'
				title='You did it!!!'
				description={forgotPasswordProcess.data}
				successStatus={true}
			/>
		);
	};

	const displayErrorMessage = () => {
		return (
			<MessageBox
				toastId='error-id'
				title='The following error occured.'
				description={forgotPasswordProcess.error}
				successStatus={false}
			/>
		);
	};

	const forgotPasswordPageContent = () => {
		return (
			<VStack w='100%' h='100%'>
				<Banner heading='Forgot Password?' icon={forgotPassword} />
				<form style={{ width: '100%' }} onSubmit={submitHandler}>
					<VStack w={['100%', '50%']} spacing={25} m='auto'>
						<InputField
							type='email'
							name='email'
							value={forgotPasswordData.email}
							onChange={inputChangeHandler}
							placeholder='Email'
						/>
						<HStack w='100%' justifyContent='space-between'>
							<VStack alignItems='flex-start'>
								<Text as='small' color='brand.mutedText'>
									OR
								</Text>
								<Link href='/signin' variant='blueLink'>
									SIGN IN
								</Link>
							</VStack>
							<MotionButton
								{...buttonAnimation}
								variant='round'
								type='submit'
								isLoading={forgotPasswordProcess.isLoading ? true : false}
							>
								<Image src={go} />
							</MotionButton>
						</HStack>
					</VStack>
				</form>
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
			{forgotPasswordPageContent()}
			{forgotPasswordProcess.isError && displayErrorMessage()}
			{forgotPasswordProcess.isSuccess && displaySuccessMessage()}
		</MotionVStack>
	);
};

export default ForgotPassword;
