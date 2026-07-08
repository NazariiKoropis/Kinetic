import { privateApi, publicApi } from '@config/client'

//private
const getMoviesStats = async () => {
	const response = await privateApi.get('/admin/movie/stats')
	return response.data
}

//public
const getMovies = async (params) => {
	const response = await publicApi.get('/movie', params)
	return response.data
}

const getGenreList = async () => {
	const response = await publicApi.get('/genre')
	return response.data
}

export { getGenreList, getMovies, getMoviesStats }
