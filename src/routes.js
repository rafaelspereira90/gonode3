const express = require('express')
const routes = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')
const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware) // A partir deste ponto as rotas só podem ser acessadas por users autenticados

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  handle(validate(validators.Ad), controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  handle(validate(validators.Ad), controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

module.exports = routes
