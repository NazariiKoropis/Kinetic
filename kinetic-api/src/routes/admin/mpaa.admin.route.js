import { updateMPAA } from '#controllers/mpaa.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { mpaaSchema } from '#schemas/mpaa.schema.js'
import express from 'express'

const mpaaAdminRouter = express.Router()

mpaaAdminRouter.put('/:id', validateBody(mpaaSchema), updateMPAA)

export default mpaaAdminRouter

