import React from 'react';
import {
	VStack,
	Image,
	Text,
	HStack,
	Link,
	Divider,
	Box,
	Heading,
} from '@chakra-ui/react';
import Share from './Share';
import PopoverItem from './PopoverItem';
import bannerImage from '../icons/bannerImage.png';
import box from '../icons/box.svg';
import placeholderCircle from '../images/placeholderCircle.png';

const BlogCard = ({ cardWidth }) => {
	return (
		<VStack
			minW={['100%', cardWidth]}
			maxW={['100%', cardWidth]}
			overflow='hidden'
			my='10'
			position='relative'
			border='1px solid rgba(0, 0, 0, 0.1)'
			borderRadius='15px'
			spacing={2}
			bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
		>
			<Image h='110px' w='100%' src={bannerImage} objectFit='cover' />
			<Box
				bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
				h='150px'
				top='-9px'
				position='absolute'
				left='0'
				right='0'
			></Box>
			<VStack
				p='2'
				w='100%'
				alignItems='flex-start'
				position='relative'
				top='-30px'
			>
				<Heading as='h3' color='brand.mutedText'>
					Title
				</Heading>
				<HStack w='100%'>
					<Image h='2rem' w='2rem' src={placeholderCircle} />
					<Link variant='grayLink'>Vikaramjit Singh</Link>
					<Text as='p' color='brand.mutedTextLight'>
						a month ago
					</Text>
				</HStack>
				<HStack alignItems='flex-end'>
					<Image h='1.2rem' w='1.2rem' src={box} />
					<Text as='p' color='brand.mutedText'>
						technology
					</Text>
				</HStack>
				<Divider color='black' />
				<Box minH='100px' maxH='150px'>
					<Text as='p'>
						This is the body of the content. Can you see this text completely or
						just a part of it? If you can see it completely, then there is a
						problem with the view.
					</Text>
				</Box>
				<Box
					bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
					h='90px'
					bottom='40px'
					position='absolute'
					left='0'
					right='0'
				></Box>
				<HStack
					position='relative'
					w='100%'
					justifyContent='space-between'
					alignItems='center'
				>
					<Link variant='blueLink' w='100%'>
						READ MORE
					</Link>
					<PopoverItem passedInput={<Share showText={true} />} />
				</HStack>
			</VStack>
		</VStack>
	);
};

export default BlogCard;
