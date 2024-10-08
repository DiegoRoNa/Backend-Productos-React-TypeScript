import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputError } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * FUNCIONABILIDAD DE CADA ENDPOINT
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Not found
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputError, // middleware, para mostrar errores, antes de crear el producto
    getProductById
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Monitor curvo
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid input data
 */
router.post('/', 
    // validar datos vacios
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
                .isNumeric().withMessage('Valor no válido')
                .notEmpty().withMessage('El precio del producto es obligatorio')
                .custom(value => value > 0).withMessage('El precio no puede ser 0 o menor'),
    handleInputError, // middleware, para mostrar errores, antes de crear el producto
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Monitor curvo
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID or invalid input data
 */
router.put('/:id', 
    // validar datos
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
                .isNumeric().withMessage('Valor no válido')
                .notEmpty().withMessage('El precio del producto es obligatorio')
                .custom(value => value > 0).withMessage('El precio no puede ser 0 o menor'),
    body('availability').isBoolean().withMessage('Valor de disponibilidad no es válido'),
    handleInputError, // middleware, para mostrar errores, antes de crear el producto 
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputError, // middleware, para mostrar errores, antes de crear el producto 
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by id
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputError, // middleware, para mostrar errores, antes de crear el producto 
    deleteProduct
)

export default router