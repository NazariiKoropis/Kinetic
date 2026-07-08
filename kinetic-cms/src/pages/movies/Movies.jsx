import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import MoviesGrid from './components/MoviesGrid'
import MoviesStatsOverview from './components/MoviesStatsOverview'
import MoviesTable from './components/MoviesTable'
import MoviesToolbar from './components/MoviesToolbar'

function Movies() {
	const [genre, setGenre] = useState([])

	const [viewMode, setViewMode] = useState('table')

	return (
		<Box
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3
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
					onClick={() => {
						alert('Create Movie')
					}}
				>
					Create Movie
				</Button>
			</Box>
			<MoviesStatsOverview />
			<MoviesToolbar
				genre={genre}
				onViewModeChange={setViewMode}
				viewMode={viewMode}
			/>

			{viewMode === 'table' ? <MoviesTable movies={[]} /> : <MoviesGrid />}
		</Box>
	)
}

export default Movies
