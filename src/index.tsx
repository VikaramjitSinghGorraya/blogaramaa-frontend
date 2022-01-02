import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import theme from './theme';

const queryClient = new QueryClient();
ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
