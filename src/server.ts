import express from "express"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import SwaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import colors from "colors"
import router from "./router"
import db from "./config/db"

// Conectar a la BD
export async function connectDB() {
    try {
        db.authenticate() // verifica la conexion a la BD
        db.sync() // mantiene acutlaizada la BD
        // console.log(colors.blue.bold('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()

// levanta servidor de express
const server = express()

// PERMITIR CONEXIONES CON LOS CORS
const corsOptions : CorsOptions = {
    // QUE ES LO QUE ME ESTÁ ENVIANDO LA PETICION
    origin: function(origin, callback) { // origin, es el dominio origen de la peticion. callback, configura los permisos
        
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true) // permitir la conexion
        } else {
            callback(new Error('Conexión denegada por CORS'))
        }

    }
}

// endpoint de los cors
server.use(cors(corsOptions))

// LEER DATOS DE LOS FORMULARIOS
server.use(express.json())

// obtener más información de las peticiones con morgan
server.use(morgan('dev')) // tiene varios tipos de info, dev es una

/**
 * ROUTING
 * Si se quiere modificar un endpoint, es en este archivo, no es necesario cambiarlas
 * en router.ts
 */
server.use('/api/products', router)

// Documentacion 
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUIOptions))

export default server