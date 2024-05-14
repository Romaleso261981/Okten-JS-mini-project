export const findElement = (className, classLists, content) => {
    let element = document.querySelector(className);
    if (classLists && Array.isArray(classLists)) {
        classLists.map((classList) => {
            element.classList.add(classList);
        });
    }
    if (content) {
        element.textContent = content;
    }
    return element;
};