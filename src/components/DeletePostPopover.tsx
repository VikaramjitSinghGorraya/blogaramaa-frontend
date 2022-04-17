import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Image,
	Box,
} from '@chakra-ui/react';
import DeletePopover from '../icons/deletePostModal.svg';
const DeletePostPopover = ({ toOpen, toClose, deleteHandler, postId }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box zIndex={1}>
			<Modal isOpen={toOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Are you sure you want to delete this blog ?</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image src={DeletePopover} />
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={() => toClose(false)}>
							CANCEL
						</Button>
						<Button variant='ghost' onClick={() => deleteHandler(postId)}>
							CONFIRM
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default DeletePostPopover;
