import {
	createCountry,
	deleteCountry,
	getCountriesAdmin,
	updateCountry
} from '@api/country'
import { useCallback, useEffect, useState } from 'react'

function useCountry() {
	const [countries, setCountries] = useState([])
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

	const fetchCountries = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getCountriesAdmin({
				page,
				limit,
				search: debouncedSearch,
				sortBy,
				sortOrder
			})
			if (response.success) {
				setCountries(response.data)
				setTotalItems(response.pagination?.totalItems || 0)
			}
		} catch (e) {
			console.error('Error loading countries:', e)
		} finally {
			setLoading(false)
			setIsFirstLoad(false)
		}
	}, [page, limit, debouncedSearch, sortBy, sortOrder])

	useEffect(() => {
		fetchCountries()
	}, [fetchCountries])

	const handleCreateCountry = async formData => {
		try {
			const response = await createCountry(formData)
			if (response.success) {
				fetchCountries()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error creating country:', e)
			return { success: false, error: e.message }
		}
	}

	const handleUpdateCountry = async (id, formData) => {
		try {
			const response = await updateCountry(id, formData)
			if (response.success) {
				fetchCountries()
				return { success: true, data: response.data }
			}
		} catch (e) {
			console.error('Error updating country:', e)
			return { success: false, error: e.message }
		}
	}

	const handleDeleteCountry = async id => {
		try {
			if (confirm('Are you sure you want to delete this country?')) {
				const response = await deleteCountry(id)
				if (response.success) {
					fetchCountries()
					return { success: true }
				} else {
					return { success: false, error: response.message }
				}
			}
		} catch (e) {
			console.error('Error deleting country:', e)
			return { success: false, error: e.message }
		}
	}

	return {
		countries,
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

		onCreate: handleCreateCountry,
		onUpdate: handleUpdateCountry,
		onDelete: handleDeleteCountry,

		refresh: () => {
			fetchCountries()
		}
	}
}

export default useCountry
