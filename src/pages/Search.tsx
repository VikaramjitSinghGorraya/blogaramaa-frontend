import React, { useState } from 'react';
import {
	Input,
	Button,
	HStack,
	VStack,
	Image,
	Text,
	Grid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { useGetPostBySearchTerm } from '../queries/Queries';
import Banner from '../components/Banner';
import search from '../icons/search.svg';
import searchPage from '../icons/searchPage.svg';
import nothingFound from '../icons/nothingFound.svg';
import {
	buttonAnimation,
	pageDisplayAnimation,
} from '../components/Animations';

const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const Search = () => {
	const [searchWord, setSearchWord] = useState('');
	const getPotBySearchTermProcess = useGetPostBySearchTerm(searchWord);
	const inputChangeHandler = (e) => {
		setSearchWord(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (searchWord === '') {
			return;
		}
		getPotBySearchTermProcess.mutate(searchWord);
	};

	const nothingToDisplay = () => {
		return (
			<MotionVStack
				{...pageDisplayAnimation}
				h='40'
				w='100%'
				justifyContent='center'
			>
				<Image src={nothingFound} h='100%' />
				<Text
					as='p'
					color='brand.mutedTextLight'
					wordBreak='break-word'
					w='30%'
					textAlign='center'
				>
					Uh oh! Seems like there are no matching results
				</Text>
			</MotionVStack>
		);
	};
	return (
		<MotionVStack {...pageDisplayAnimation} w='100%' h='100%' my='57px'>
			<Banner heading='Search' icon={searchPage} />
			<form style={{ width: '100%' }} onSubmit={submitHandler}>
				<HStack w='100%'>
					<Input
						type='text'
						borderRadius='50'
						bg='rgb(243, 244, 244)'
						placeholder='Search here...'
						maxW={['75%', '100%']}
						onChange={inputChangeHandler}
					/>
					<MotionButton
						{...buttonAnimation}
						variant='round'
						type='submit'
						isLoading={getPotBySearchTermProcess.isLoading ? true : false}
					>
						<Image className='whiteIconColor' src={search} />
					</MotionButton>
				</HStack>
			</form>
			<Grid
				templateColumns={[
					'repeat(auto-fit, minmax(auto, 1fr))',
					'repeat(auto-fit, minmax(600px, auto))',
					'repeat(2, minmax(600px, 1fr))',
				]}
			>
				{getPotBySearchTermProcess?.isSuccess &&
					getPotBySearchTermProcess?.data.length > 0 &&
					getPotBySearchTermProcess?.data.map((post, index) => (
						<BlogCard
							key={index}
							cardWidth='90%'
							title={post.title}
							author={post.postedBy.name}
							authorId={post.postedBy._id}
							category={post.postCategory?.title}
							body={post.body}
							postId={post._id}
							posted={post.createdAt}
							slug={post.slug}
						/>
					))}
			</Grid>
			{getPotBySearchTermProcess.isSuccess &&
				getPotBySearchTermProcess?.data.length === 0 &&
				nothingToDisplay()}
		</MotionVStack>
	);
};

export default Search;
