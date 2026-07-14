import { privateApi, publicApi } from "@config/client"

const getGenresStats = async () => {
	const response = await privateApi.get('/admin/dashboard/genre-stats')
	return response.data
}

const getGenres = async () => {
	const response = await publicApi.get('/genre')
	return response.data
}

export {
	getGenres,
	getGenresStats
}
