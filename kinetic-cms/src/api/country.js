import { privateApi, publicApi } from "@config/client"

const getCountries = async () => {
	const response = await publicApi.get('/web/country')
	return response.data
}

const getCountriesAdmin = async (params) => {
	const response = await privateApi.get('/cms/country', { params })
	return response.data
}

const updateCountry = async (id, body) => {
	const response = await privateApi.put(`/cms/country/${id}`, body)
	return response.data
}

const deleteCountry = async (id) => {
	const response = await privateApi.delete(`/cms/country/${id}`)
	return response.data
}

const createCountry = async (body) => {
	const response = await privateApi.post('/cms/country', body)
	return response.data
}

export {
	createCountry,
	deleteCountry,
	getCountries,
	getCountriesAdmin,
	updateCountry
}
