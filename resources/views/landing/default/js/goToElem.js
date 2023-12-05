export const GoToElem = () => {
  window.addEventListener("click", ({ target }) => {
    const scrollTarget = target.dataset.scrollTo;
    if (!scrollTarget) return; 

		const elem = document.getElementById(scrollTarget);
    elem?.scrollIntoView({ behavior: "smooth" });
  });
};