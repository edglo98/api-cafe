import { response } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const getUser = (req, res = response) => {
  const { q = '' } = req.query

  res.json({
    msg: 'get api',
    q
  })
}

export const putUser = async (req, res = response) => {
  const { id } = req.params
  // eslint-disable-next-line camelcase
  const { password, google_auth, email, ...rest } = req.body

  if (password) {
    const salt = bcryptjs.genSaltSync() // tipo de encriptado
    rest.password = bcryptjs.hashSync(password, salt) // metodo para encriptar
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.status(400).json({
    msg: 'put api',
    user
  })
}

export const postUser = async (req, res = response) => {
  const { name, email, password, rol } = req.body
  const user = new User({ name, email, password, rol })

  const salt = bcryptjs.genSaltSync() // tipo de encriptado
  user.password = bcryptjs.hashSync(password, salt) // metodo para encriptar

  await user.save()

  res.status(201).json({
    user
  })
}

export const deleteUser = (req, res = response) => {
  res.json({
    msg: 'delete api'
  })
}
