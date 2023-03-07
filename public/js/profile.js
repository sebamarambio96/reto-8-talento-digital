let tokenP = JSON.parse(localStorage.getItem('token'))
const imgProductDB = document.getElementById('imgProductDB')

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
        imgProductDB.src = `../img/uploads/${item.imgUrl}`
    })
    .catch(err => console.log(err))


//Upload img
function upload() {
    const btn = document.getElementById('uploudImg')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let fd = new FormData();
        fd.append("profileImg", document.getElementById("profileImg").files[0]);
        fetch('http://localhost:3000/imgUpload', {
            method: 'POST',
            headers: {
                'x-access-token': tokenP
            },
            body: fd
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has cambiado tu imagen de perfil`
                    })
                    /* location.reload(); */
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.message}`
                    })
                }
            })
    }
    )
}
upload()