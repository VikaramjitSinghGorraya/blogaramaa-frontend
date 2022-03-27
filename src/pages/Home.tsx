import React from 'react';
import { VStack, Grid, Center, Spinner } from '@chakra-ui/react';
import BlogCard from '../components/BlogCard';
import Banner from '../components/Banner';
import Loader from '../components/Loader';
import { useGetPosts } from '../queries/Queries';
import homePage from '../icons/homePage.svg';

const Home = () => {
	const getPostsProcess = useGetPosts();

	return (
		<VStack h='fit-content' w='100%' my='56px' py='5'>
			<Banner heading={`Today's List`} icon={homePage} />
			{getPostsProcess.isLoading ? (
				<Loader />
			) : (
				<Grid
					templateColumns={[
						'repeat(auto-fit, minmax(300px, 1fr))',
						'repeat(auto-fit, minmax(600px, 500xp))',
						'repeat(2, minmax(600px, 1fr))',
					]}
				>
					{getPostsProcess.data?.data.posts.map((post, index) => (
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
				</Grid>
			)}
		</VStack>
	);
};

export default Home;
