import {
	deleteMovie,
	getMovies,
	getMoviesStats,
	updateMovieMPAA,
	updateMovieStatus
} from '@api/movie'
import { useCallback, useEffect, useState } from 'react'

function useMovie() {
	const [movies, setMovies] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [loading, setLoading] = useState(false)
	const [isFirstLoad, setIsFirstLoad] = useState(true)

	const [stats, setStats] = useState({
		total: 0,
		released: 0,
		upcoming: 0,
		hidden: 0
	})
	const [statsLoading, setStatsLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [status, setStatus] = useState('all')
	const [genres, setGenres] = useState([])
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState('desc')

	const fetchStats = useCallback(async () => {
		try {
			setStatsLoading(true)
			const response = await getMoviesStats()
			setStats(response.data)
		} catch (error) {
			console.error('Error loading statistics', error)
		} finally {
			setStatsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchStats()
	}, [fetchStats])

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm)
			setPage(1)
		}, 500)

		return () => clearTimeout(timer)
	}, [searchTerm])

	const fetchMovies = useCallback(async () => {
		try {
			setLoading(true)
			const params = { page, limit, sortBy, sortOrder }

			if (debouncedSearch) params.title = debouncedSearch
			if (status !== 'all') params.status = status
			if (genres.length > 0) params.genres = genres.join(',')

			const response = await getMovies(params)
			setMovies(response.data)
			setTotalItems(response.pagination?.totalItems || 0)
		} catch (error) {
			console.error('Error downloading movies:', error)
		} finally {
			setLoading(false)
			setIsFirstLoad(false)
		}
	}, [debouncedSearch, status, genres, page, limit, sortBy, sortOrder])

	useEffect(() => {
		fetchMovies()
	}, [fetchMovies])

	const handleStatusChange = async (movieId, newStatus) => {
		const oldMovie = movies.find(m => m._id === movieId)
		if (!oldMovie) return

		const oldStatus = oldMovie.status

		try {
			await updateMovieStatus(movieId, newStatus)

			setMovies(prev =>
				prev.map(m => (m._id === movieId ? { ...m, status: newStatus } : m))
			)

			setStats(prev => {
				const nextStats = { ...prev }

				if (nextStats[oldStatus] !== undefined) nextStats[oldStatus]--

				if (nextStats[newStatus] !== undefined) nextStats[newStatus]++
				return nextStats
			})
		} catch (error) {
			console.error('Failed to update status:', error)
		}
	}

	const handleMPAAChange = async (movieId, newMPAA) => {
		try {
			await updateMovieMPAA(movieId, newMPAA)
			setMovies(prev =>
				prev.map(m => (m._id === movieId ? { ...m, ratingMPAA: newMPAA } : m))
			)
		} catch (error) {
			console.error('Failed to update MPAA:', error)
		}
	}

	const handleDeleteMovie = async movieId => {
		if (!window.confirm('Are you sure you want to delete this movie?')) return
		const movieToDelete = movies.find(m => m._id === movieId)
		if (!movieToDelete) return

		try {
			await deleteMovie(movieId)

			setMovies(prev => prev.filter(m => m._id !== movieId))
			setTotalItems(prev => prev - 1)

			setStats(prev => {
				const nextStats = { ...prev }
				nextStats.total--
				if (nextStats[movieToDelete.status] !== undefined)
					nextStats[movieToDelete.status]--
				return nextStats
			})
		} catch (error) {
			console.error('Error deleting movie:', error)
		}
	}

	const resetFilters = () => {
		setSearchTerm('')
		setStatus('all')
		setGenres([])
		setPage(1)
	}

	return {
		movies,
		totalItems,
		loading,
		isFirstLoad,
		stats,
		statsLoading,
		filters: {
			searchTerm,
			status,
			genres,
			page,
			limit,
			sortBy,
			sortOrder
		},
		setFilters: {
			setSearchTerm,
			setStatus,
			setGenres,
			setPage,
			setLimit,
			setSortBy,
			setSortOrder,
			resetFilters
		},
		operations: {
			handleStatusChange,
			handleMPAAChange,
			handleDeleteMovie,
			refresh: fetchMovies,
			refreshStats: fetchStats
		}
	}
}

export default useMovie
