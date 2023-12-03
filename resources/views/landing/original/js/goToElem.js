export const GoToElem = (elem) => {
	const elements = document.querySelectorAll('[data-scroll-to]');
	if (!elements.length) return;

	[...elements].forEach(el => {
		el.addEventListener('click', () => {
			const target = el.dataset.scrollTo;
			if(!target) return;

			const element = document.getElementById(target);
			element?.scrollIntoView({ behavior: "smooth" });
		})
	})
}