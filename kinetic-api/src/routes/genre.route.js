import { getAllGenres, getGenre } from '#controllers/genre.controller.js'
import express from 'express'

const genrePublicRouter = express.Router()

genrePublicRouter.get('/', getAllGenres)
genrePublicRouter.get('/:id', getGenre)

export default genrePublicRouter
