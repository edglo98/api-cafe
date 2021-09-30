import User from '../models/user.js'
import { response } from 'express'
import pkg from 'mongoose'
const { Types } = pkg

const validColections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUser = async (term, res = response) => {
  const isMongoId = Types.ObjectId.isValid(term)

  if (isMongoId) {
    const user = await User.findById(term)
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(term, 'i')
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  })

  res.json({
    results: users
  })
}

export const search = (req, res = response) => {
  const { colection, term } = req.params

  if (!validColections.includes(colection)) {
    return res.status(400).json({
      msg: `Colecion no permitida, las colecciones permitidas son: ${validColections}`
    })
  }

  switch (colection) {
    case 'users':
      searchUser(term, res)
      break

    default:
      res.status(500).json({
        msg: 'Validacion faltante. Comunicate con el backend'
      })
      break
  }
}
