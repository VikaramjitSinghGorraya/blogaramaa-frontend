import { VStack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
function App() {
	return (
		<>
			<Navbar />
			<VStack h='100vh' w='90%' m='auto'>
				<Routes>
					<Route path='/Signup' element={<Signup />} />
					<Route path='/Signin' element={<Signin />} />
				</Routes>
			</VStack>
		</>
	);
}

export default App;
