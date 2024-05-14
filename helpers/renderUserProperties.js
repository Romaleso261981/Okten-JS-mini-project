

export const renderUserProperties = (
    elementClasNames,
    value,
    label,
    labelClassNames,
    rootElement
) => {
    const elementWrapper = document.createElement("div");
    const element = document.createElement("p");
    const labelElement = document.createElement("span");

    if (labelClassNames && Array.isArray(labelClassNames)) {
        labelClassNames.map((className) => {
            labelElement.classList.add(className);
        });
    } else {
        labelElement.classList.add("label");
    }
    labelElement.textContent = `${label ?? "label"}:`;
    if (elementClasNames && Array.isArray(elementClasNames)) {
        elementClasNames.map((className) => {
            labelElement.classList.add(className);
        });
    } else {
        element.classList.add("text");
    }
    element.textContent = `${value ?? "N/A"}`;
    elementWrapper.appendChild(labelElement);
    elementWrapper.appendChild(element);
    rootElement.appendChild(elementWrapper);
};