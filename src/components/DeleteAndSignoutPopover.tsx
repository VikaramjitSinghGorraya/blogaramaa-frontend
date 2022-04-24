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
import { motion } from 'framer-motion';
import PopoverImage from '../icons/deletePostModal.svg';
import { buttonAnimation } from './Animations';

const MotionButton = motion(Button);

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
						<MotionButton
							{...buttonAnimation}
							colorScheme='blue'
							mr={3}
							onClick={() => toClose(false)}
						>
							CANCEL
						</MotionButton>
						<MotionButton
							{...buttonAnimation}
							variant='ghost'
							onClick={() => deleteHandler(postId)}
						>
							CONFIRM
						</MotionButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default DeleteAndSignoutPopover;
