import React from 'react';

export type InputInfo = {
	type: string;
	name: string;
	value?: string;
	placeholder: string;
	onChange?: (value: string) => void;
};
