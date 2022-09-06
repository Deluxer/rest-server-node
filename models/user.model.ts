import { DataTypes } from "sequelize";
import database from "../database/connexion";

const User = database.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default User;