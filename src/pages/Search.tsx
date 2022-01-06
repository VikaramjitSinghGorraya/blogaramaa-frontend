import React from 'react';
import { Input, Button, HStack, VStack, Image } from '@chakra-ui/react';
import Banner from '../components/Banner';
import search from '../icons/search.svg';
import searchPage from '../icons/searchPage.svg';
const Search = () => {
	return (
		<VStack w='100%' my='57px'>
			<Banner heading='Search' icon={searchPage} />
			<HStack w='100%'>
				<Input
					type='text'
					borderRadius='50'
					bg='rgb(243, 244, 244)'
					placeholder='Search here...'
				/>
				<Button variant='round'>
					<Image className='whiteIconColor' src={search} />
				</Button>
			</HStack>
		</VStack>
	);
};

export default Search;
