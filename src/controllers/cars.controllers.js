import { Cars } from "../models/Cars.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET all cars
export async function getCars(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const cars = await Cars.findAll()
        res.status(200).json(cars)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET one car
export async function getCar(req, res) {
    const { id } = req.params
    try {
        const car = await Cars.findOne({
            where: {
                id
            }
        })
        if (!car) return res.status(404).json({ message: 'Este auto no existe' })

        res.status(200).json(car)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ADD new car
export async function addCar(req, res) {
    const { brand, model, year } = req.body
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No estás autorizado'
        })
    }
    const decoded = jwt.verify(token, secret)
    const { id } = decoded
    try {
        const newCar = await Cars.create({
            id_user: id,
            brand,
            model,
            year
        })
        res.status(201).json({auth:true, newCar})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//MODIFY a car
export async function updateCar(req, res) {
    try {
        const { id } = req.params
        const { brand, model, year } = req.body
        const token = req.headers["x-access-token"]
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        const idUser = decoded.id
        //buscamos el objeto que necesitamos
        const car = await Cars.findByPk(id)
        if (!car) return res.status(404).json({ message: 'Este auto no existe' })
        if (idUser !== parseInt(car.id_user)) return res.status(401).json({ message: 'Este auto no te pertenece' })
        car.brand = brand
        car.model = model
        car.year = parseInt(year)
        console.log(car)
        //guardamos el objeto modificado
        await car.save()
        res.status(200).json({auth:true, car})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


//DELETE a car
export async function deleteCar(req, res) {
    try {
        const { id } = req.params
        const token = req.headers["x-access-token"]
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        const idUser = decoded.id
        const car = await Cars.findByPk(id)
        if (!car) return res.status(404).json({ message: 'Este auto no existe'})
        if (idUser !== parseInt(car.id_user)) return res.status(401).json({ message: 'Este auto no te pertenece' })
        //busca y elimina el dato deseado
        const deleteCar = await Cars.destroy({
            where: {
                id
            }
        })
        console.log(deleteCar)
        //204 no develve nada pero todo fue bien
        res.status(200).json({auth:true, deleteCar})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}









