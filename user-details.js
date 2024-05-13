window.onload = function () {
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
    .then((response) => response.json())
    .then((currentUser) => {
      if (currentUser) {
        const userDetails = document.querySelector(".user-details");
        const mainTitleWrapper = document.querySelector(".main-title");
        mainTitleWrapper.classList.add("main-title-wrapper");

        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("main-title");
        mainTitle.textContent = `User Details: ${currentUser.name}`;

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

        renderFunction("text", currentUser.id, "ID", "label");

        renderFunction("text", currentUser.address.city, "City", "label");

        renderFunction("text", currentUser.company.bs, "Company BS", "label");

        renderFunction("text", currentUser.name, "Name", "label");

        renderFunction("text", currentUser.address.street, "Street", "label");

        renderFunction(
          "text",
          currentUser.company.catchPhrase,
          "Company Catch Phrase",
          "label"
        );

        renderFunction("text", currentUser.username, "Username", "label");

        renderFunction(
          "text",
          currentUser.company.name,
          "Company Name",
          "label"
        );

        renderFunction("text", currentUser.address.suite, "Suite", "label");

        renderFunction("text", currentUser.website, "Website", "label");

        renderFunction(
          "text",
          currentUser.address.geo.lat,
          "user-address-geo(lat)",
          "label"
        );

        renderFunction("text", currentUser.address.zipcode, "Zipcode", "label");

        renderFunction("text", currentUser.email, "Email", "label");

        renderFunction(
          "text",
          currentUser.address.geo.lng,
          "user-address-geo(lng)",
          "label"
        );

        const backButton = document.createElement("button");
        backButton.classList.add("userDetail-button");
        backButton.textContent = "Back";
        backButton.addEventListener("click", () => {
          window.location.href = "index.html";
        });
        userDetails.appendChild(backButton);
      } else {
        console.error("Current user data not found.");
      }
    })
    .catch((error) => console.error("Error fetching current user:", error));
  fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}/posts`)
    .then((response) => response.json())
    .then((comments) => {
      if (comments) {
        const usersPosts = document.querySelector(".users-posts");
        usersPosts.classList.add("user-posts-wrapper");

        const userPostsTitle = document.createElement("h1");
        userPostsTitle.classList.add("user-posts-title");
        userPostsTitle.textContent = "User Comments";

        usersPosts.appendChild(userPostsTitle);

        const renderPosts = (clasName, comment, index) => {
          const userComment = document.createElement("div");
          userComment.classList.add("user-comments");
          userComment.addEventListener("click", () => {
            localStorage.setItem(
              "currentCommentId",
              JSON.stringify(comment.id)
            );
            window.location.href = "user-comment.html";
          });
          const element = document.createElement("h1");
          const number = document.createElement("span");
          element.classList.add(clasName);
          element.textContent = `${index + 1}:  ${
            comment.title ? comment.title : "N/A"
          }`;
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
