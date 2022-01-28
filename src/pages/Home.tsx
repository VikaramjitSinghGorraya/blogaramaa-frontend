import React from 'react';
import { VStack, Grid } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import Banner from '../components/Banner';
import homePage from '../icons/homePage.svg';
const Home = () => {
	return (
		<VStack h='fit-content' w='100%' my='56px' py='5' alignItems='flex-start'>
			<Banner heading={`Today's List`} icon={homePage} />
			<Grid
				templateColumns={['auto', 'repeat(2, auto)']}
				justifyContent='center'
			>
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
				<BlogCard cardWidth='90%' />
			</Grid>
		</VStack>
	);
};

export default Home;
