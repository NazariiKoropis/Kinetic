import { MOVIE_STATUSES } from '@constants/movie'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, Skeleton } from '@mui/material'
import StatCard from '@shared/StatCard'

function MoviesStatsOverview({ stats, loading, activeStatus, onStatusSelect }) {
	if (loading) {
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
				{[...Array(4)].map((_, idx) => (
					<Skeleton
						key={idx}
						variant="rounded"
						height={100}
						sx={{ borderRadius: 2 }}
					/>
				))}
			</Box>
		)
	}

	const statItems = [
		{
			id: 'all',
			title: 'All movies',
			value: stats?.total ?? 0,
			color: '#3B82F6',
			icon: <MovieCreationIcon />
		},
		{
			id: MOVIE_STATUSES.RELEASED,
			title: 'Published',
			value: stats?.released ?? 0,
			color: '#10B981',
			icon: <DoneAllIcon />
		},
		{
			id: MOVIE_STATUSES.UPCOMING,
			title: 'Upcoming',
			value: stats?.upcoming ?? 0,
			color: '#F59E0B',
			icon: <NewReleasesIcon />
		},
		{
			id: MOVIE_STATUSES.HIDDEN,
			title: 'Hidden',
			value: stats?.hidden ?? 0,
			color: '#EF4444',
			icon: <VisibilityOffIcon />
		}
	]

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)'
				},
				gap: 2
			}}
		>
			{statItems.map(item => {
				const isSelected = activeStatus === item.id

				return (
					<Box
						key={item.id}
						onClick={() => onStatusSelect(isSelected ? 'all' : item.id)}
						sx={{
							cursor: 'pointer',
							transition:
								'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
							borderRadius: 2,
							border: isSelected
								? `2px solid ${item.color}`
								: '2px solid transparent',
							transform: isSelected ? 'scale(1.02)' : 'none',
							'&:hover': {
								transform: 'translateY(-4px) scale(1.01)',
								boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
							}
						}}
					>
						<StatCard
							icon={item.icon}
							title={item.title}
							value={String(item.value)}
							color={item.color}
						/>
					</Box>
				)
			})}
		</Box>
	)
}

export default MoviesStatsOverview
