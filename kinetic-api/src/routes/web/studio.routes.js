import { getAllStudios, getStudioById } from '#controllers/studio.controller.js'
import express from 'express'

const studioWebRouter = express.Router()

studioWebRouter.get('/', getAllStudios)
studioWebRouter.get('/:id', getStudioById)

export default studioWebRouter
