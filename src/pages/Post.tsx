import React from 'react';
import {
	VStack,
	Image,
	Text,
	HStack,
	useMediaQuery,
	Link,
	Box,
	Stack,
	Heading,
	Button,
	Spinner,
	Center,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import Moment from 'moment';
import Loader from '../components/Loader';
import PopoverItem from '../components/PopoverItem';
import Share from '../components/Share';
import { useGetPostBySlug } from '../queries/Queries';
import bannerImage from '../icons/bannerImage.png';
import box from '../icons/box.svg';
import placeholderCircle from '../images/placeholderCircle.png';
import edit from '../icons/edit.svg';
import remove from '../icons/remove.svg';
import calendar from '../icons/calendar.svg';
const Post = () => {
	let { slug } = useParams();
	const [isLargerThan768] = useMediaQuery('(min-width: 769px)');
	const { isLoading, isError, isSuccess, data } = useGetPostBySlug(slug);
	const authorInfoAndOptions = () => {
		return (
			<Stack
				direction={['column', 'column', 'column', 'row']}
				spacing={0}
				w='100%'
				justifyContent='flex-end'
			>
				<Share showText={true} />
				<Button variant='base' color='brand.mutedText'>
					<Image src={edit} className='mutedIconColor' />
					Edit
				</Button>
				<Button variant='base' color='brand.mutedText'>
					<Image src={remove} className='mutedIconColor' />
					Delete
				</Button>
			</Stack>
		);
	};
	const postInfo = () => {
		return (
			<VStack
				w='100%'
				overflow='hidden'
				my='10'
				position='relative'
				spacing={2}
			>
				<Image h='200px' w='100%' src={bannerImage} objectFit='cover' />
				<Box
					bg='linear-gradient(0deg, #fafafa 0%, rgba(250, 250, 250, 0.96) 25%, rgba(250, 250, 250, 0.92) 37%, rgba(250, 250, 250, 0.86) 54%, rgba(250, 250, 250, 0.53) 100%);'
					h='150px'
					top='50px'
					position='absolute'
					left='0'
					right='0'
				></Box>
				<HStack w='100%'>
					<VStack
						p='2'
						w='100%'
						alignItems='flex-start'
						position='relative'
						top='-30px'
					>
						<Heading as='h2' color='brand.mutedText'>
							{data?.data.title}
						</Heading>
						<HStack w='100%'>
							<Image h='2rem' w='2rem' src={placeholderCircle} />
							<Link variant='grayLink'>{data?.data.postedBy.name}</Link>
						</HStack>
						<Stack
							direction={['column', 'column', 'column', 'row']}
							justifyContent='flex-start'
							w={['100%', '50%']}
						>
							<HStack w='100%'>
								<Image h='1.2rem' w='1.2rem' src={box} />
								<Text as='p' color='brand.mutedText'>
									{data?.data.postCategory.title}
								</Text>
							</HStack>
							<HStack w='100%'>
								<Image h='1.2rem' w='1.2rem' src={calendar} />
								<Text as='p' color='brand.mutedText'>
									{Moment(data?.data.createdAt).from(Date.now())}
								</Text>
							</HStack>
						</Stack>
					</VStack>
					{isLargerThan768 ? (
						authorInfoAndOptions()
					) : (
						<PopoverItem
							passedInput={authorInfoAndOptions()}
							left='-5.3rem'
							top='-7rem'
							width='7rem'
						/>
					)}
				</HStack>
			</VStack>
		);
	};

	const postBody = () => {
		return (
			<HStack w='100%'>
				<Text as='p'>{parser(data?.data.body)}</Text>
			</HStack>
		);
	};

	const postContent = () => {
		return (
			<VStack alignItems='flex-end' w='100%' h='100%' spacing={0}>
				{postInfo()}
				{postBody()}
			</VStack>
		);
	};
	return isLoading ? (
		<Center minH='100%' w='100%'>
			<Loader />
		</Center>
	) : (
		<VStack w='100%'>{postContent()}</VStack>
	);
};

export default Post;
