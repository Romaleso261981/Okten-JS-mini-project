window.onload = function () {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched successfully', data)
            const container = document.querySelector('.container');
            container.classList.add('container');

            const userTitle = document.createElement('h1');
            userTitle.classList.add('user-info-mainTitle');
            userTitle.textContent = 'Users:';
            container.appendChild(userTitle);

            const usersDiv = document.createElement('div');
            usersDiv.classList.add('wrapper');

            data.forEach(user => {
                const userDiv = document.createElement('div');

                userDiv.addEventListener('click', () => {
                    localStorage.setItem('currentUserId', JSON.stringify(user.id));
                    window.location.href = 'user-details.html';
                });
                userDiv.classList.add('user');

                const userId = document.createElement('span');
                userId.classList.add('user-info-id');
                userId.textContent = `ID: ${user.id}`;
                userDiv.appendChild(userId);

                const userTitle = document.createElement('h2');
                userTitle.classList.add('user-info-title');
                userTitle.textContent = `Name: ${user.name}`;
                userDiv.appendChild(userTitle);

                const button = document.createElement('button');
                button.classList.add('user-button');
                button.textContent = 'Details';
                button.addEventListener('click', () => {
                    localStorage.setItem('currentUserId', JSON.stringify(user.id));
                    window.location.href = 'user-details.html';
                });

                userDiv.appendChild(button);
                usersDiv.appendChild(userDiv);

            });

            container.appendChild(usersDiv);


        })
        .catch(error => console.error('Error fetching users:', error));
};
