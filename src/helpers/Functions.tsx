export const displayTabTitle = (locationPath) => {
	if (locationPath === '/') {
		document.title = 'Home | Blogaramaa';
		return;
	}
	if (locationPath.includes('post')) {
		const tabTitle = locationPath.substring(6, locationPath.length);
		document.title = tabTitle.includes('-')
			? `${tabTitle.replace('-', ' ')} | Blogaramaa`
			: `${tabTitle} | Blogaramaa`;
		return;
	}
	document.title = `${locationPath.substring(
		1,
		locationPath.length
	)} | Blogaramaa`;
};
