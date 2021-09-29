import { Router } from 'express'
import { check } from 'express-validator'
import { createCategory, getCategories } from '../controllers/categories.js'
import { validateJWT } from '../middlewares/validateJWT.js'
import { validateReq } from '../middlewares/validateReq.js'

const routerCategory = Router()

routerCategory.get('/', getCategories)

routerCategory.get('/:id', (req, res) => {
  res.json('ok ok')
})

// privado con cualquier persona con token
routerCategory.post('/', [
  validateJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validateReq
], createCategory)

// actualizar privado
routerCategory.put('/:id', (req, res) => {
  res.json('ok ok')
})

// actualizar privado
routerCategory.delete('/:id', (req, res) => {
  res.json('ok ok')
})

export default routerCategory
