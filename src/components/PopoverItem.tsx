import React from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
	Box,
	Image,
	HStack,
} from '@chakra-ui/react';
import { PopoverInfo } from '../types/PopoverItem';
import more from '../icons/more.svg';

const PopoverItem = ({
	passedInput,
	height = 'auto',
	width = 'auto',
	left = '-4.9rem',
	top = '-3rem',
}: PopoverInfo) => {
	return (
		<HStack w='40%' justifyContent='flex-end'>
			<Popover isLazy>
				<PopoverTrigger>
					<Button variant='base'>
						<Image src={more} />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					position='absolute'
					left={left}
					top={top}
					w={width}
					h={height}
				>
					{passedInput}
				</PopoverContent>
			</Popover>
		</HStack>
	);
};

export default PopoverItem;
