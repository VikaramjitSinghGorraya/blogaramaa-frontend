const linkTheme = {
	baseStyle: {
		_hover: {
			textDecoration: 'none',
		},
		_focus: {
			boxShadow: 'none',
			outline: 'none',
		},
	},
	variants: {
		blueLink: {
			color: 'brand.primaryBlue',
			fontWeight: '500',
		},
		grayLink: {
			color: 'brand.mutedText',
			fontWeight: '500',
		},
	},
};

export default linkTheme;
