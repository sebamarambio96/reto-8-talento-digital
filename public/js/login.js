function login() {
    const btn = document.getElementById('btnSendLogin')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        const data = {
            username,
            password
        }

        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            fetch(`http://localhost:3000/login/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        console.log(res)
                        localStorage.setItem('token', JSON.stringify(res.token))
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Has ingresado correctamente`
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.message}`
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
login()