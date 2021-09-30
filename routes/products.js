import { Router } from 'express'
import { check } from 'express-validator'
import { createProduct, getProducts } from '../controllers/products.js'
import { validateJWT } from '../middlewares/validateJWT.js'
import { validateReq } from '../middlewares/validateReq.js'
import { isIdOfCategory, isProductTaked } from '../helpers/dbValidators.js'

const routerProducts = Router()

routerProducts.get('/', getProducts)

// routerProducts.get('/:id', [
//   check('id', 'El id debe ser un id valida').isMongoId().custom(isIdOfProducts),
//   validateReq
// ], getProducts)

routerProducts.post('/', [
  validateJWT,
  check('name', 'El nombre es obligatorio')
    .not()
    .isEmpty()
    .bail()
    .custom(isProductTaked),
  check('category', 'La categoria id es obligatoria')
    .not()
    .isEmpty()
    .bail()
    .isMongoId()
    .bail()
    .custom(isIdOfCategory),
  validateReq
], createProduct)

// // actualizar privado
// routerProducts.put('/:id', [
//   validateJWT,
//   check('id', 'El id debe ser un id valida').isMongoId().custom(isIdOfProducts),
//   check('name', 'El nombre es requerido').not().isEmpty().custom(isProductsTaked),
//   validateReq
// ], updateProducts)

// // actualizar privado
// routerProducts.delete('/:id', [
//   validateJWT,
//   // haveRol('ADMIN_ROLE'),
//   isAdminRol,
//   check('id', 'El id debe ser un id valida').isMongoId().custom(isIdOfProducts),
//   validateReq
// ], deleteProducts)

export default routerProducts
