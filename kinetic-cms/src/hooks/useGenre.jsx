import {
	createGenre,
	deleteGenre,
	getGenresAdmin,
	getGenresStats,
	updateGenre
} from '@api/genre'
import { useCallback, useEffect, useState } from 'react'

function useGenre() {
	const [genres, setGenres] = useState([])
	const [stats, setStats] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isFirstLoad, setIsFirstLoad] = useState(true)

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [totalItems, setTotalItems] = useState(0)
	const [sortBy, setSortBy] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState('desc')

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setDebouncedSearch(search)
			setPage(1)
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [search])

	const fetchGenres = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getGenresAdmin({
				page,
				limit,
				search: debouncedSearch,
				sortBy,
				sortOrder
			})
			if (response.success) {
				setGenres(response.data)
				setTotalItems(response.pagination?.totalItems || 0)
			}
		} catch (e) {
			console.error('Error loading genres:', e)
		} finally {
			setLoading(false)
			setIsFirstLoad(false)
		}
	}, [page, limit, debouncedSearch, sortBy, sortOrder])

	const fetchStats = useCallback(async () => {
		try {
			const response = await getGenresStats()
			if (response.success) {
				setStats(response.data)
			}
		} catch (e) {
			console.error('Error loading statistics:', e)
		}
	}, [])

	useEffect(() => {
		fetchGenres()
	}, [fetchGenres])

	useEffect(() => {
		fetchStats()
	}, [fetchStats])

	const handleCreateGenre = async formData => {
		try {
			const response = await createGenre(formData)
			if (response.success) {
				fetchGenres()
				fetchStats()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error creating genre:', e)
			return { success: false, error: e.message }
		}
	}

	const handleUpdateGenre = async (id, formData) => {
		try {
			const response = await updateGenre(id, formData)
			if (response.success) {
				fetchGenres()
				fetchStats()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error updating genre:', e)
			return { success: false, error: e.message }
		}
	}

	const handleDeleteGenre = async id => {
		try {
			if (confirm('Are you sure you want to delete this genre?')) {
				const response = await deleteGenre(id)
				if (response.success) {
					fetchGenres()
					fetchStats()
					return { success: true }
				} else {
					return { success: false, error: response.message }
				}
			}
		} catch (e) {
			console.error('Error deleting genre:', e)
			return { success: false, error: e.message }
		}
	}

	return {
		genres,
		stats,
		loading,
		isFirstLoad,

		page,
		limit,
		search,
		totalItems,
		sortBy,
		sortOrder,
		setPage,
		setLimit,
		setSearch,
		setSortBy,
		setSortOrder,

		onCreate: handleCreateGenre,
		onUpdate: handleUpdateGenre,
		onDelete: handleDeleteGenre,

		refresh: () => {
			fetchGenres()
			fetchStats()
		}
	}
}

export default useGenre
