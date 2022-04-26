import { useEffect, lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { displayTabTitle } from './helpers/Functions';
import Navbar from './components/Navbar';
import Home from './pages/Home';
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/RestePassword'));
const Blog = lazy(() => import('./pages/Blog'));
const Search = lazy(() => import('./pages/Search'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Post = lazy(() => import('./pages/Post'));
const Contact = lazy(() => import('./pages/Contact'));
const AccountActivation = lazy(() => import('./pages/AccountActivation'));
const EditBlog = lazy(() => import('./pages/EditBlog'));
const OtherUserProfile = lazy(() => import('./pages/OtherUserProfile'));
const Profile = lazy(() => import('./pages/Profile'));
function App() {
	const location = useLocation();

	useEffect(() => {
		displayTabTitle(location.pathname);
	}, [location.pathname]);
	return (
		<>
			<Navbar />

			<VStack h='100vh' w='90%' m='auto'>
				<Suspense fallback={null}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/Signup' element={<Signup />} />
						<Route path='/Signin' element={<Signin />} />
						<Route path='/ForgotPassword' element={<ForgotPassword />} />
						<Route path='/ResetPassword/:token' element={<ResetPassword />} />
						<Route path='/WriteBlog' element={<Blog />} />
						<Route path='/EditBlog/:slug' element={<EditBlog />} />
						<Route path='/Search' element={<Search />} />
						<Route path='/EditProfile' element={<EditProfile />} />
						<Route path='/Profile' element={<Profile />} />
						<Route path='/Profile/:authorId' element={<OtherUserProfile />} />
						<Route path='/Post/:slug' element={<Post />} />
						<Route path='/Contact' element={<Contact />} />
						<Route
							path='/AccountActivation/:token'
							element={<AccountActivation />}
						/>
					</Routes>
				</Suspense>
			</VStack>
		</>
	);
}

export default App;
