import {
	createGenre,
	deleteGenre,
	updateGenre
} from '#controllers/genre.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { createGenreSchema, updateGenreSchema } from '#schemas/genre.schema.js'
import express from 'express'

const genreAdminRouter = express.Router()

genreAdminRouter.post('/', validateBody(createGenreSchema), createGenre)

genreAdminRouter.put('/:id', validateBody(updateGenreSchema), updateGenre)
genreAdminRouter.delete('/:id', deleteGenre)

export default genreAdminRouter
