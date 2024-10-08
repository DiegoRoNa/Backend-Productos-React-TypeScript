import { connectDB } from "../server"
import db from "../config/db"

// Test para caer en el catch de la conexion a la BD
jest.mock('../config/db')

describe('connectDB', () => {
    it('Should handle database connection error', async() => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})













// describe('Mi primer test', () => { // nombre del TEST y su funcion
//     it('Verificar que 1 + 1 sea igual a 2', () => { // Nombre de la prueba de qué es lo que debe revisar
//         expect(1 + 1).toBe(2) // expect toma los parametros y toBe toma el valor esperado
//     })

//     it('Verificar que 1 + 1 no sea igual a 3', () => {
//         expect(1 + 1).not.toBe(3)
//     })
// }) 