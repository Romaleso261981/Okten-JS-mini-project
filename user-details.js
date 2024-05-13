window.onload = function () {
    const openPosts = (commentsButton) => {
        const usersPosts = document.querySelector(".users-posts");
        usersPosts.classList.toggle("hidden");
        commentsButton.textContent = "Comments";
        if (usersPosts.classList.contains("hidden")) {
            commentsButton.textContent = "Comments";
        } else {
            commentsButton.textContent = "Hide";
        }
    };

    const findElement = (className, classLists, content) => {
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

    }

    const createElement = (typeElement, classLists, content) => {
        const element = document.createElement(typeElement);
        if (classLists && Array.isArray(classLists)) {
            classLists.map((classList) => {
                element.classList.add(classList);
            });
        }
        element.textContent = content;
        return element;
    }

    const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
        .then((response) => response.json())
        .then((currentUser) => {
            if (currentUser) {
                const userDetails = findElement(".user-details");
                const mainTitleWrapper = findElement(".main-title");

                const mainTitle = createElement("h1", ["main-title"], `User Details: ${currentUser.name}`);
                mainTitleWrapper.appendChild(mainTitle);

                const renderFunction = (clasName, value, label, labelClassName) => {
                    const elementWrapper = document.createElement("div");
                    const element = document.createElement("p");
                    const labelElement = document.createElement("span");
                    labelElement.classList.add(labelClassName);
                    labelElement.textContent = `${label}:`;
                    element.classList.add(clasName);
                    element.textContent = `${value ? value : "N/A"}`;
                    elementWrapper.appendChild(labelElement);
                    elementWrapper.appendChild(element);
                    userDetails.appendChild(elementWrapper);
                };

                for (const property in currentUser) {
                    if (typeof currentUser[property] === 'object' && !Array.isArray(currentUser[property])) {
                        const nestedObject = currentUser[property];
                        for (const nestedProperty in nestedObject) {
                            if (typeof nestedObject[nestedProperty] === 'object' && !Array.isArray(nestedObject[nestedProperty])) {
                                const deeplyNestedObject = nestedObject[nestedProperty];
                                for (const deeplyNestedProperty in deeplyNestedObject) {
                                    renderFunction("text", deeplyNestedObject[deeplyNestedProperty], `${property}.${nestedProperty}.${deeplyNestedProperty}`, "label");
                                }
                            } else {
                                renderFunction("text", nestedObject[nestedProperty], `${property}.${nestedProperty}`, "label");
                            }
                        }
                    } else {
                        renderFunction("text", currentUser[property], property, "label");
                    }
                }

                const buttonWrapper = createElement("div", ["button-wrapper"], "");

                const commentsButton = createElement("button", ["userDetail-button"], "Comments");
                commentsButton.addEventListener("click", () => {
                    openPosts(commentsButton);
                });

                const backButton = createElement("button", ["userDetail-button"], "Back");
                backButton.addEventListener("click", () => {
                    window.location.href = "index.html";
                });

                buttonWrapper.appendChild(backButton);
                buttonWrapper.appendChild(commentsButton);

                userDetails.appendChild(buttonWrapper);
            } else {
                console.error("Current user data not found.");
            }
        })
        .catch((error) => console.error("Error fetching current user:", error));
    fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}/posts`)
        .then((response) => response.json())
        .then((comments) => {
            if (comments) {
                const usersPosts = findElement(".users-posts", ["hidden", "users-posts", "user-posts-wrapper"]);
                const userPostsTitle = createElement("h1", ["user-posts-title"], "User Comments");
                usersPosts.appendChild(userPostsTitle);

                const renderPosts = (clasName, comment, index) => {
                    const userComment = createElement("div", ["user-comments"], "");
                    userComment.addEventListener("click", () => {
                        localStorage.setItem(
                            "currentCommentId",
                            JSON.stringify(comment.id)
                        );
                        window.location.href = "user-comment.html";
                    });
                    const element = createElement("h1", [clasName], `${index + 1}:  ${
                        comment.title ?? "N/A"
                    }`);
                    userComment.appendChild(element);
                    usersPosts.appendChild(userComment);
                };

                comments.map((comment, index) => {
                    renderPosts("text", comment, index);
                });
            } else {
                console.error("Current users comments data not found.");
            }
        });
};
