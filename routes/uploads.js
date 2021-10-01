import { Router } from 'express'
import { check } from 'express-validator'
import { loadFile, updateAndLoadFile } from '../controllers/uploads.js'
import { validateColection } from '../helpers/dbValidators.js'
import { existFile } from '../middlewares/validateFile.js'
import { validateJWT } from '../middlewares/validateJWT.js'
import { validateReq } from '../middlewares/validateReq.js'

const routerUpload = Router()

routerUpload.post('/', [
  validateJWT,
  existFile,
  validateReq
], loadFile)

routerUpload.put('/:colection/:id', [
  validateJWT,
  existFile,
  check('id').isMongoId(),
  check('colection').custom(colection => validateColection(colection, ['users', 'products'])),
  validateReq
], updateAndLoadFile)

export default routerUpload
