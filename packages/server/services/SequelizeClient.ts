import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { dbHost, dbUser, dbPassword, dbName } from "../env";

const sequelizeOptions: SequelizeOptions = {
    database: dbName,
    dialect: "postgres",
    host: dbHost,
    logging: false,
    models: [__dirname + "../models/**.ts"],
    password: dbPassword,
    username: dbUser
};

const connection = new Sequelize(sequelizeOptions);

export default connection;
