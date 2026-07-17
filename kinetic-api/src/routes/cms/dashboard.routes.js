import { getGenreStats } from '#controllers/genre.controller.js'
import { getMovieStats } from '#controllers/movie.controller.js'
import { getStudioStats } from '#controllers/studio.controller.js'
import express from 'express'

const dashboardCmsRouter = express.Router()

dashboardCmsRouter.get('/movie-stats', getMovieStats)
dashboardCmsRouter.get('/genre-stats', getGenreStats)
dashboardCmsRouter.get('/studio-stats', getStudioStats)

export default dashboardCmsRouter
