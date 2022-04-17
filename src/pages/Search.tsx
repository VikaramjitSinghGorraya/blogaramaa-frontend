import React, { useState, useEffect } from 'react';
import {
	Input,
	Button,
	HStack,
	VStack,
	Image,
	Box,
	Text,
} from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import { useGetPostBySearchTerm } from '../queries/Queries';
import Banner from '../components/Banner';
import search from '../icons/search.svg';
import searchPage from '../icons/searchPage.svg';
import nothingFound from '../icons/nothingFound.svg';
const Search = () => {
	const [searchWord, setSearchWord] = useState('');
	const getPotBySearchTermProcess = useGetPostBySearchTerm(searchWord);
	const inputChangeHandler = (e) => {
		setSearchWord(e.target.value);
	};
	useEffect(() => {
		console.log(getPotBySearchTermProcess);
	}, [getPotBySearchTermProcess.status]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (searchWord === '') {
			return;
		}
		getPotBySearchTermProcess.mutate(searchWord);
	};

	const nothingToDisplay = () => {
		return (
			<VStack h='40' w='100%' justifyContent='center'>
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
			</VStack>
		);
	};
	return (
		<VStack w='100%' my='57px'>
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
					<Button
						variant='round'
						type='submit'
						isLoading={getPotBySearchTermProcess.isLoading ? true : false}
					>
						<Image className='whiteIconColor' src={search} />
					</Button>
				</HStack>
			</form>
			{getPotBySearchTermProcess.isSuccess &&
				getPotBySearchTermProcess.data.length !== 0 &&
				getPotBySearchTermProcess?.data.map((post, index) => (
					<BlogCard
						key={index}
						cardWidth='90%'
						title={post.title}
						author={post.postedBy.name}
						category={post.postCategory.title}
						body={post.body}
						postId={post._id}
						posted={post.createdAt}
						slug={post.slug}
					/>
				))}
			{getPotBySearchTermProcess.isSuccess &&
				getPotBySearchTermProcess.data.length === 0 &&
				nothingToDisplay()}
		</VStack>
	);
};

export default Search;
