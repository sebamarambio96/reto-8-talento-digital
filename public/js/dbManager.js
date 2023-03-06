const containerForm = document.getElementById('containerForm')
const templateAdd = document.getElementById('templateAddProduct').content;
const templateModify = document.getElementById('templateModifyProduct').content;
const templateDelete = document.getElementById('templatDeleteProduct').content;
const fragmentForm = document.createDocumentFragment()

//listen buttons to RENDER selected form
renderFormAdd()
renderFormModify()
renderFormDelete()

//Functions

function modifySearch() {
    const btn = document.getElementById('btnModifySearch')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.getElementById('idModify').value
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }

        fetch(`http://localhost:3000/cars/${id}`)
            .then((resp) => resp.json())
            .then(data => {
                const car = data
                let brandModify = templateModify.getElementById('brandModify')
                let modelModify = templateModify.getElementById('modelModify')
                let yearModify = templateModify.getElementById('yearModify')
                brandModify.value = car.brand
                modelModify.value = car.model
                yearModify.value = car.year
                const clone = templateModify.cloneNode(true)
                fragmentForm.appendChild(clone)
                containerForm.appendChild(fragmentForm)
                modifySearch()
                modifySend(car.id)
            })
    })
}

function modifySend(id) {
    const btn = document.getElementById('btnModifySend')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let brand = document.getElementById('brandModify').value
        let model = document.getElementById('modelModify').value
        let year = document.getElementById('yearModify').value
        const data = {
            brand,
            model,
            year
        }
        console.log(data)
        let token = JSON.parse(localStorage.getItem('token'))
        console.log(token)
        fetch(`http://localhost:3000/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has modificado tu auto correctamente`
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.message}`
                    })
                }
            }
            )
    })
}

function addSend() {
    const btn = document.getElementById('btnModifySend')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let brand = document.getElementById('brand').value
        let model = document.getElementById('model').value
        let year = document.getElementById('year').value
        const data = {
            brand,
            model,
            year
        }
        let token = JSON.parse(localStorage.getItem('token'))
        fetch(`http://localhost:3000/cars/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has agregado tu auto correctamente`
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.message}`
                    })
                }
            }
            )
    })
}

function deleteSend() {
    const btn = document.getElementById('btnModifySend')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const id = document.getElementById('idModify').value
        /* while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        } */
        let token = JSON.parse(localStorage.getItem('token'))
        fetch(`http://localhost:3000/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has eliminado tu auto correctamente`
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.message}`
                    })
                }
            }
            )
    })
}


function renderFormAdd() {
    const btn = document.getElementById('btnRenderAdd')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateAdd.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        addSend()
    })
}

function renderFormModify() {
    const btn = document.getElementById('btnRenderModify')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateModify.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        modifySearch()
    })
}

function renderFormDelete() {
    const btn = document.getElementById('btnRenderDelete')
    btn.addEventListener('click', () => {
        while (containerForm.firstChild) {
            containerForm.removeChild(containerForm.firstChild);
        }
        const clone = templateDelete.cloneNode(true)
        fragmentForm.appendChild(clone)
        containerForm.appendChild(fragmentForm)
        deleteSend()
    })
}


//Cars
function renderCars() {
    const btn = document.getElementById('btnCarsAll')
    btn.addEventListener('click', () => {

        fetch(`http://localhost:3000/cars`)
            .then((resp) => resp.json())
            .then(data => {
                const containerCard = document.getElementById('containerCard')
                while (containerCard.firstChild) {
                    containerCard.removeChild(containerCard.firstChild);
                }
                const fragmentTable = document.createDocumentFragment()
                const templateTable = document.getElementById('templateTable').content;
                const clone = templateTable.cloneNode(true)
                fragmentTable.appendChild(clone)
                containerCard.appendChild(fragmentTable)

                const containerCars = document.getElementById('carsData')
                const fragmentRows = document.createDocumentFragment()

                const templateRows = document.getElementById('templateRows').content;
                data.map(item => {
                    let t1 = templateRows.getElementById('1')
                    let t2 = templateRows.getElementById('2')
                    let t3 = templateRows.getElementById('3')
                    let t4 = templateRows.getElementById('4')
                    let t5 = templateRows.getElementById('5')
                    let t6 = templateRows.getElementById('6')
                    t1.textContent = item.id
                    t2.textContent = item.id_user
                    t3.textContent = item.brand
                    t4.textContent = item.model
                    t5.textContent = item.year
                    t6.textContent = item.createdAt

                    const clone = templateRows.cloneNode(true)
                    fragmentRows.appendChild(clone)
                })
                containerCars.appendChild(fragmentRows)
            })
    })
}
renderCars()
