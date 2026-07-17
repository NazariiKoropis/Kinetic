import { getAllGenres, getGenre } from '#controllers/genre.controller.js'
import express from 'express'

const genreWebRouter = express.Router()

genreWebRouter.get('/', getAllGenres)
genreWebRouter.get('/:id', getGenre)

export default genreWebRouter
