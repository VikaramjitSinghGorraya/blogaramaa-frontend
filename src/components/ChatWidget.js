import React from 'react';

const ChatWidget = () => {
	return (
		<div>
			<chat-widget
				style='--chat-widget-primary-color: #188bf6; --chat-widget-active-color:#188bf6 ;--chat-widget-bubble-color: #188bf6'
				location-id='ojw2Rh8UCPxe3fsaSZhr'
				prompt-avatar='https://widgets.leadconnectorhq.com/chat-widget/assets/defaultAvatar.png'
			></chat-widget>
			<script
				src='https://widgets.leadconnectorhq.com/loader.js'
				data-resources-url='https://widgets.leadconnectorhq.com/chat-widget/loader.js'
			></script>
		</div>
	);
};

export default ChatWidget;
