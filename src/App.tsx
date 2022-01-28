import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/RestePassword';
import Blog from './pages/Blog';
import Search from './pages/Search';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Contact from './pages/Contact';

function App() {
	return (
		<>
			<Navbar />
			<VStack h='100vh' w='90%' m='auto'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Signup' element={<Signup />} />
					<Route path='/Signin' element={<Signin />} />
					<Route path='/ForgotPassword' element={<ForgotPassword />} />
					<Route path='/ResetPassword' element={<ResetPassword />} />
					<Route path='/WriteBlog' element={<Blog />} />
					<Route path='/Search' element={<Search />} />
					<Route path='/Edit' element={<EditProfile />} />
					<Route path='/Profile' element={<Profile />} />
					<Route path='/Post' element={<Post />} />
					<Route path='/Contact' element={<Contact />} />
				</Routes>
			</VStack>
		</>
	);
}

export default App;
