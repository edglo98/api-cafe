import express from 'express'
import cors from 'cors'
import routerUser from '../routes/user.js'
import dbConection from '../database/config.js'
export class Server {
  constructor () {
    this.port = process.env.PORT
    this.app = express()

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
    this.app.use('/api/users', routerUser)
  }

  async getLocalIp () {
    return import('os')
      .then((os) => {
        const networkInterfaces = os.networkInterfaces()
        return networkInterfaces.en0[1].address
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
