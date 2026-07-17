import { privateApi, publicApi } from '@config/client'

// private
const getMoviesStats = async () => {
	const response = await privateApi.get('/cms/dashboard/movie-stats')
	return response.data
}

const updateMovieStatus = async (movieId, newStatus) => {
	const response = await privateApi.patch(`/cms/movie/status/${movieId}`, { status: newStatus })
	return response.data
}

const updateMovieMPAA = async (movieId, newMPAA) => {
	const response = await privateApi.put(`/cms/mpaa/${movieId}`, { ratingMPAA: newMPAA })
	return response.data
}

const deleteMovie = async (movieId) => {
	const response = await privateApi.delete(`/cms/movie/${movieId}`)
	return response.data
}

// public
const getMovies = async (params) => {
	const response = await publicApi.get('/web/movie', { params })
	return response.data
}

const getStudioList = async () => {
	const response = await publicApi.get('/web/studio')
	return response.data.data
}

export { deleteMovie, getMovies, getMoviesStats, getStudioList, updateMovieMPAA, updateMovieStatus }
