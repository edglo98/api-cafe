import { Router } from 'express'
import { loadFile } from '../controllers/uploads.js'
import { validateJWT } from '../middlewares/validateJWT.js'
import { validateReq } from '../middlewares/validateReq.js'

const routerUpload = Router()

routerUpload.post('/', [
  validateJWT,
  validateReq
], loadFile)

// routerUpload.put('/:colection/:id', [
//   validateJWT,
//   validateReq
// ], loadFile)

export default routerUpload
