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

const setLocalStorage = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const navigate = (path) => {
  window.location.href = path;
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

window.onload = function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      const container = findElement(".container", ["container"]);

      const userTitle = createElement("h1", ["user-info-mainTitle"], "Users:");
      container.appendChild(userTitle);

      const usersDiv = createElement("div", ["wrapper"]);

      data.forEach((user) => {
        const userDiv = createElement("div", ["user"]);
        userDiv.addEventListener("click", () => {
          setLocalStorage("currentUserId", user.id);
          navigate("user-details.html");
        });

        const userId = createElement(
          "span",
          ["user-info-id"],
          `ID: ${user.id}`
        );
        userDiv.appendChild(userId);

        const userTitle = createElement(
          "h2",
          ["user-info-title"],
          `Name: ${user.name}`
        );
        userDiv.appendChild(userTitle);

        const button = createElement(
          "button",
          ["userDetail-button"],
          "Details"
        );
        button.addEventListener("click", () => {
          setLocalStorage("currentUserId", user.id);
          navigate("user-details.html");
        });

        userDiv.appendChild(button);
        usersDiv.appendChild(userDiv);
      });

      container.appendChild(usersDiv);
    })
    .catch((error) => console.error("Error fetching users:", error));
};
