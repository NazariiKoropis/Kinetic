import { privateApi, publicApi } from "@config/client"

const getCountries = async () => {
	const response = await publicApi.get('/country')
	return response.data
}

const getCountriesAdmin = async (params) => {
	const response = await privateApi.get('/admin/country', { params })
	return response.data
}

const updateCountry = async (id, body) => {
	const response = await privateApi.put(`/admin/country/${id}`, body)
	return response.data
}

const deleteCountry = async (id) => {
	const response = await privateApi.delete(`/admin/country/${id}`)
	return response.data
}

const createCountry = async (body) => {
	const response = await privateApi.post('/admin/country', body)
	return response.data
}

export {
	createCountry,
	deleteCountry,
	getCountries,
	getCountriesAdmin,
	updateCountry
}
