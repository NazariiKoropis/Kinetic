import useStudio from '@hooks/useStudio'
import Loader from '@layout/Loader'
import { Box, LinearProgress, Stack } from '@mui/material'
import EntityDialog from '@ui/EntityDialog'
import { useState } from 'react'

import StudiosStatsOverview from './components/StudiosStatsOverview'
import StudiosTable from './components/StudiosTable'
import StudiosToolBar from './components/StudiosToolBar'

function Studios() {
	const [modalConfig, setModalConfig] = useState({
		open: false,
		mode: 'create',
		studioData: null
	})

	const {
		studios,
		stats,
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
	} = useStudio()

	const handleCloseModal = () => {
		setModalConfig({ open: false, mode: 'create', studioData: null })
	}

	const handleFormSubmit = async formData => {
		if (modalConfig.mode === 'create') {
			const res = await onCreate(formData)
			if (res?.success) handleCloseModal()
		} else {
			const res = await onUpdate(modalConfig.studioData._id, formData)
			if (res?.success) handleCloseModal()
		}
	}

	if (isFirstLoad) return <Loader />

	return (
		<Stack spacing={2}>
			<StudiosStatsOverview stats={stats} />

			<StudiosToolBar
				searchTerm={search}
				onSearchChange={setSearch}
				sortBy={sortBy}
				onSortByChange={setSortBy}
				sortOrder={sortOrder}
				onSortOrderChange={setSortOrder}
				onCreateStudio={() =>
					setModalConfig({ open: true, mode: 'create', studioData: null })
				}
			/>

			<Box sx={{ width: '100%', height: 4, mb: -1 }}>
				{loading && <LinearProgress color="primary" />}
			</Box>

			<Box sx={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease' }}>
				<StudiosTable
					studios={studios}
					totalItems={totalItems}
					page={page}
					limit={limit}
					onPageChange={setPage}
					onLimitChange={setLimit}
					onDelete={onDelete}
					onEdit={id => {
						const currentStudio = studios.find(s => s._id === id)
						setModalConfig({
							open: true,
							mode: 'edit',
							studioData: currentStudio
						})
					}}
				/>
			</Box>

			<EntityDialog
				open={modalConfig.open}
				mode={modalConfig.mode}
				initialData={modalConfig.studioConfig || modalConfig.studioData}
				handleClose={handleCloseModal}
				handleSubmit={handleFormSubmit}
				entityName="Studio"
			/>
		</Stack>
	)
}

export default Studios
