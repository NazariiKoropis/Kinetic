import {
	createCountry,
	deleteCountry,
	getCountriesAdmin,
	updateCountry
} from "#controllers/country.controller.js"
import { validateBody, validateQuery } from "#middlewares/validator.middleware.js"
import { createCountrySchema, getCountriesAdminSchema, updateCountrySchema } from "#schemas/country.schema.js"
import express from "express"


const countryAdminRoute = express.Router()

countryAdminRoute.get('/', validateQuery(getCountriesAdminSchema), getCountriesAdmin)
countryAdminRoute.post('/', validateBody(createCountrySchema), createCountry)
countryAdminRoute.put('/:id', validateBody(updateCountrySchema), updateCountry)
countryAdminRoute.delete('/:id', deleteCountry)

export default countryAdminRoute
