import useGenre from '@hooks/useGenre'
import Loader from '@layout/Loader'
import { Box, LinearProgress, Stack } from '@mui/material'
import EntityDialog from '@ui/EntityDialog'
import { useState } from 'react'

import GenresStastOverview from './components/GenresStastOverview'
import GenresTable from './components/GenresTable'
import GenresToolBar from './components/GenresToolBar'

function Genres() {
	const [modalConfig, setModalConfig] = useState({
		open: false,
		mode: 'create',
		genreData: null
	})

	const {
		genres,
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
	} = useGenre()

	const handleCloseModal = () => {
		setModalConfig({ open: false, mode: 'create', genreData: null })
	}

	const handleFormSubmit = async formData => {
		if (modalConfig.mode === 'create') {
			const res = await onCreate(formData)
			if (res?.success) handleCloseModal()
		} else {
			const res = await onUpdate(modalConfig.genreData._id, formData)
			if (res?.success) handleCloseModal()
		}
	}

	if (isFirstLoad) return <Loader />

	return (
		<Stack spacing={2}>
			<GenresStastOverview stats={stats} />

			<GenresToolBar
				searchTerm={search}
				onSearchChange={setSearch}
				sortBy={sortBy}
				onSortByChange={setSortBy}
				sortOrder={sortOrder}
				onSortOrderChange={setSortOrder}
				onCreateGenre={() =>
					setModalConfig({ open: true, mode: 'create', genreData: null })
				}
			/>

			<Box sx={{ width: '100%', height: 4, mb: -1 }}>
				{loading && <LinearProgress color="primary" />}
			</Box>

			<Box sx={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease' }}>
				<GenresTable
					genres={genres}
					totalItems={totalItems}
					page={page}
					limit={limit}
					onPageChange={setPage}
					onLimitChange={setLimit}
					onDelete={onDelete}
					onEdit={id => {
						const currentGenre = genres.find(g => g._id === id)
						setModalConfig({
							open: true,
							mode: 'edit',
							genreData: currentGenre
						})
					}}
				/>
			</Box>

			<EntityDialog
				open={modalConfig.open}
				mode={modalConfig.mode}
				initialData={modalConfig.genreConfig || modalConfig.genreData}
				handleClose={handleCloseModal}
				handleSubmit={handleFormSubmit}
				entityName="Genre"
				hasSlug={true}
			/>
		</Stack>
	)
}

export default Genres
