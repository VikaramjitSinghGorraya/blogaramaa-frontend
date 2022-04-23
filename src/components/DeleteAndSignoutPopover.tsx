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
import PopoverImage from '../icons/deletePostModal.svg';
const DeleteAndSignoutPopover = ({
	toOpen,
	toClose,
	deleteHandler,
	postId,
	header,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box zIndex={1}>
			<Modal isOpen={toOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image src={PopoverImage} />
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

export default DeleteAndSignoutPopover;
