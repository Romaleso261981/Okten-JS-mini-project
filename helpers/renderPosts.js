import {createElement} from "./createElement";


export const renderPosts = (clasName, comment, index, rootElement) => {
    const userComment = createElement("div", ["user-comments"], "");
    userComment.addEventListener("click", () => {
        localStorage.setItem(
            "currentCommentId",
            JSON.stringify(comment.id)
        );
        window.location.href = "user-comment.html";
    });
    const element = createElement(
        "h1",
        [clasName],
        `${index + 1}:  ${comment.title ?? "N/A"}`
    );
    userComment.appendChild(element);
    rootElement.appendChild(userComment);
};