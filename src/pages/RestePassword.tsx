import React from 'react';
import { HStack, VStack, Button, Image } from '@chakra-ui/react';
import Banner from '../components/Banner';
import InputField from '../components/InputField';
import resetPassword from '../icons/resetPassword.svg';
import go from '../icons/go.svg';
const ForgotPassword = () => {
	return (
		<VStack
			w='100%'
			h='100%'
			justifyContent={['flex-start', 'center']}
			my={['56px', '']}
		>
			<Banner heading='Reset Password' icon={resetPassword} />
			<VStack w={['100%', '50%']} spacing={25} m='auto'>
				<InputField
					type='password'
					name='newPassword'
					placeholder='New Password'
				/>
				<InputField
					type='password'
					name='confirmPassword'
					placeholder='Confrim Password'
				/>
				<HStack w='100%' justifyContent='flex-end'>
					<Button variant='round'>
						<Image src={go} />
					</Button>
				</HStack>
			</VStack>
		</VStack>
	);
};

export default ForgotPassword;
