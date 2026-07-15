import useCountry from '@hooks/useCountry'
import Loader from '@layout/Loader'
import { Box, LinearProgress, Stack } from '@mui/material'
import { useState } from 'react'

import CountriesTable from './components/CountriesTable'
import CountriesToolBar from './components/CountriesToolBar'
import CountryDialog from './components/CountryDialog'

function Countries() {
	const [modalConfig, setModalConfig] = useState({
		open: false,
		mode: 'create',
		countryData: null
	})

	const {
		countries,
		page,
		loading,
		isFirstLoad,
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
		onDelete,
		onCreate,
		onUpdate
	} = useCountry()

	const handleCloseModal = () => {
		setModalConfig({ open: false, mode: 'create', countryData: null })
	}

	const handleFormSubmit = async formData => {
		if (modalConfig.mode === 'create') {
			const res = await onCreate(formData)
			if (res?.success) handleCloseModal()
		} else {
			const res = await onUpdate(modalConfig.countryData._id, formData)
			if (res?.success) handleCloseModal()
		}
	}

	if (isFirstLoad) return <Loader />

	return (
		<Stack spacing={2}>
			<CountriesToolBar
				searchTerm={search}
				onSearchChange={setSearch}
				sortBy={sortBy}
				onSortByChange={setSortBy}
				sortOrder={sortOrder}
				onSortOrderChange={setSortOrder}
				onCreateCountry={() =>
					setModalConfig({ open: true, mode: 'create', countryData: null })
				}
			/>

			<Box sx={{ width: '100%', height: 4, mb: -1 }}>
				{loading && <LinearProgress color="primary" />}
			</Box>

			<Box sx={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease' }}>
				<CountriesTable
					countries={countries}
					totalItems={totalItems}
					page={page}
					limit={limit}
					onPageChange={setPage}
					onLimitChange={setLimit}
					onDelete={onDelete}
					onEdit={id => {
						const currentCountry = countries.find(c => c._id === id)
						setModalConfig({ open: true, mode: 'edit', countryData: currentCountry })
					}}
				/>
			</Box>

			<CountryDialog
				open={modalConfig.open}
				mode={modalConfig.mode}
				initialData={modalConfig.countryConfig || modalConfig.countryData}
				handleClose={handleCloseModal}
				handleSubmit={handleFormSubmit}
			/>
		</Stack>
	)
}

export default Countries
