import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { MessageInfo } from '../types/Message';
const MessageBox = ({
	toastId,
	title,
	description,
	successStatus,
}: MessageInfo) => {
	const toast = useToast();
	const id = toastId;

	useEffect(() => {
		console.log(successStatus);
		if (!toast.isActive(id)) {
			toast({
				id,
				title: title,
				description: successStatus
					? description.data.message
					: description.response.data.error,
				status: successStatus ? 'success' : 'error',
				duration: 6000,
				isClosable: true,
			});
		}
	}, [toastId]);
	return <></>;
};

export default MessageBox;
