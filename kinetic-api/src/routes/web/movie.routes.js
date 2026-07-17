import {
	addView,
	getMovieById,
	getMovieForSearch,
	getMovies,
	getRelatedMovies,
	toggleDislikeMovie,
	toggleLikeMovie
} from '#controllers/movie.controller.js'
import { checkAuth } from '#middlewares/auth.middleware.js'
import buildMovieFilter from '#middlewares/movieFilter.middleware.js'
import { validateQuery } from '#middlewares/validator.middleware.js'
import { movieFilterSchema } from '#schemas/movie.schema.js'
import express from 'express'

const movieWebRouter = express.Router()

movieWebRouter.get('/', validateQuery(movieFilterSchema), buildMovieFilter, getMovies)
movieWebRouter.get('/search', getMovieForSearch)
movieWebRouter.get('/related/:id', getRelatedMovies)
movieWebRouter.get('/:id', getMovieById)

// Protected endpoints for standard logged-in users
movieWebRouter.patch('/like/:id', checkAuth, toggleLikeMovie)
movieWebRouter.patch('/dislike/:id', checkAuth, toggleDislikeMovie)
movieWebRouter.patch('/view/:id', addView)

export default movieWebRouter
