export type InputInfo = {
	type: string;
	name: string;
	value?: string;
	placeholder: string;
	disabled?: boolean;
	onChange?: (e) => void;
	onClick?: (e) => void;
};
