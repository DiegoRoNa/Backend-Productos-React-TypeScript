import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async() => {
    try {
        await db.sync({force: true}) // limpia la BD
        console.log('Base de datos limpia')
        exit()

    } catch (error) {
        console.log(error)
        exit(1) // el 1, indica que es una finalizacion con errores
    }
}

// valida si el comando que ejecutamos en consola, sea el de clear dbs
// comando "npm run db"
// la posicion 2 corresponte a --clear
// porque cada argumento del comando es una posicion del array "process.argv"
// "pretest": "tsx ./src/data --clear"
if (process.argv[2] === '--clear') {
    clearDB()
}