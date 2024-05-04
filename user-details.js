window.onload = function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const userDetails = document.querySelector('.user-details');

        const userId = document.createElement('p');
        userId.classList.add('text');
        userId.textContent = `ID: ${currentUser.id}`;
        userDetails.appendChild(userId);

        const userName = document.createElement('p');
        userName.classList.add('text');
        userName.textContent = `Name: ${currentUser.name}`;
        userDetails.appendChild(userName);

        const userUsername = document.createElement('p');
        userUsername.classList.add('text');
        userUsername.textContent = `Username: ${currentUser.username}`;
        userDetails.appendChild(userUsername);

        const userPhone = document.createElement('p');
        userPhone.classList.add('text');
        userPhone.textContent = `user-phone: ${currentUser.phone ? currentUser.phone : 'N/A'}`;
        userDetails.appendChild(userPhone);

        const userWebsite = document.createElement('p');
        userWebsite.classList.add('text');
        userWebsite.textContent = `user-website: ${currentUser.website ? currentUser.website : 'N/A'}`;
        userDetails.appendChild(userWebsite);

        const userCompanyBs = document.createElement('p');
        userCompanyBs.classList.add('text');
        userCompanyBs.textContent = `user-company-bs: ${currentUser.company.bs ? currentUser.company.bs : 'N/A'}`;
        userDetails.appendChild(userCompanyBs);

        const userCompanyCatchPhrase = document.createElement('p');
        userCompanyCatchPhrase.classList.add('text');
        userCompanyCatchPhrase.textContent = `user-company-catchPhrase: ${currentUser.company.catchPhrase ? currentUser.company.catchPhrase : 'N/A'}`;
        userDetails.appendChild(userCompanyCatchPhrase);

        const userCompanyName = document.createElement('p');
        userCompanyName.classList.add('text');
        userCompanyName.textContent = `user-company-name: ${currentUser.company.name ? currentUser.company.name : 'N/A'}`;
        userDetails.appendChild(userCompanyName);

        const userAddressCity = document.createElement('p');
        userAddressCity.classList.add('text');
        userAddressCity.textContent = `user-address-city: ${currentUser.address.city ? currentUser.address.city : 'N/A'}`;
        userDetails.appendChild(userAddressCity);

        const userAddressStreet = document.createElement('p');
        userAddressStreet.classList.add('text');
        userAddressStreet.textContent = `user-address-street: ${currentUser.address.street ? currentUser.address.street : 'N/A'}`;
        userDetails.appendChild(userAddressStreet);

        const userAddressSuite = document.createElement('p');
        userAddressSuite.classList.add('text');
        userAddressSuite.textContent = `user-address-suite: ${currentUser.address.suite ? currentUser.address.suite : 'N/A'}`;
        userDetails.appendChild(userAddressSuite);

        const userAddressZipcode = document.createElement('p');
        userAddressZipcode.classList.add('text');
        userAddressZipcode.textContent = `user-address-zipcode: ${currentUser.address.zipcode ? currentUser.address.zipcode : 'N/A'}`;
        userDetails.appendChild(userAddressZipcode);

        const userAddressGeoLat = document.createElement('p');
        userAddressGeoLat.classList.add('text');
        userAddressGeoLat.textContent = `user-address-geo(lat): ${currentUser.address.geo.lat ? currentUser.address.geo.lat : 'N/A'}`;
        userDetails.appendChild(userAddressGeoLat);

        const userAddressGeoLng = document.createElement('p');
        userAddressGeoLng.classList.add('text');
        userAddressGeoLng.textContent = `user-address-geo(lng): ${currentUser.address.geo.lng ? currentUser.address.geo.lng : 'N/A'}`;
        userDetails.appendChild(userAddressGeoLng);

        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        userDetails.appendChild(backButton);
    } else {
        // Обробка випадку, коли дані про поточного користувача відсутні в localStorage
        console.error('Current user data not found.');
    }
};