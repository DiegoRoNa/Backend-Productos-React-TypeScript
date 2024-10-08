import { Request, Response } from "express"
import Product from "../models/Product.model"
import colors from "colors"

export const getProducts = async (request : Request, response : Response) : Promise<void> => {
    // obtener todos los productos
    const products = await Product.findAll({
        order: [
            ['price', 'DESC']
        ]
    })
    response.json({data: products})
}

export const getProductById = async (request : Request, response : Response) : Promise<void> => {
    // tomar id de la url
    const { id } = request.params

    // buscar el producto
    const product = await Product.findByPk(id)

    // si el producto no existe
    if (!product) {
        response.status(400).json({
            error: 'Producto no encontrado'
        })
        return
    }

    response.json({data: product})
}

export const createProduct = async (request : Request, response : Response) : Promise<void> => {

    // instanciar el modelo Product y guardar en la BD
    const product = await Product.create(request.body)

    // retornamos respuesta
    response.status(201).json({ data: product })
}

/**
 * PUT, actualiza por completo el obj existente con el nuevo obj que mandemos
 */
export const updateProduct = async (request : Request, response : Response) : Promise<void> => {
    // tomar id de la url
    const { id } = request.params

    // buscar el producto
    const product = await Product.findByPk(id)

    // si el producto no existe
    if (!product) {
        response.status(400).json({
            error: 'Producto no encontrado'
        })
        return
    }

    // actualizar obj del producto
    // con update, evitamos ese reemplazo de PUT y actualiza sin afectar los demas datos del obj
    await product.update(request.body) // en request.body, se encuentra lo que llega del form

    // guardar en la BD
    await product.save()
    
    response.json({data: product})

}

/**
 * PATCH, modifica lo que le mandes unicamente, sin modificar los demas datos del obj
 */
export const updateAvailability = async (request : Request, response : Response) : Promise<void> => {
    // tomar id de la url
    const { id } = request.params

    // buscar el producto
    const product = await Product.findByPk(id)

    // si el producto no existe
    if (!product) {
        response.status(400).json({
            error: 'Producto no encontrado'
        })

        return
    }

    // modificar la disponibilidad
    // tomamos la disponibilidad actual del producto y le colocamos lo contrario
    product.availability = !product.dataValues.availability

    // guardar en la BD
    await product.save()
    
    response.json({data: product})

}

export const deleteProduct = async (request : Request, response : Response) : Promise<void> => {
    // tomar id de la url
    const { id } = request.params

    // buscar el producto
    const product = await Product.findByPk(id)

    // si el producto no existe
    if (!product) {
        response.status(400).json({
            error: 'Producto no encontrado'
        })

        return
    }

    // borrar producto
    await product.destroy()
    
    response.json({data: 'Producto eliminado'})

}
