import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.js'
import { validateReq } from '../middlewares/validateReq.js'

const routerUser = Router()

export default routerUser.post('/login', [
  check('email', 'Email es obligatorio').isEmail(),
  check('password', 'Password es obligatorio').not().isEmpty(),
  validateReq
], login)
