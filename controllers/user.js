import { response } from 'express'
import User from '../database/user.js'
import bcryptjs from 'bcryptjs'

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
  const { name, email, password, rol } = req.body
  const user = new User({ name, email, password, rol })

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

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
