import React from 'react';
import { HStack, VStack, Text, Link, Button, Image } from '@chakra-ui/react';
import Banner from '../components/Banner';
import InputField from '../components/InputField';
import forgotPassword from '../icons/forgotPassword.svg';
import go from '../icons/go.svg';
const ForgotPassword = () => {
	return (
		<VStack
			w='100%'
			h='100%'
			justifyContent={['flex-start', 'center']}
			my={['56px', '']}
		>
			<Banner heading='Forgot Password?' icon={forgotPassword} />
			<VStack w={['100%', '50%']} spacing={25} m='auto'>
				<InputField type='email' name='email' placeholder='Email' />
				<HStack w='100%' justifyContent='space-between'>
					<VStack alignItems='flex-start'>
						<Text as='small' color='brand.mutedText'>
							OR
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
		</VStack>
	);
};

export default ForgotPassword;
