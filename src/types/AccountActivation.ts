export type AccountActivationInfo = {
	error?: Boolean;
	heading: string;
	body?: unknown | any;
	buttonText: string;
	imageSrc: string;
	isLoading?: boolean;
	onClick?: (e) => void;
};
