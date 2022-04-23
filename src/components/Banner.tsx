import React from 'react';
import { HStack, Heading, Image } from '@chakra-ui/react';
import { BannerInfo } from '../types/Banner';

const Banner = ({ heading, icon }: BannerInfo) => {
	return (
		<HStack w='100%' justifyContent='space-between' px={['0', '5']} wrap='wrap'>
			<HStack w='70%'>
				<Heading as='h1' color='brand.mutedTextLight' wordBreak='break-all'>
					{heading}
				</Heading>
			</HStack>
			<Image src={icon} h={['5rem', '12rem']} w={['5rem', '12rem']} />
		</HStack>
	);
};

export default Banner;
