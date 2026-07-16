import { getGenreStats } from '#controllers/genre.controller.js'
import { getMovieStats } from '#controllers/movie.controller.js'
import { getStudioStats } from '#controllers/studio.controller.js'
import express from 'express'

const dashboardAdminRouter = express.Router()

dashboardAdminRouter.get('/movie-stats', getMovieStats)
dashboardAdminRouter.get('/genre-stats', getGenreStats)
dashboardAdminRouter.get('/studio-stats', getStudioStats)

export default dashboardAdminRouter
