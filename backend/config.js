require('dotenv').config()

const common = require('../config')
const azure = require('./utils/azure')
const aws = require('./utils/aws')

const config = {
  USERS_ROUTE: common.USERS_ROUTE,
  LOGIN_ROUTE: common.LOGIN_ROUTE,
  ITEMS_ROUTE: common.ITEMS_ROUTE,
  BY_ID: common.BY_ID,
  BY_NAME: common.BY_NAME,
  BY_USERID: common.BY_USERID,
  BY_USERNAME: common.BY_USERNAME,
  BY_USER: common.BY_USER,
  BY_ADMIN: common.BY_ADMIN,
  BY_CART: common.BY_CART,
  BY_AVAILABLE: common.BY_AVAILABLE,
  BY_OCCUPIED: common.BY_OCCUPIED,
  BY_ID_ADMIN: common.BY_ID_ADMIN,
  BY_ID_OCCUPIED: common.BY_ID_OCCUPIED,
  ADMIN_ROLE: common.ADMIN_ROLE,
  USER_ROLE: common.USER_ROLE,
  OWNER_ROLE: common.OWNER_ROLE,
}

config.init = async () => {
  config.NODE_ENV = process.env.NODE_ENV
  config.NODE_ENV_PRD = 'prod'
  config.NODE_ENV_TST = 'test'
  config.NODE_ENV_DEV = 'dev'

  config.PORT = process.env.PORT || 3000

  config.PLATFORM = process.env.PLATFORM
  config.PLATFORM_AZURE = 'azure'
  config.PLATFORM_AWS = 'aws'

  if (config.PLATFORM === config.PLATFORM_AZURE) {
    config.MONGO_URL = await azure.getSec('DB-URL')
    config.SECRET = await azure.getSec('SECRET')
    config.SALT = await azure.getSec('SALT')
    config.SALT = Number(config.SALT)
    config.ADMIN_INITIAL_USERNAME = await azure.getSec('ADMIN-INITIAL-USERNAME')
    config.ADMIN_INITIAL_PASSWORD = await azure.getSec('ADMIN-INITIAL-PASSWORD')
    console.log(config.MONGO_URL)
    console.log(config.SECRET)
    console.log(config.SALT)
    console.log(config.ADMIN_INITIAL_USERNAME)
    console.log(config.ADMIN_INITIAL_PASSWORD)
    return
  }

  if (config.PLATFORM === config.PLATFORM_AWS) {
    config.MONGO_URL = await aws.getSec('app/DB_URL')
    config.SECRET = await aws.getSec('app/SECRET')
    config.SALT = await aws.getSec('app/SALT')
    config.SALT = Number(config.SALT)
    config.ADMIN_INITIAL_USERNAME =
      await aws.getSec('app/ADMIN_INITIAL_USERNAME')
    config.ADMIN_INITIAL_PASSWORD =
      await aws.getSec('app/ADMIN_INITIAL_PASSWORD')
    return
  }

  config.MONGO_URL =
    config.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL
  config.SECRET = process.env.SECRET
  config.SALT = Number(process.env.SALT)
  config.ADMIN_INITIAL_USERNAME = process.env.ADMIN_INITIAL_USERNAME
  config.ADMIN_INITIAL_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD
}

module.exports = config
