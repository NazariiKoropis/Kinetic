import {
	getCountries
} from "#controllers/country.controller.js"
import express from "express"

const countryRouter = express.Router()

countryRouter.get('/', getCountries)

export default countryRouter
