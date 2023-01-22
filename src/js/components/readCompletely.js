const readCompletely = (container, button, item, visibleItem = 5) => {
    const containerEl = document.querySelectorAll(container);
    containerEl.forEach(el => {
        const buttonEl = el.querySelector(button);
        const items = el.querySelectorAll(item);
        const hiddenElements = Array.from(items).slice(visibleItem, items.length);
        hiddenElements.forEach(el => {
            el.classList.add('hidden');
        });
        buttonEl.addEventListener('click', () => {
            hiddenElements.forEach(el => {
                el.classList.remove('hidden');
            });
            buttonEl.remove();
        });
    });
}

export default readCompletely;
