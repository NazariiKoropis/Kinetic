import {
	addView,
	getMovieById,
	getMovieForSearch,
	getMovies,
	getRelatedMovies,
	toggleDislikeMovie,
	toggleLikeMovie
} from '#controllers/movie.controller.js'
import { checkAuth } from "#middlewares/auth.middleware.js"
import buildMovieFilter from "#middlewares/movieFilter.middleware.js"
import { validateQuery } from '#middlewares/validator.middleware.js'
import { movieFilterSchema } from '#schemas/movie.schema.js'
import express from "express"

const movieRouter = express.Router()

movieRouter.get('/', validateQuery(movieFilterSchema), buildMovieFilter, getMovies)
movieRouter.get('/search', getMovieForSearch)
movieRouter.get('/related/:id', getRelatedMovies)
movieRouter.get('/:id', getMovieById)

// patch routes
movieRouter.patch('/like/:id', checkAuth, toggleLikeMovie)
movieRouter.patch('/dislike/:id', checkAuth, toggleDislikeMovie)
movieRouter.patch('/view/:id', addView)


export default movieRouter
