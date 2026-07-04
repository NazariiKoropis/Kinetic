import { privateApi } from '@config/client'

const getMoviesStats = async () => {
	const response = await privateApi.get('/admin/movie/stats')

	return response.data
}

export { getMoviesStats }
