const buttonTheme = {
	baseStyle: {
		bg: 'none !important',
		_focus: {
			boxShadow: 'none',
			outline: 'none',
		},
	},
	variants: {
		base: {
			bg: 'none',
			_hover: {
				bg: 'gray.100',
			},
		},
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
		variants: 'base',
	},
};
export default buttonTheme;
