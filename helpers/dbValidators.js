import Role from '../models/role.js'
import User from '../models/user.js'

export const isValidRole = async (rol = '') => {
  const isValidRole = await Role.findOne({ rol })
  if (!isValidRole) throw new Error(`El rol: ${rol} no existe en la base de datos.`)
}

export const isEmailTaked = async (email) => {
  const existeEmail = await User.findOne({ email })
  if (existeEmail) throw new Error('Email has already been taken')
}
