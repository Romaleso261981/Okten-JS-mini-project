const renderUserProperties = (
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
  }
  labelElement.textContent = `${label ?? "label"}:`;
  if (elementClasNames && Array.isArray(elementClasNames)) {
    elementClasNames.map((className) => {
      element.classList.add(className);
    });
  }
  element.textContent = `${value ?? "N/A"}`;
  elementWrapper.appendChild(labelElement);
  elementWrapper.appendChild(element);
  rootElement.appendChild(elementWrapper);
};
const createElement = (typeElement, classLists, content) => {
  const element = document.createElement(typeElement);
  if (classLists && Array.isArray(classLists)) {
    classLists.map((classList) => {
      element.classList.add(classList);
    });
  }
  element.textContent = content;
  return element;
};
const renderPosts = (clasName, comment, index, rootElement) => {
  const userComment = createElement("div", ["user-comments"], "");
  userComment.addEventListener("click", () => {
    localStorage.setItem("currentCommentId", JSON.stringify(comment.id));
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
};
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

window.onload = function () {
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));

  fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
    .then((response) => response.json())
    .then((currentUser) => {
      if (currentUser) {
        const userDetails = findElement(".user-details", ["user-details"]);
        const mainTitleWrapper = findElement(".main-title");

        const mainTitle = createElement(
          "h1",
          ["main-title"],
          `User Details: ${currentUser.name}`
        );
        mainTitleWrapper.appendChild(mainTitle);

        for (const property in currentUser) {
          if (
            typeof currentUser[property] === "object" &&
            !Array.isArray(currentUser[property])
          ) {
            const nestedObject = currentUser[property];
            for (const nestedProperty in nestedObject) {
              if (
                typeof nestedObject[nestedProperty] === "object" &&
                !Array.isArray(nestedObject[nestedProperty])
              ) {
                const deeplyNestedObject = nestedObject[nestedProperty];
                for (const deeplyNestedProperty in deeplyNestedObject) {
                  renderUserProperties(
                    ["text", "textColorBlue"],
                    deeplyNestedObject[deeplyNestedProperty],
                    `${property}.${nestedProperty}.${deeplyNestedProperty}`,
                    ["label"],
                    userDetails
                  );
                }
              } else {
                renderUserProperties(
                  ["text", "textColorGreen"],
                  nestedObject[nestedProperty],
                  `${property}.${nestedProperty}`,
                  ["label"],
                  userDetails
                );
              }
            }
          } else {
            renderUserProperties(
              ["text", "textColorRed"],
              currentUser[property],
              property,
              ["label"],
              userDetails
            );
          }
        }

        const buttonWrapper = createElement("div", ["button-wrapper"], "");

        const commentsButton = createElement(
          "button",
          ["userDetail-button"],
          "Comments"
        );
        commentsButton.addEventListener("click", () => {
          openPosts(commentsButton);
        });

        const backButton = createElement(
          "button",
          ["userDetail-button"],
          "Back"
        );
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
      console.log("comments", comments);
      if (comments) {
        const usersPosts = findElement(".users-posts", [
          "hidden",
          "users-posts",
          "user-posts-wrapper"
        ]);
        const userPostsTitle = createElement(
          "h1",
          ["user-posts-title"],
          "User Comments"
        );
        usersPosts.appendChild(userPostsTitle);

        comments.map((comment, index) => {
          renderPosts("text", comment, index, usersPosts);
        });
      } else {
        console.error("Current users comments data not found.");
      }
    })
    .catch((error) => console.error("Error fetching current user:", error));
};
