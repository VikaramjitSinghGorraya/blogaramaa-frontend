import React from 'react';
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
import { BlogEditorInfo } from '../types/BlogEditor';
const BlogEditor = ({ contents, onChange }: BlogEditorInfo) => {
	return (
		<SunEditor
			name='body'
			setContents={contents}
			onChange={onChange}
			setOptions={{
				minHeight: '50vh',
				minWidth: '100%',
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
	);
};

export default BlogEditor;
