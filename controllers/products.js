import { response } from 'express'
import Product from '../models/product.js'

const populateUser = {
  path: 'user',
  select: '-google_auth -status'
}
const populateCategory = {
  path: 'category',
  select: '-status'
}

export const getProducts = async (req, res = response) => {
  const rules = { status: true }
  const { limit = 5, from = 0 } = req.query

  if (isNaN(Number(limit)) || isNaN(Number(from))) {
    return res.status(400).json({
      msg: 'Los parametros limit/from deben ser numeros'
    })
  }

  const [total, categories] = await Promise.all([
    Product.countDocuments(rules),
    Product.find(rules)
      .skip(Number(from))
      .limit(Number(limit))
      .populate([populateUser, populateCategory])
  ])

  res.json({
    total,
    categories
  })
}

export const createProduct = async (req, res = response) => {
  const { status, user, ...data } = req.body
  data.user = req.user._id

  let product = new Product(data)
  await product.save()

  product = await product
    .populate([populateUser, populateCategory])

  res.status(201).json(product)
}
