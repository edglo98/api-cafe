import express from 'express'
import cors from 'cors'
import dbConection from '../database/config.js'
import routerUser from '../routes/user.js'
import routerAuth from '../routes/auth.js'
import routerCategory from '../routes/categories.js'
import routerProducts from '../routes/products.js'
import routerSearch from '../routes/search.js'
export class Server {
  constructor () {
    this.port = process.env.PORT
    this.app = express()

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search'
    }

    this.conectDB()

    this.middlewares()
    this.routes()
  }

  async conectDB () {
    await dbConection()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.paths.auth, routerAuth)
    this.app.use(this.paths.users, routerUser)
    this.app.use(this.paths.categories, routerCategory)
    this.app.use(this.paths.products, routerProducts)
    this.app.use(this.paths.search, routerSearch)
  }

  async getLocalIp () {
    return import('os')
      .then((os) => {
        const networkInterfaces = os.networkInterfaces()
        return networkInterfaces.en0[0].address
      })
  }

  listen () {
    console.clear()
    this.app.listen(this.port, () => {
      console.log(' -------------------------------------------------')
      console.log(`|  💻 Server runing on port ${this.port}.                 |`)
      console.log(`|  You can watch here: http://localhost:${this.port}/     |`)
    })

    // Run local server
    if (process.env.NODE_ENV === 'development') {
      this.getLocalIp()
        .then(ip => (
          this.app.listen(this.port, ip, () => {
            console.log('|                                                 |')
            console.log('|  📡 Server runing on local network.             |')
            console.log(`|  You can watch here: http://${ip}:${this.port}/  |`)
            console.log(' ------------------------------------------------- ')
          })
        ))
    }
  }
}
