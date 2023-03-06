import express from "express";
import htmlRoutes from "./src/routes/html.routes.js";
import carsRoutes from "./src/routes/cars.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from 'cors';

const app = express()

//middlewares
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(htmlRoutes)
app.use(carsRoutes)
app.use(userRoutes)




export default app
