import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { useIsLoggedIn } from '../queries/Queries';
import { useGetUserPhoto, useGetUserProfile } from '../queries/Queries';
import placeholderCircle from '../images/placeholderCircle.png';
import home from '../icons/home.svg';
import edit from '../icons/edit.svg';
import addUser from '../icons/addUser.svg';
import signin from '../icons/signin.svg';
import contact from '../icons/contact.svg';
import about from '../icons/about.svg';
import menu from '../icons/menu.svg';
import search from '../icons/search.svg';
import dashboard from '../icons/dashboard.svg';
import Logo from './Logo';

const Navbar = () => {
	const location = useLocation();
	const { status: isLoggedinStatus, data: loggedinData } = useIsLoggedIn();
	const { isLoading: photoLoading, data: photoData } = useGetUserPhoto(
		loggedinData?.data.userId
	);
	const { isLoading: userLoading, data: userData } = useGetUserProfile();

	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const drawerHeader = () => {
		return (
			<HStack w='100%'>
				<Image
					src={photoData ? photoData : placeholderCircle}
					objectFit='cover'
					h='5rem'
					w='5rem'
					borderRadius='50%'
				/>
				<VStack>
					{isLoggedinStatus === 'success' ? (
						<Text as='small' wordBreak='break-all'>
							{userData?.user.name}
						</Text>
					) : (
						<Text as='small'>
							Hi there, <br />
							Aren't on borad yet? <br />
							<Link href='/signup' variant='blueLink'>
								Get Started
							</Link>
						</Text>
					)}
				</VStack>
			</HStack>
		);
	};

	const drawerBody = () => {
		return (
			<VStack
				justifyContent='space-around'
				alignItems='flex-start'
				w='100%'
				h='250px'
			>
				<HStack
					bg={location.pathname === '/' ? 'brand.primaryBlueLight' : ''}
					color={location.pathname === '/' ? 'brand.primaryBlue' : ''}
					h='3rem'
					w='80%'
					borderRadius='10'
					px='5'
				>
					<Image
						src={home}
						className={location.pathname === '/' ? 'iconColor' : ''}
					/>{' '}
					<Link href='/'>Home</Link>
				</HStack>
				<HStack
					bg={
						location.pathname === '/writeblog' ? 'brand.primaryBlueLight' : ''
					}
					color={location.pathname === '/writeblog' ? 'brand.primaryBlue' : ''}
					h='3rem'
					w='80%'
					borderRadius='10'
					px='5'
				>
					<Image
						src={edit}
						className={location.pathname === '/writeblog' ? 'iconColor' : ''}
					/>
					<Link href='/writeblog'>Write Blog</Link>
				</HStack>
				{isLoggedinStatus === 'error' ? (
					<HStack
						bg={location.pathname === '/signin' ? 'brand.primaryBlueLight' : ''}
						color={location.pathname === '/signin' ? 'brand.primaryBlue' : ''}
						h='3rem'
						w='80%'
						borderRadius='10'
						px='5'
					>
						<Image
							src={signin}
							color='red'
							className={location.pathname === '/signin' ? 'iconColor' : ''}
						/>
						<Link href='/signin'>Signin</Link>
					</HStack>
				) : null}
				{isLoggedinStatus === 'error' ? (
					<HStack
						bg={location.pathname === '/signup' ? 'brand.primaryBlueLight' : ''}
						color={location.pathname === '/signup' ? 'brand.primaryBlue' : ''}
						h='3rem'
						w='80%'
						borderRadius='10'
						px='5'
					>
						<Image
							src={addUser}
							className={location.pathname === '/signup' ? 'iconColor' : ''}
						/>
						<Link href='/signup'>Signup</Link>
					</HStack>
				) : null}
				{isLoggedinStatus === 'error' ? null : (
					<HStack
						bg={
							location.pathname === '/profile' ? 'brand.primaryBlueLight' : ''
						}
						color={location.pathname === '/profile' ? 'brand.primaryBlue' : ''}
						h='3rem'
						w='80%'
						borderRadius='10'
						px='5'
					>
						<Image
							src={dashboard}
							className={location.pathname === '/profile' ? 'iconColor' : ''}
						/>
						<Link href='/profile'>Dashboard</Link>
					</HStack>
				)}
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
				<HStack
					bg={location.pathname === '/contact' ? 'brand.primaryBlueLight' : ''}
					color={location.pathname === '/contact' ? 'brand.primaryBlue' : ''}
					h='3rem'
					w='80%'
					borderRadius='10'
					px='5'
				>
					<Image
						src={contact}
						className={location.pathname === '/contact' ? 'iconColor' : ''}
					/>
					<Link href='/contact'>Contact</Link>
				</HStack>
				<HStack
					bg={location.pathname === '/about' ? 'brand.primaryBlueLight' : ''}
					color={location.pathname === '/about' ? 'brand.primaryBlue' : ''}
					h='3rem'
					w='80%'
					borderRadius='10'
					px='5'
				>
					<Image
						src={about}
						className={location.pathname === '/about' ? 'iconColor' : ''}
					/>
					<Link href='/post/about-blogaramaa'>About</Link>
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
			<HStack
				justifyContent='space-between'
				p='2'
				bg='rgb(243, 244, 244)'
				position='fixed'
				zIndex='100'
				w='100%'
				h='56px'
			>
				{navbarDrawer()}
				{Logo()}
				<Button onClick={() => navigate('/search')}>
					<Image src={search} />
				</Button>
			</HStack>
		);
	};
	return <>{navbar()}</>;
};

export default Navbar;
