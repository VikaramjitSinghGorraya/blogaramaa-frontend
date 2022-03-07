import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { InputInfo } from '../types/Input';

const InputField = ({
	type,
	name,
	value,
	placeholder,
	onChange,
}: InputInfo) => {
	return (
		<FormControl>
			<Input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				size='lg'
				required
			/>
			<FormErrorMessage></FormErrorMessage>
		</FormControl>
	);
};
export default InputField;
