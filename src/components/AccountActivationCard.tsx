import React from 'react';
import { VStack, Text, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AccountActivationInfo } from '../types/AccountActivation';
import { pageDisplayAnimation } from './Animations';

const MotionVStack = motion(VStack);
const AccountActivationCard = ({
	heading,
	body,
	imageSrc,
	buttonText,
	error = false,
	isLoading = false,
	onClick,
}: AccountActivationInfo) => {
	return (
		<MotionVStack {...pageDisplayAnimation} w='100%' my='56px' py='5'>
			<VStack
				textAlign='center'
				flexWrap='wrap'
				justifyContent='space-between'
				h='100%'
				w={['100%', '50%']}
				p='10'
				border='1px solid rgba(0, 0, 0, 0.1)'
				boxShadow='lg'
				borderRadius='15px'
				color='brand.mutedTextLight'
			>
				{error ? <Image src={imageSrc} /> : <Text>{heading}</Text>}
				<Text>
					{body?.response
						? body.response.data.error
						: body.message
						? body?.message
						: body}
				</Text>
				<Button variant='long' isLoading={isLoading} onClick={onClick}>
					{error ? '' : <Image className='iconColor' src={imageSrc} />}
					{buttonText}
				</Button>
			</VStack>
		</MotionVStack>
	);
};

export default AccountActivationCard;
