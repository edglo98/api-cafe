import { Router } from 'express'
import { check } from 'express-validator'
import { deleteUser, getUser, postUser, putUser } from '../controllers/user.js'

const routerUser = Router()

routerUser.get('/', getUser)

routerUser.put('/:id', putUser)

routerUser.post('/', [
  check('email', 'Correo no valido').isEmail()
], postUser)

routerUser.delete('/', deleteUser)

export default routerUser
