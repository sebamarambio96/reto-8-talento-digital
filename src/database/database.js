import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('reto 8', 'postgres', 'cerezasazules98', {
    host: 'localhost',
    dialect: 'postgres'
})