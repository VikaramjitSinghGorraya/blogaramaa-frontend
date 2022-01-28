import React from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Text,
	VStack,
	Image,
	Button,
	Grid,
	HStack,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import Share from '../components/Share';
import BlogCard from '../components/BlogCard';
import placeholderCircle from '../images/placeholderCircle.png';
import user from '../icons/user.svg';
import signout from '../icons/signout.svg';
import calendar from '../icons/calendar.svg';
import contact from '../icons/contact.svg';
import PopoverItem from '../components/PopoverItem';
const Profile = () => {
	const aboutSection = () => {
		return (
			<Accordion allowToggle w='100%' color='brand.mutedText'>
				<AccordionItem border='none'>
					<h2>
						<AccordionButton _hover={{ bg: 'none' }} px='0'>
							<HStack w='100%'>
								<Image src={user} alt='user' className='mutedIconColor' />
								<Text as='p' color='brand.mutedText'>
									About
								</Text>
							</HStack>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} color='brand.mutedText'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		);
	};

	const signoutPopover = () => {
		return (
			<Button w='7rem' variant='base'>
				<HStack>
					<Image src={signout} className='mutedIconColor' />{' '}
					<Text as='p' color='brand.mutedText'>
						Signout
					</Text>
				</HStack>
			</Button>
		);
	};
	const displayUserInfoShareAndSignout = () => {
		return (
			<HStack w='100%' alignItems='flex-end' justifyContent='space-between'>
				<VStack w='55%' h='100%'>
					<HStack w='100%'>
						<Image src={contact} className='mutedIconColor' />
						<Text as='p' color='brand.mutedTextLight'>
							f1freak96@gmail.com
						</Text>
					</HStack>
					<HStack w='100%'>
						<Image src={calendar} className='mutedIconColor' />
						<Text as='p' color='brand.mutedTextLight'>
							joined a year ago
						</Text>
					</HStack>
				</VStack>

				<HStack
					spacing={-5}
					maxH='1.5rem'
					maxW='6.5rem'
					justifyContent='center'
				>
					<Share showText={false} />
					<PopoverItem passedInput={signoutPopover()} />
				</HStack>
			</HStack>
		);
	};

	const profilePageContent = () => {
		return (
			<VStack w='100%'>
				<Banner heading='Vikaramjit Singh' icon={placeholderCircle} />
				{aboutSection()}
				{displayUserInfoShareAndSignout()}
				<Grid
					templateColumns={['auto', 'repeat(2, auto)']}
					justifyContent='center'
				>
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
					<BlogCard cardWidth='90%' />
				</Grid>
			</VStack>
		);
	};
	return (
		<VStack w='100%' my='56px' py='5'>
			{profilePageContent()}
		</VStack>
	);
};

export default Profile;
