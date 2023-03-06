import { Router } from "express";
import { getCars, getCar, updateCar, addCar, deleteCar } from "../controllers/cars.controllers.js";

const router = Router()


//GET all products
router.get('/cars', getCars)

//GET one product
router.get('/cars/:id', getCar)

//ADD new product
router.post('/cars',addCar)

//MODIFY a product
router.put('/cars/:id', updateCar)

//DELETE a product
router.delete('/cars/:id', deleteCar)


export default router