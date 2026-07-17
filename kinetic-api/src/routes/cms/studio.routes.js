import { createStudio, deleteStudio, getStudiosAdmin, updateStudio } from '#controllers/studio.controller.js'
import { validateBody, validateQuery } from '#middlewares/validator.middleware.js'
import { createStudioSchema, getStudiosAdminSchema, updateStudioSchema } from '#schemas/studio.schema.js'
import express from 'express'

const studioCmsRouter = express.Router()

studioCmsRouter.get('/', validateQuery(getStudiosAdminSchema), getStudiosAdmin)
studioCmsRouter.post('/', validateBody(createStudioSchema), createStudio)
studioCmsRouter.put('/:id', validateBody(updateStudioSchema), updateStudio)
studioCmsRouter.delete('/:id', deleteStudio)

export default studioCmsRouter
