import React from 'react';
import plugins from 'suneditor/src/plugins';
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
				plugins: plugins,
				buttonList: [
					['font', 'fontSize', 'formatBlock'],
					['paragraphStyle', 'blockquote'],
					['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
					['outdent', 'indent'],
					['align', 'horizontalRule', 'list', 'lineHeight'],
					['table', 'link', 'image', 'video', 'audio'],
					['fullScreen'],
					['preview', 'print'],
				],
				formats: ['p', 'div', 'h3', 'h4', 'h5', 'h6'],
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
