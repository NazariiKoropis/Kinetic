import {
	createStudio,
	deleteStudio,
	getStudiosAdmin,
	getStudiosStats,
	updateStudio
} from '@api/studio'
import { useCallback, useEffect, useState } from 'react'

function useStudio() {
	const [studios, setStudios] = useState([])
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

	const fetchStudios = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getStudiosAdmin({
				page,
				limit,
				search: debouncedSearch,
				sortBy,
				sortOrder
			})
			if (response.success) {
				setStudios(response.data)
				setTotalItems(response.pagination?.totalItems || 0)
			}
		} catch (e) {
			console.error('Error loading studios:', e)
		} finally {
			setLoading(false)
			setIsFirstLoad(false)
		}
	}, [page, limit, debouncedSearch, sortBy, sortOrder])

	const fetchStats = useCallback(async () => {
		try {
			const response = await getStudiosStats()
			if (response.success) {
				setStats(response.data)
			}
		} catch (e) {
			console.error('Error loading statistics:', e)
		}
	}, [])

	useEffect(() => {
		fetchStudios()
	}, [fetchStudios])

	useEffect(() => {
		fetchStats()
	}, [fetchStats])

	const handleCreateStudio = async formData => {
		try {
			const response = await createStudio(formData)
			if (response.success) {
				fetchStudios()
				fetchStats()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error creating studio:', e)
			return { success: false, error: e.message }
		}
	}

	const handleUpdateStudio = async (id, formData) => {
		try {
			const response = await updateStudio(id, formData)
			if (response.success) {
				fetchStudios()
				fetchStats()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error updating studio:', e)
			return { success: false, error: e.message }
		}
	}

	const handleDeleteStudio = async id => {
		try {
			if (confirm('Are you sure you want to delete this studio?')) {
				const response = await deleteStudio(id)
				if (response.success) {
					fetchStudios()
					fetchStats()
					return { success: true }
				} else {
					return { success: false, error: response.message }
				}
			}
		} catch (e) {
			console.error('Error deleting studio:', e)
			return { success: false, error: e.message }
		}
	}

	return {
		studios,
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

		onCreate: handleCreateStudio,
		onUpdate: handleUpdateStudio,
		onDelete: handleDeleteStudio,

		refresh: () => {
			fetchStudios()
			fetchStats()
		}
	}
}

export default useStudio
