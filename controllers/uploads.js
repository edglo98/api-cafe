import { response } from 'express'
import { uploadFile } from '../helpers/uploadFile.js'
import User from '../models/user.js'
import Product from '../models/product.js'

export const loadFile = async (req, res = response) => {
  try {
    const nombre = await uploadFile(req.files, [
      'png',
      'jpg',
      'jpeg',
      'gif'
    ], '')
    res.json({ nombre })
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ error: err.message })
  }
}

export const updateAndLoadFile = async (req, res = response) => {
  const { colection, id } = req.params

  let model
  switch (colection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No exciste un usuario con el id: ${id}`
        })
      }
      break
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No exciste un producto con el id: ${id}`
        })
      }
      break

    default:
      return res.status(500).json({
        msg: 'No hay validacion de modelo, error interno'
      })
  }
  const nombre = await uploadFile(req.files, undefined, colection)
  model.image = colection + '/' + nombre

  model.save()

  res.json(model)
}
