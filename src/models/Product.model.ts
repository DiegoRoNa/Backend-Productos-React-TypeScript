import { Table, Column, Model, DataType, Default } from "sequelize-typescript"

/**
 * MODELO DE PRODUCTO
 */

// los decoradores deben empezar con @

// Nombre de la tabla
@Table({
    tableName: 'products'
})

// Clase principal de la tabla, que heredará todos los atributos de Model
class Product extends Model {
    // Columnas de la tabla
    @Column({ type: DataType.STRING(100) }) // tipo de dato de la columna
    declare name: string // schema

    @Column({ type: DataType.FLOAT }) // tipo de dato de la columna
    declare price: number // schema

    @Default(true) // valor por default para la columna "availability"
    @Column({ type: DataType.BOOLEAN }) // tipo de dato de la columna
    declare availability: boolean // schema
}

export default Product