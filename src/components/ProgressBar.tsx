import React from 'react';
import { Progress, Box } from '@chakra-ui/react';
const ProgressBar = () => {
	return (
		<Box w='100%'>
			<Progress size='xs' isIndeterminate position='relative' bottom='-10' />
		</Box>
	);
};

export default ProgressBar;
