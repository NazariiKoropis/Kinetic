import useMovie from '@hooks/useMovie'
import Loader from '@layout/Loader'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import MoviesGrid from './components/MoviesGrid'
import MoviesStatsOverview from './components/MoviesStatsOverview'
import MoviesTable from './components/MoviesTable'
import MoviesToolbar from './components/MoviesToolbar'

function Movies() {
	const [viewMode, setViewMode] = useState('table')

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
					justifyContent: 'space-between',
					alignItems: 'center',
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
					onClick={() => alert('Create Movie')}
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
						onEdit={id => alert(`Edit movie with ID: ${id}`)}
						onPreview={id => alert(`Preview movie with ID: ${id}`)}
					/>
				) : (
					<MoviesGrid movies={movies} />
				)}
			</Box>
		</Box>
	)
}

export default Movies
