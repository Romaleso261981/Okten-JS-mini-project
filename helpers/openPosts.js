export const openPosts = (commentsButton) => {
    const usersPosts = document.querySelector(".users-posts");
    usersPosts.classList.toggle("hidden");
    commentsButton.textContent = "Comments";
    if (usersPosts.classList.contains("hidden")) {
        commentsButton.textContent = "Comments";
    } else {
        commentsButton.textContent = "Hide";
    }
};
