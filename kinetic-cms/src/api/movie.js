import { privateApi, publicApi } from '@config/client'

const getMoviesStats = async () => {
	const response = await privateApi.get('/admin/movie/stats')
	return response.data
}

const getGenreList = async () => {
	const response = await publicApi.get('/genre')
	return response.data
}

export { getGenreList, getMoviesStats }
