import { privateApi, publicApi } from "@config/client"

const getGenresStats = async () => {
	const response = await privateApi.get('/admin/dashboard/genre-stats')
	return response.data
}

const getGenres = async () => {
	const response = await publicApi.get('/genre')
	return response.data
}

const getGenresAdmin = async (params) => {
	const response = await privateApi.get('/admin/genre', { params })
	return response.data
}

const updateGenre = async (id, body) => {
	const response = await privateApi.put(`/admin/genre/${id}`, body)
	return response.data
}

const deleteGenre = async (id) => {
	const response = await privateApi.delete(`/admin/genre/${id}`)
	return response.data
}

const createGenre = async (body) => {
	const response = await privateApi.post('/admin/genre', body)
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
