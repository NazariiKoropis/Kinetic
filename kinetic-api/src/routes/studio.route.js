import { getAllStudios, getStudioById } from '#controllers/studio.controller.js'
import express from 'express'

const studioRouter = express.Router()

studioRouter.get('/', getAllStudios)
studioRouter.get('/:id', getStudioById)

export default studioRouter
