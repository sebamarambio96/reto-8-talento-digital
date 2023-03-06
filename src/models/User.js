import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";
import { Cars } from "./Cars.js";


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
}
)

// Class Method
User.encryptPass = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
};

User.validatePass = async function (pass, passDB) {
    return bcrypt.compare(pass, passDB)
};

User.hasMany(Cars, {
    foreignKey: 'id_user',
    sourceKey: 'id',
})

Cars.belongsTo(User, {
    foreignKey: 'id_user',
    sourceKey: 'id'
})