import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'

//conexion a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync()
    console.log(colors.magenta("Connection has been established successfully."));
  } catch (error) {
    console.error(colors.bgRed.white("Unable to connect to the database:"), error);
  }
}

connectDB()

//instacia de express
const server = express()

//permitir conexxiones
const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true)
    }
    else {
      callback(new Error("No permitido por CORS"))
    }
  }
}
server.use(cors(corsOptions))

server.use(express.json())

//morgan
server.use(morgan("combined"))

//leear datos de formularios
server.use('/api/products', router)

//Docs
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server