const buttonTheme = {
	baseStyle: {
		_focus: {
			boxShadow: 'none',
			outline: 'none',
		},
	},
	variants: {
		round: {
			h: '55px',
			w: '55px',
			bg: 'brand.primaryBlue',
			color: 'brand.textOnPrimaryBg',
			borderRadius: '50%',
		},
		long: {
			p: '5',
			borderRadius: '50',
			bg: 'brand.primaryBlueLight',
			color: 'brand.primaryBlue',
		},
	},

	defaultProps: {
		variants: null,
	},
};
export default buttonTheme;
