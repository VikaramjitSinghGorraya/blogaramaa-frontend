import React from 'react';
import { Drawer, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import Loader from './Loader';
const Overlay = () => {
	const { onOpen, onClose } = useDisclosure();
	return (
		<>
			<Drawer isOpen={true} placement='right' onClose={onClose}>
				<DrawerOverlay>
					<Loader />
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

export default Overlay;
