
export function scrolling(x, y) {
    window.scrollTo(x, y)
}

export function removeClasses(classes) {
    const elements = document.querySelectorAll(`.${classes}`);

    elements.forEach(element => {
        element.classList.remove(classes);
    });
}