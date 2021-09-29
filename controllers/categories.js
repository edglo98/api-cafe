import { response } from 'express'
import Category from '../models/category.js'

const populateUser = {
  path: 'user',
  select: '-google_auth -status'
  // match: { status: true }
}
// obtener categorias paginado total populate
export const getCategories = async (req, res = response) => {
  const rules = { status: true }
  const { limit = 5, from = 0 } = req.query

  if (isNaN(Number(limit)) || isNaN(Number(from))) {
    return res.status(400).json({
      msg: 'Los parametros limit/from deben ser numeros'
    })
  }

  const [total, categories] = await Promise.all([
    Category.countDocuments(rules),
    Category.find(rules)
      .skip(Number(from))
      .limit(Number(limit))
      .populate(populateUser)
  ])

  res.json({
    total,
    categories
  })
}
// obtener categoria populate {}
export const getCategory = async (req, res = response) => {
  const { id } = req.params

  const category = await Category.findOne({ id })
    .populate(populateUser)

  res.json(category)
}

export const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria: ${name}, ya existe.`
    })
  }

  const data = {
    name,
    user: req.user._id
  }

  let category = new Category(data)

  await category.save()

  category = await category.populate(populateUser)

  res.status(201).json(category)
}

// actualizar categoria solo nombre
export const updateCategory = async (req, res = response) => {
  const { id } = req.params
  const { name } = req.body

  const category = await Category
    .findOneAndUpdate(id, { name }, { new: true })
    .populate(populateUser)

  res.status(202).json(category)
}

// borrar categoria- estado en false
export const deleteCategory = async (req, res = response) => {
  const { id } = req.params

  const category = await Category
    .findOneAndUpdate(id, { status: false }, { new: true })
    .populate(populateUser)

  res.status(202).json(category)
}
