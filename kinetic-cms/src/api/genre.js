import { privateApi, publicApi } from "@config/client"

const getGenres = async () => {
	const response = await publicApi.get('/web/genre')
	return response.data
}

const getGenresAdmin = async (params) => {
	const response = await privateApi.get('/cms/genre', { params })
	return response.data
}

const updateGenre = async (id, body) => {
	const response = await privateApi.put(`/cms/genre/${id}`, body)
	return response.data
}

const deleteGenre = async (id) => {
	const response = await privateApi.delete(`/cms/genre/${id}`)
	return response.data
}

const createGenre = async (body) => {
	const response = await privateApi.post('/cms/genre', body)
	return response.data
}

const getGenresStats = async () => {
	const response = await privateApi.get('/cms/dashboard/genre-stats')
	return response.data
}

export {
	createGenre,
	deleteGenre,
	getGenres,
	getGenresAdmin,
	getGenresStats,
	updateGenre
}
