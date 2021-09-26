import jwt from 'jsonwebtoken'

export const validateJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No autorizado, hace falta un token.'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY)

    req.uid = uid
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      msg: 'Token no válido'
    })
  }
}
