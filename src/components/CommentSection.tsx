import React from 'react';
import Disqus from 'disqus-react';
import { CommentSectionInfo } from '../types/CommentSection';
import { HStack } from '@chakra-ui/react';
const CommentSection = ({ name, config }: CommentSectionInfo) => {
	return (
		<HStack w='100%' pb='50px' mt='-10'>
			<Disqus.DiscussionEmbed shortname={name} config={config} />
		</HStack>
	);
};

export default CommentSection;
