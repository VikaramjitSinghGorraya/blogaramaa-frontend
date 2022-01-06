import React from 'react';
import {
	Box,
	Text,
	FormLabel,
	Input,
	VStack,
	HStack,
	Select,
	Image,
	Button,
} from '@chakra-ui/react';
import {
	align,
	font,
	fontColor,
	fontSize,
	formatBlock,
	hiliteColor,
	horizontalRule,
	lineHeight,
	list,
	paragraphStyle,
	table,
	template,
	textStyle,
	image,
	link,
} from 'suneditor/src/plugins';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Banner from '../components/Banner';
import send from '../icons/send.svg';
import addImage from '../icons/addImage.svg';
import writeBlog from '../icons/writeBlog.svg';
import bannerImage from '../icons/bannerImage.png';

const Blog = () => {
	const BannerImg = () => {
		return (
			<VStack
				w='100%'
				spacing={0}
				position='relative'
				h='200px'
				alignItems='flex-start'
			>
				<Text as='small' color='brand.mutedText'>
					Banner Image
				</Text>

				<HStack
					h='300px'
					w='100%'
					color='white'
					bg='brand.primaryBlueLight'
					bgImage={bannerImage}
					bgPos='center center !important'
					bgSize='cover'
					justifyContent='center'
					position='relative'
				>
					<Box
						h='128px'
						w='128px'
						bg='rgba(0, 0, 0, 0.5)'
						borderRadius='50%'
						position='absolute'
						p='5'
					>
						<FormLabel mx='auto' cursor='pointer'>
							<Image className='whiteIconColor' src={addImage} />
							<Input type='file' accept='image/*' hidden />
						</FormLabel>
					</Box>
				</HStack>
				<Text as='small' color='brand.mutedTextLight'>
					featured image & used as a banner over the top of blog post
				</Text>
			</VStack>
		);
	};
	const titleAndCategory = () => {
		return (
			<VStack w='100%' spacing={5}>
				<VStack w='100%' alignItems='flex-start' spacing={0}>
					<Input type='text' name='title' placeholder='Blog Title*' p='5' />
					<Text as='small' color='brand.mutedTextLight'>
						blog will be identified with this title
					</Text>
				</VStack>
				<VStack w='100%' alignItems='flex-start' spacing={0}>
					<Select placeholder='Category*' color='brand.mutedTextLight'>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
					<Text as='small' color='brand.mutedTextLight'>
						please select a category
					</Text>
				</VStack>
			</VStack>
		);
	};
	const textEditor = () => {
		return (
			<>
				<SunEditor
					setOptions={{
						minHeight: '50vh',
						plugins: [
							align,
							font,
							fontColor,
							fontSize,
							formatBlock,
							hiliteColor,
							horizontalRule,
							lineHeight,
							list,
							paragraphStyle,
							table,
							template,
							textStyle,
							image,
							link,
						],
						buttonList: [
							[
								'undo',
								'redo',
								'font',
								'fontSize',
								'formatBlock',
								'preview',
								'bold',
								'underline',
								'italic',
								'strike',
								'fontColor',
								'hiliteColor',
								'removeFormat',
								'outdent',
								'indent',
								'align',
								'horizontalRule',
								'list',
								'lineHeight',
								'table',
								'link',
								'image',
							],
						],
						formats: ['p', 'h3', 'h4', 'h5', 'h6'],
						font: [
							'Arial',
							'Calibri',
							'Comic Sans',
							'Courier',
							'Garamond',
							'Georgia',
							'Impact',
							'Times New Roman',
						],
					}}
				/>
			</>
		);
	};

	const blogPageContent = () => {
		return (
			<VStack alignItems='flex-end' w='100%' h='100%'>
				<Banner heading='Write blog' icon={writeBlog} />
				{BannerImg()}
				{titleAndCategory()}
				{textEditor()}
				<Button variant='long'>
					<Image className='iconColor' src={send} />
					PUBLISH
				</Button>
			</VStack>
		);
	};
	return (
		<HStack w='100%' my='56px' py='5'>
			{blogPageContent()}
		</HStack>
	);
};

export default Blog;
