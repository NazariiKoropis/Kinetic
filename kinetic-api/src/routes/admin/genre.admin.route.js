import {
	createGenre,
	deleteGenre,
	getGenresAdmin,
	updateGenre
} from '#controllers/genre.controller.js'
import { validateBody, validateQuery } from '#middlewares/validator.middleware.js'
import { createGenreSchema, getGenresAdminSchema, updateGenreSchema } from '#schemas/genre.schema.js'
import express from 'express'

const genreAdminRouter = express.Router()

genreAdminRouter.get('/', validateQuery(getGenresAdminSchema), getGenresAdmin)
genreAdminRouter.post('/', validateBody(createGenreSchema), createGenre)

genreAdminRouter.put('/:id', validateBody(updateGenreSchema), updateGenre)
genreAdminRouter.delete('/:id', deleteGenre)

export default genreAdminRouter
