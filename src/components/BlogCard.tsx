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
import parser from 'html-react-parser';
import Moment from 'moment';
import Share from './Share';
import PopoverItem from './PopoverItem';
import { useGetPostPhoto } from '../queries/Queries';
import { PostInfo } from '../types/Post';
import bannerImage from '../icons/bannerImage.png';
import box from '../icons/box.svg';
import placeholderCircle from '../images/placeholderCircle.png';

const BlogCard = ({
	cardWidth,
	title,
	author,
	authorId,
	posted,
	category,
	body,
	postId,
	slug,
}: PostInfo) => {
	const getPhotoProcess = useGetPostPhoto(postId);
	return (
		<VStack
			minW={['100%', cardWidth]}
			maxW={['100%', cardWidth]}
			overflow='hidden'
			my='5'
			mx='auto'
			position='relative'
			border='1px solid rgba(0, 0, 0, 0.1)'
			borderRadius='15px'
			spacing={2}
			bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
		>
			<Image
				h='110px'
				w='100%'
				src={getPhotoProcess.data ? getPhotoProcess.data : bannerImage}
				objectFit='cover'
			/>
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
					{title}
				</Heading>
				<HStack w='100%' flexWrap='wrap'>
					<Image h='2rem' w='2rem' src={placeholderCircle} />
					<Link href={`/profile/${authorId}`} variant='grayLink'>
						{author}
					</Link>
					<Text as='p' color='brand.mutedTextLight'>
						{Moment(posted).from(Date.now())}
					</Text>
				</HStack>
				<HStack alignItems='flex-end'>
					<Image h='1.2rem' w='1.2rem' src={box} />
					<Text as='p' color='brand.mutedText'>
						{category}
					</Text>
				</HStack>
				<Divider color='black' />
				<Box minH='100px' maxH='150px'>
					<Text as='p'>{parser(body.substring(0, 120))}</Text>
				</Box>
				<Box
					bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
					h={['120px', '120px', '120px', '120px']}
					bottom='30px'
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
					<Link href={`/post/${slug}`} variant='blueLink' w='100%'>
						READ MORE
					</Link>
					<PopoverItem passedInput={<Share showText={true} />} />
				</HStack>
			</VStack>
		</VStack>
	);
};

export default BlogCard;
