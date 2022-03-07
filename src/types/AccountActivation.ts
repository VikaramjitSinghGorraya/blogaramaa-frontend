export type AccountActivationInfo = {
	error?: Boolean;
	heading: string;
	body?: string;
	buttonText: string;
	imageSrc: string;
	isLoading?: boolean;
	onClick?: (e) => void;
};
