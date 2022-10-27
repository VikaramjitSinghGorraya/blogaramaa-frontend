import { useEffect, lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { displayTabTitle } from './helpers/Functions';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/RestePassword'));
const Blog = lazy(() => import('./pages/Blog'));
const Search = lazy(() => import('./pages/Search'));
// const EditProfile = lazy(() => import('./pages/EditProfile'));
const Post = lazy(() => import('./pages/Post'));
const Contact = lazy(() => import('./pages/Contact'));
const AccountActivation = lazy(() => import('./pages/AccountActivation'));
const EditBlog = lazy(() => import('./pages/EditBlog'));
const OtherUserProfile = lazy(() => import('./pages/OtherUserProfile'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
function App() {
	const location = useLocation();

	// const [userId, setUserId] = useState('');

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
						<Route
							path='/WriteBlog'
							element={
								<ProtectedRoute>
									<Blog />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/EditBlog/:slug'
							element={
								<ProtectedRoute>
									<EditBlog />
								</ProtectedRoute>
							}
						/>
						<Route path='/Search' element={<Search />} />
						<Route
							path='/EditProfile'
							element={
								<ProtectedRoute>
									<EditBlog />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/Profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route path='/Profile/:authorId' element={<OtherUserProfile />} />
						<Route path='/Post/:slug' element={<Post />} />
						<Route path='/Contact' element={<Contact />} />
						<Route path='/*' element={<NotFound />} />
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
