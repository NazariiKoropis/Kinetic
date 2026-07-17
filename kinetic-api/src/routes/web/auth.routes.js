import { login, logout, refresh, register } from '#controllers/auth.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { userLoginSchema, userRegisterSchema } from '#schemas/user.schema.js'
import express from 'express'

const authWebRouter = express.Router()

authWebRouter.post('/register', validateBody(userRegisterSchema), register)
authWebRouter.post('/login', validateBody(userLoginSchema), login)
authWebRouter.post('/logout', logout)
authWebRouter.post('/refresh', refresh)

export default authWebRouter
