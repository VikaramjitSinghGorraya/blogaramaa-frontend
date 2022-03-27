import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';
const Loader = () => {
	return (
		<Center minH='100%' w='100%'>
			<Spinner thickness='4px' color='brand.primaryBlue' size='xl' />
		</Center>
	);
};

export default Loader;
