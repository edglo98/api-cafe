import { response } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../helpers/generateJWT.js'

export const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario no encontrado, verifique el correo.'
      })
    }

    if (!user.status) {
      return res.status(400).json({
        msg: 'Usuario desahabilitado.'
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Contraseña invalida o erronea.'
      })
    }

    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Comuniquese con el administrador.'
    })
  }
}
