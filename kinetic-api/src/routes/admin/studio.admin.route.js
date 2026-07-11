import { createStudio, deleteStudio, getAllStudios, getStudioById, updateStudio } from '#controllers/studio.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { createStudioSchema, updateStudioSchema } from '#schemas/studio.schema.js'
import express from 'express'

const router = express.Router()

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
router.get('/', getAllStudios)
router.get('/:id', getStudioById)

export default router
