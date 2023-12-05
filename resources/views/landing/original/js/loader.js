export const Loader = (elem) => {	
	const element = document.getElementById(elem);
	if (!element) return;

	window.addEventListener('load', () => {
		element.classList.add('hidden');
	})
}