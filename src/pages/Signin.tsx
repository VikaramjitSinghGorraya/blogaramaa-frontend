import React from 'react';
import { Stack } from '@chakra-ui/react';
import UserAuth from '../components/UserAuth';
const Signin = () => {
	return (
		<Stack h='100%' w='100%' m='auto'>
			<UserAuth signup={false} />
		</Stack>
	);
};

export default Signin;
