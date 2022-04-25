import React, { useEffect } from 'react';
import { Grid, Box } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import { useGetPosts } from '../queries/Queries';
import homePage from '../icons/homePage.svg';

const Home = () => {
	const {
		isLoading: postsLoading,
		isError: postsError,
		isSuccess: potsSuccess,
		data: postsData,
	} = useGetPosts();

	return (
		<Box h='fit-content' w='100%' my='56px' py='5' mx='auto'>
			<Banner heading={`Today's List`} icon={homePage} />
			{postsLoading ? (
				<Loader />
			) : (
				<Grid
					templateColumns={[
						'repeat(auto-fit, minmax(auto, 1fr))',
						'repeat(auto-fit, minmax(600px, auto))',
						'repeat(2, minmax(600px, 1fr))',
					]}
				>
					{postsData?.data.posts.map((post, index) => (
						<BlogCard
							key={index}
							cardWidth='90%'
							title={post.title}
							author={post.postedBy.name}
							authorId={post.postedBy._id}
							category={post.postCategory.title}
							body={post.body}
							postId={post._id}
							posted={post.createdAt}
							slug={post.slug}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default Home;
