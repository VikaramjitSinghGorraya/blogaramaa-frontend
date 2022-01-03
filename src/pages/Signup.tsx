import React from 'react';
import { Stack } from '@chakra-ui/react';
import UserAuth from '../components/UserAuth';

const Signup = () => {
	return (
		<Stack h='100%' w='100%' m='auto'>
			<UserAuth signup={true} />
		</Stack>
	);
};

export default Signup;
