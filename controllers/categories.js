import { response } from 'express'
import Category from '../models/category.js'

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
  ])

  res.json({
    total,
    categories
  })
}
// obtener categoria populate {}

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

  const category = new Category(data)

  await category.save()

  res.status(201).json(category)
}

// actualizar categoria solo nombre

// borrar categoria- estado en false
