import CategoryIcon from '@mui/icons-material/Category'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import MovieIcon from '@mui/icons-material/Movie'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box } from '@mui/material'
import GenreStatCard from '@shared/GenreStatCard'

const formatViews = (num) => {
	if (!num) return '0'
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
	}
	return num.toString()
}

function GenresStatsOverview({ stats }) {
	const statItems = [
		{
			title: 'Total genres',
			value: stats?.totalGenres ?? 0,
			icon: <CategoryIcon />,
			color: '#3B82F6'
		},
		{
			title: 'MOST POPULAR',
			value: stats?.mostViewed?.name ?? '-',
			icon: <LocalFireDepartmentIcon />,
			color: '#10B981',
			description: stats?.mostViewed?.views !== undefined ? `${formatViews(stats.mostViewed.views)} views` : '0 views'
		},
		{
			title: 'CONTENT LEADER',
			value: stats?.mostPopular?.name ?? '-',
			icon: <MovieIcon />,
			color: '#F59E0B',
			description: stats?.mostPopular?.moviesCount !== undefined ? `${stats.mostPopular.moviesCount} titles` : '0 titles'
		},
		{
			title: 'MOST LIKED',
			value: stats?.mostLiked?.name ?? '-',
			icon: <ThumbUpIcon />,
			color: '#EF4444',
			description: stats?.mostLiked?.likesPercent !== undefined ? `${stats.mostLiked.likesPercent}% Positive` : '0% Positive'
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
				<GenreStatCard
					key={index}
					title={item.title}
					value={String(item.value)}
					icon={item.icon}
					color={item.color}
					description={item.description}
				/>
			))}
		</Box>
	)
}

export default GenresStatsOverview
