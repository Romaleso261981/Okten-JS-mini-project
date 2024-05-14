export const createElement = (typeElement, classLists, content) => {
    const element = document.createElement(typeElement);
    if (classLists && Array.isArray(classLists)) {
        classLists.map((classList) => {
            element.classList.add(classList);
        });
    }
    element.textContent = content;
    return element;
};