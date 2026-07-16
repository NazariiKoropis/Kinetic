import BusinessIcon from '@mui/icons-material/Business'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import MovieIcon from '@mui/icons-material/Movie'
import StarIcon from '@mui/icons-material/Star'
import { Box } from '@mui/material'
import StatCard from '@shared/StatCard'

const formatViews = num => {
	if (!num) return '0'
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
	}
	return num.toString()
}

function StudiosStatsOverview({ stats }) {
	const statItems = [
		{
			title: 'Total studios',
			value: stats?.totalStudios ?? 0,
			icon: <BusinessIcon />,
			color: '#3B82F6'
		},
		{
			title: 'MOST POPULAR',
			value: stats?.mostViewed?.name ?? '-',
			icon: <LocalFireDepartmentIcon />,
			color: '#10B981',
			description:
				stats?.mostViewed?.views !== undefined
					? `${formatViews(stats.mostViewed.views)} views`
					: '0 views'
		},
		{
			title: 'CONTENT LEADER',
			value: stats?.mostProductive?.name ?? '-',
			icon: <MovieIcon />,
			color: '#F59E0B',
			description:
				stats?.mostProductive?.moviesCount !== undefined
					? `${stats.mostProductive.moviesCount} titles`
					: '0 titles'
		},
		{
			title: 'HIGHEST RATED',
			value: stats?.highestRated?.name ?? '-',
			icon: <StarIcon />,
			color: '#EF4444',
			description:
				stats?.highestRated?.avgRating !== undefined
					? `${Number(stats.highestRated.avgRating).toFixed(1)} / 10 rating`
					: '0.0 / 10 rating'
		}
	]

	return (
		<Box
			component="section"
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					xs: '1fr',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)'
				},
				gap: 2,
				mb: 3
			}}
		>
			{statItems.map((item, index) => (
				<StatCard
					key={index}
					title={item.title}
					value={String(item.value)}
					icon={item.icon}
					color={item.color}
					description={item.description}
					component={'h6'}
				/>
			))}
		</Box>
	)
}

export default StudiosStatsOverview
