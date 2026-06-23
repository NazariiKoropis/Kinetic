import { createMovie, deleteMovieById, updateMovie, updateStatus } from '#controllers/movie.controller.js'
import { validateBody } from '#middlewares/validator.middleware.js'
import { movieCreateSchema, movieUpdateSchema, statusUpdateSchema } from '#schemas/movie.schema.js'
import express from 'express'

const movieAdminRouter = express.Router()

movieAdminRouter.post('/', validateBody(movieCreateSchema), createMovie)
movieAdminRouter.put('/:id', validateBody(movieUpdateSchema), updateMovie)

// update status route
movieAdminRouter.patch('/status/:id', validateBody(statusUpdateSchema), updateStatus)
movieAdminRouter.delete('/:id', deleteMovieById)

export default movieAdminRouter
