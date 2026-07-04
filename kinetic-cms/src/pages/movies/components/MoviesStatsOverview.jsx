import { getMoviesStats } from '@api/movie'
import Loader from '@layout/Loader'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box } from '@mui/material'
import CardStat from '@shared/CardStat'
import { useEffect, useState } from 'react'

const MoviesStatsOverview = () => {
	const [loading, setLoading] = useState(true)
	const [stats, setStats] = useState({
		total: 0,
		released: 0,
		soon: 0,
		hidden: 0
	})

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true)
				const response = await getMoviesStats()

				setStats(response.data)
			} catch (error) {
				console.error('Error loading statistics', error)
			} finally {
				setLoading(false)
			}
		}

		fetchStats()
	}, [])

	if (loading) {
		return <Loader />
	}

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					sm: 'repeat(2, 1fr)',
					lg: 'repeat(4, 1fr)'
				},
				gap: 2
			}}
		>
			<CardStat
				icon={<MovieCreationIcon />}
				title="Всього фільмів"
				value={stats.total.toString()}
				color="#3B82F6"
			/>
			<CardStat
				icon={<DoneAllIcon />}
				title="Опубліковано"
				value={stats.released.toString()}
				color="#10B981"
			/>
			<CardStat
				icon={<NewReleasesIcon />}
				title="Очікують"
				value={stats.soon.toString()}
				color="#F59E0B"
			/>
			<CardStat
				icon={<VisibilityOffIcon />}
				title="Приховано"
				value={stats.hidden.toString()}
				color="#EF4444"
			/>
		</Box>
	)
}

export default MoviesStatsOverview
