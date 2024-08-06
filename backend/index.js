const config = require('./config')
const logger = require('./utils/logger')
const app = require('./app')

;(async () => {try {
  await app.init()
  app.app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })

} catch (err) {
  logger.error(`${err.name}: ${err.message}`)
}})()
