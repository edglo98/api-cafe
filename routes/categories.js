import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq.js'

const routerCategory = Router()

routerCategory.get('/', (req, res) => {
  console.log('ok ok ')
})

export default routerCategory
