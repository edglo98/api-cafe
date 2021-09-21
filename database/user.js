import pkg from 'mongoose'
const { Schema, model } = pkg

const UserScheme = Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  email: {
    type: String,
    require: [true, 'Email is require'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'Password is require']
  },
  image: {
    type: String
  },
  rol: {
    type: String,
    require: [true, 'Rol is require'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google_auth: {
    type: Boolean,
    default: false
  }
})

export default model('User', UserScheme)
