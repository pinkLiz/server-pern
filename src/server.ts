import express from "express";

import router from "./router"
import db from "./config/db"

import colors from "colors";

import {methods} from "./middleware/methods"

import swaggerSpec , {swaggerUiOptions} from "./config/swagger";
import swaggerui from 'swagger-ui-express'


export async function connectionDB() {
    try{
        await db.authenticate()
        db.sync();
        console.log(colors.cyan.bold("Conexion exitosa"));
    }catch (error){
        console.log(error);
        console.log(colors.white.bgRed.bold("Hubo un error al conectar"));
    
    }
    
}

connectionDB();

//instancia del servidor
const server = express()
//Leer datos de formularios
server.use(express.json())

server.use(methods);

server.use('/api/products',router)

server.use('/docs', swaggerui.serve, swaggerui.setup(swaggerSpec,swaggerUiOptions))

export default server
