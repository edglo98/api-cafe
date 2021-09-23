import { response } from 'express'
import User from '../database/user.js'
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator'

export const getUser = (req, res = response) => {
  const { q = '' } = req.query

  res.json({
    msg: 'get api',
    q
  })
}

export const putUser = (req, res = response) => {
  const { id } = req.params

  res.status(400).json({
    msg: 'put api',
    id
  })
}

export const postUser = async (req, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  const { name, email, password, rol } = req.body
  const user = new User({ name, email, password, rol })

  const existeEmail = await User.findOne({ email })

  if (existeEmail) {
    return res.status(400).json({
      msg: 'Email has already been taken'
    })
  }

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
