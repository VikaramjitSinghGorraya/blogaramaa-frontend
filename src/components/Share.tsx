import React from 'react';
import { Button, Image, Text } from '@chakra-ui/react';
import { RWebShare } from 'react-web-share';
import { ShareInof } from '../types/Share';
import share from '../icons/share.svg';
const Share = ({ showText = false }: ShareInof) => {
	return (
		<RWebShare
			data={{
				text: 'text',
				url: 'url',
				title: 'title',
			}}
		>
			<Button variant='base' w='6rem'>
				<Image className='mutedIconColor' src={share} />
				{showText ? (
					<Text as='p' color='brand.mutedText'>
						Share
					</Text>
				) : (
					''
				)}
			</Button>
		</RWebShare>
	);
};

export default Share;
