import { extendTheme } from '@chakra-ui/react';
import buttonTheme from './components/Button';
import linkTheme from './components/Link';
import colorTheme from './Color';
import globalTheme from './Global';

const overrides = {
	colors: { ...colorTheme },
	styles: {
		...globalTheme,
	},
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
