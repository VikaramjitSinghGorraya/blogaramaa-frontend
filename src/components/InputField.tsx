import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { InputInfo } from '../types/Input';

const InputField = ({
	type,
	name,
	value,
	placeholder,
	disabled,
	onChange,
	onClick,
}: InputInfo) => {
	return (
		<FormControl minW='100%'>
			<Input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				size='lg'
				required
				isDisabled={disabled}
				onClick={onClick}
				minW='100%'
			/>
			<FormErrorMessage></FormErrorMessage>
		</FormControl>
	);
};
export default InputField;
