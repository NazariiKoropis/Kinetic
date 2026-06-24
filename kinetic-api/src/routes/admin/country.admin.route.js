import {
	createCountry,
	deleteCountry,
	updateCountry
} from "#controllers/country.controller.js"
import { validateBody } from "#middlewares/validator.middleware.js"
import { createCountrySchema, updateCountrySchema } from "#schemas/country.schema.js"
import express from "express"


const countryAdminRoute = express.Router()

countryAdminRoute.post('/', validateBody(createCountrySchema), createCountry)
countryAdminRoute.put('/:id', validateBody(updateCountrySchema), updateCountry)
countryAdminRoute.delete('/:id', deleteCountry)

export default countryAdminRoute
