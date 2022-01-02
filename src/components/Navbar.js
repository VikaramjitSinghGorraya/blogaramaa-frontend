import React from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Image,
	HStack,
	VStack,
	Text,
	Link,
} from '@chakra-ui/react';
import placeholderCircle from '../images/placeholderCircle.png';
import home from '../icons/home.svg';
import edit from '../icons/edit.svg';
import addUser from '../icons/addUser.svg';
import signin from '../icons/signin.svg';
import contact from '../icons/contact.svg';
import about from '../icons/about.svg';
import menu from '../icons/menu.svg';
import search from '../icons/search.svg';
import Logo from './Logo';

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	const drawerHeader = () => {
		return (
			<HStack w='100%'>
				<Image src={placeholderCircle} objectFit='cover' h='5rem' w='5rem' />
				<VStack>
					<Text as='p' fontSize='15px'>
						Hi there, <br />
						Aren't on borad yet? <br />
						<Link>Get Started</Link>
					</Text>
				</VStack>
			</HStack>
		);
	};

	const drawerBody = () => {
		return (
			<VStack
				justifyContent='space-between'
				alignItems='flex-start'
				w='100%'
				h='250px'
			>
				<HStack>
					<Image src={home} /> <Link>Home</Link>
				</HStack>
				<HStack>
					<Image src={edit} />
					<Link>Write Blog</Link>
				</HStack>
				<HStack>
					<Image src={signin} />
					<Link>Signin</Link>
				</HStack>
				<HStack>
					<Image src={addUser} />
					<Link>Signup</Link>
				</HStack>
			</VStack>
		);
	};

	const drawerFooter = () => {
		return (
			<VStack
				justifyContent='space-around'
				alignItems='flex-start'
				w='100%'
				h='150px'
			>
				<HStack>
					<Image src={contact} />
					<Link>Contact</Link>
				</HStack>
				<HStack>
					<Image src={about} />
					<Link>About</Link>
				</HStack>
			</VStack>
		);
	};
	const navbarDrawer = () => {
		return (
			<>
				<Button
					ref={btnRef}
					onClick={onOpen}
					bg='transparent'
					_hover={{ bg: 'transparent' }}
				>
					<Image src={menu} />
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='left'
					onClose={onClose}
					finalFocusRef={btnRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>{drawerHeader()}</DrawerHeader>

						<DrawerBody>{drawerBody()}</DrawerBody>

						<DrawerFooter borderTopWidth='1px'>{drawerFooter()}</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const navbar = () => {
		return (
			<HStack justifyContent='space-between' px='5' bg='white'>
				{navbarDrawer()}
				{Logo()}
				<Link>
					<Image src={search} />
				</Link>
			</HStack>
		);
	};
	return <>{navbar()}</>;
};

export default Navbar;
