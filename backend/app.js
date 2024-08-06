const express = require('express')
const mongoose = require('mongoose')

require('express-async-errors')

const config = require('./config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const routerUsers = require('./controllers/users')
const routerLogin = require('./controllers/login')
const routerItems = require('./controllers/items')

const app = express()

const init = async () => {
  await config.init()

  mongoose.set('strictQuery', false)
  logger.info(
    'connecting to',
    config.NODE_ENV !== config.NODE_ENV_PRD ? config.MONGO_URL : 'database'
  )

  await mongoose.connect(config.MONGO_URL)
  logger.info('connected')

  app.use(express.static('dist'))
  app.use(express.json())

  app.use(middleware.loggerReq)

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/version', (req, res) => {
    res.send('0')
  })

  app.use(config.USERS_ROUTE, routerUsers)
  app.use(config.LOGIN_ROUTE, routerLogin)
  app.use(config.ITEMS_ROUTE, routerItems)

  app.use(middleware.endpointUnknown)
  app.use(middleware.handlerErr)
}

module.exports = {
  app,
  init,
}
