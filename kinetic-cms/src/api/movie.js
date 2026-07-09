import { privateApi, publicApi } from '@config/client'

// private
const getMoviesStats = async () => {
	const response = await privateApi.get('/admin/movie/stats')
	return response.data
}

const updateMovieStatus = async (movieId, newStatus) => {
	const response = await privateApi.patch(`/admin/movie/status/${movieId}`, { status: newStatus })
	return response.data
}


const updateMovieMPAA = async (movieId, newMPAA) => {
	const response = await privateApi.put(`/admin/mpaa/${movieId}`, { ratingMPAA: newMPAA })
	return response.data
}

const deleteMovie = async (movieId) => {
	const response = await privateApi.delete(`/admin/movie/${movieId}`)
	return response.data
}

// public
const getMovies = async (params) => {
	const response = await publicApi.get('/movie', { params })
	return response.data
}

const getGenreList = async () => {
	const response = await publicApi.get('/genre')
	return response.data
}

export { deleteMovie, getGenreList, getMovies, getMoviesStats, updateMovieMPAA, updateMovieStatus }
