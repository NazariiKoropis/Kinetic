import {
	createCountry,
	deleteCountry,
	getCountriesAdmin,
	updateCountry
} from '#controllers/country.controller.js'
import { validateBody, validateQuery } from '#middlewares/validator.middleware.js'
import { createCountrySchema, getCountriesAdminSchema, updateCountrySchema } from '#schemas/country.schema.js'
import express from 'express'

const countryCmsRouter = express.Router()

countryCmsRouter.get('/', validateQuery(getCountriesAdminSchema), getCountriesAdmin)
countryCmsRouter.post('/', validateBody(createCountrySchema), createCountry)
countryCmsRouter.put('/:id', validateBody(updateCountrySchema), updateCountry)
countryCmsRouter.delete('/:id', deleteCountry)

export default countryCmsRouter
