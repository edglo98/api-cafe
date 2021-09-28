import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq.js'

const routerCategory = Router()

routerCategory.get('/', (req, res) => {
  res.json('ok ok')
})

routerCategory.get('/:id', (req, res) => {
  res.json('ok ok')
})

// privado con cualquier persona con token
routerCategory.post('/', (req, res) => {
  res.json('ok ok')
})

// actualizar privado
routerCategory.put('/:id', (req, res) => {
  res.json('ok ok')
})

// actualizar privado
routerCategory.delete('/:id', (req, res) => {
  res.json('ok ok')
})

export default routerCategory
