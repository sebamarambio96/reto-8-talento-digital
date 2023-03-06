let tokenP = JSON.parse(localStorage.getItem('token'))


fetch(`http://localhost:3000/profile`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'x-access-token': tokenP
    },
})
    .then(response => response.json())
    .then(item => {
        const usernameProfile = document.getElementById('usernameProfile')
        usernameProfile.textContent= item.username
    })
    .catch(err => console.log(err))

