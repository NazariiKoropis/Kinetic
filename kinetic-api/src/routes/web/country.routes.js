import { getCountries } from '#controllers/country.controller.js'
import express from 'express'

const countryWebRouter = express.Router()

countryWebRouter.get('/', getCountries)

export default countryWebRouter
