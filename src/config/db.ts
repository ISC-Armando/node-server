import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Cambiado a true
      rejectUnauthorized: false // Esto evita que se rechacen certificados no autorizados
    }
  }
});

export default db;