import { getMovies } from '@api/movie'
import Loader from '@layout/Loader'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import MoviesGrid from './components/MoviesGrid'
import MoviesStatsOverview from './components/MoviesStatsOverview'
import MoviesTable from './components/MoviesTable'
import MoviesToolbar from './components/MoviesToolbar'

function Movies() {
	const [isLoading, setIsLoading] = useState(true)
	const [movies, setMovies] = useState([])
	const [genre, setGenre] = useState([])
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10
	})
	const [search, setSearch] = useState('')
	const [status, setStatus] = useState('released')

	const params = []

	const [viewMode, setViewMode] = useState('table')

	const fetchMovies = async () => {
		try {
			const response = await getMovies()
			setMovies(response.data)
			console.log(response.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	if (isLoading) return <Loader />

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
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			{viewMode === 'table' ? <MoviesTable movies={movies} /> : <MoviesGrid />}
		</Box>
	)
}

export default Movies
