import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleInputError = (request : Request, response : Response, next : NextFunction) : void => {
    
    // tomar errores
    let errors = validationResult(request)

    // mandar respuesta de error
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() })
        return
    }

    // ejecutamos la siguiente funcion o middleware
    next()
}