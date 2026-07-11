import Loader from '@layout/Loader'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import ImageDialog from '@ui/ImageDialog'
import { useCallback, useState } from 'react'

import useMovie from '@hooks/useMovie'
import { useNavigate } from 'react-router-dom'
import MoviesGrid from './components/MoviesGrid'
import MoviesStatsOverview from './components/MoviesStatsOverview'
import MoviesTable from './components/MoviesTable'
import MoviesToolbar from './components/MoviesToolbar'
function Movies() {
	const [viewMode, setViewMode] = useState('grid')
	const [activePoster, setActivePoster] = useState(null)
	const navigate = useNavigate()

	const {
		movies,
		totalItems,
		loading,
		isFirstLoad,
		stats,
		statsLoading,
		filters,
		setFilters,
		operations
	} = useMovie()

	const onEdit = useCallback(
		id => navigate(`/movies/edit-movie/${id}`),
		[navigate]
	)

	if (isFirstLoad) return <Loader />

	return (
		<Box
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				position: 'relative'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					justifyContent: 'space-between',
					alignItems: { xs: 'flex-start', sm: 'center' },
					gap: 2
				}}
			>
				<Typography
					variant="h4"
					sx={{ fontWeight: 'bold' }}
				>
					Movies management
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					size="large"
					onClick={() => navigate('/movies/add-movie')}
				>
					Create Movie
				</Button>
			</Box>
			<MoviesStatsOverview
				stats={stats}
				loading={statsLoading}
				activeStatus={filters.status}
				onStatusSelect={setFilters.setStatus}
			/>
			<MoviesToolbar
				searchTerm={filters.searchTerm}
				onSearchChange={setFilters.setSearchTerm}
				status={filters.status}
				onStatusChange={setFilters.setStatus}
				genre={filters.genres}
				onGenreChange={setFilters.setGenres}
				sortBy={filters.sortBy}
				onSortByChange={setFilters.setSortBy}
				sortOrder={filters.sortOrder}
				onSortOrderChange={setFilters.setSortOrder}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			<Box sx={{ width: '100%', height: 4, mb: -2 }}>
				{loading && <LinearProgress color="primary" />}
			</Box>

			<Box sx={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease' }}>
				{viewMode === 'table' ? (
					<MoviesTable
						movies={movies}
						page={filters.page}
						limit={filters.limit}
						totalItems={totalItems}
						onPageChange={setFilters.setPage}
						onLimitChange={setFilters.setLimit}
						onStatusChange={operations.handleStatusChange}
						onMPAAChange={operations.handleMPAAChange}
						onDelete={operations.handleDeleteMovie}
						onEdit={onEdit}
						onPreview={id => alert(`Preview movie with ID: ${id}`)}
						onPosterClick={setActivePoster}
					/>
				) : (
					<MoviesGrid
						movies={movies}
						page={filters.page}
						limit={filters.limit}
						totalItems={totalItems}
						onPageChange={setFilters.setPage}
						onLimitChange={setFilters.setLimit}
						onStatusChange={operations.handleStatusChange}
						onMPAAChange={operations.handleMPAAChange}
						onDelete={operations.handleDeleteMovie}
						onEdit={onEdit}
						onPreview={id => alert(`Preview ${id}`)}
						onPosterClick={setActivePoster}
					/>
				)}
			</Box>

			<ImageDialog
				open={Boolean(activePoster)}
				onClose={() => setActivePoster(null)}
				imageUrl={activePoster}
				alt="Full size poster"
			/>
		</Box>
	)
}

export default Movies
