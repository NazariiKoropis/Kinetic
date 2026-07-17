import {
	createGenre,
	deleteGenre,
	getGenresAdmin,
	updateGenre
} from '#controllers/genre.controller.js'
import { validateBody, validateQuery } from '#middlewares/validator.middleware.js'
import { createGenreSchema, getGenresAdminSchema, updateGenreSchema } from '#schemas/genre.schema.js'
import express from 'express'

const genreCmsRouter = express.Router()

genreCmsRouter.get('/', validateQuery(getGenresAdminSchema), getGenresAdmin)
genreCmsRouter.post('/', validateBody(createGenreSchema), createGenre)
genreCmsRouter.put('/:id', validateBody(updateGenreSchema), updateGenre)
genreCmsRouter.delete('/:id', deleteGenre)

export default genreCmsRouter
