import { getGenreStats } from '#controllers/genre.controller.js'
import { getMovieStats } from '#controllers/movie.controller.js'
import express from 'express'

const dashboardAdminRouter = express.Router()

dashboardAdminRouter.get('/movie-stats', getMovieStats)
dashboardAdminRouter.get('/genre-stats', getGenreStats)

export default dashboardAdminRouter
