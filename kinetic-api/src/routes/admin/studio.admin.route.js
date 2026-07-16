import { createStudio, deleteStudio, getStudiosAdmin, updateStudio } from '#controllers/studio.controller.js'
import { validateBody, validateQuery } from '#middlewares/validator.middleware.js'
import { createStudioSchema, getStudiosAdminSchema, updateStudioSchema } from '#schemas/studio.schema.js'
import express from 'express'

const router = express.Router()

router.get(
	'/',
	validateQuery(getStudiosAdminSchema),
	getStudiosAdmin
)
router.post(
	'/',
	validateBody(createStudioSchema),
	createStudio
)
router.put(
	'/:id',
	validateBody(updateStudioSchema),
	updateStudio
)
router.delete('/:id', deleteStudio)

export default router
