import Category from '../models/category.js'
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

export const isIdOfUser = async (id) => {
  const existeUser = await User.findById(id)
  if (!existeUser) throw new Error(`Usuario no encontrado, verifique el id: ${id}`)
}

export const isIdOfCategory = async (id) => {
  const existsCategory = await Category.findById(id)
  if (!existsCategory) throw new Error(`Categoria no encontrado, verifique el id: ${id}`)
}

export const isCategoryTaked = async (name = '') => {
  const existsCategory = await Category.findOne({ name })
  if (existsCategory) throw new Error(`La categoria: ${name} ya existe.`)
}
