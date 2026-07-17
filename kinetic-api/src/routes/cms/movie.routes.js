import { createMovie, deleteMovieById, updateMovie, updateStatus } from '#controllers/movie.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { movieCreateSchema, movieUpdateSchema, statusUpdateSchema } from '#schemas/movie.schema.js'
import express from 'express'

const movieCmsRouter = express.Router()

movieCmsRouter.post('/', validateBody(movieCreateSchema), createMovie)
movieCmsRouter.put('/:id', validateBody(movieUpdateSchema), updateMovie)
movieCmsRouter.patch('/status/:id', validateBody(statusUpdateSchema), updateStatus)
movieCmsRouter.delete('/:id', deleteMovieById)

export default movieCmsRouter
