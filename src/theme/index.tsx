import { extendTheme } from '@chakra-ui/react';
import buttonTheme from './components/Button';
import linkTheme from './components/Link';
import colorTheme from './Color';

const overrides = {
	colors: { ...colorTheme },
	components: {
		Button: {
			...buttonTheme,
		},
		Link: {
			...linkTheme,
		},
	},
};

export default extendTheme(overrides);
