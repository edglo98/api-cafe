import { Router } from 'express'
import { deleteUser, getUser, postUser, putUser } from '../controllers/user.js'

const routerUser = Router()

routerUser.get('/', getUser)

routerUser.put('/:id', putUser)

routerUser.post('/', postUser)

routerUser.delete('/', deleteUser)

export default routerUser
