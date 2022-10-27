import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

const NotFound = () => {
	return (
		<HStack
			bg='white'
			zIndex='101'
			w='100vw'
			h='100%'
			justifyContent='center'
			alignItems='center'
		>
			<Text>404</Text>
			<Text>|</Text>
			<Text>This page could not be found.</Text>
		</HStack>
	);
};

export default NotFound;
