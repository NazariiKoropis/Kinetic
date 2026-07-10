import InboxIcon from '@mui/icons-material/Inbox'
import { Box, TablePagination, Typography } from '@mui/material'
import MovieCard from '@shared/MovieCard'

function MoviesGrid({
	movies,
	onMPAAChange,
	onStatusChange,
	onDelete,
	onEdit,
	onPreview,
	onPosterClick,
	page = 1,
	limit = 10,
	totalItems = 0,
	onPageChange,
	onLimitChange
}) {
	if (!movies || movies.length === 0) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					py: 8,
					opacity: 0.5,
					backgroundColor: 'background.paper',
					borderRadius: 2,
					border: '1px solid rgba(255, 255, 255, 0.15)'
				}}
			>
				<InboxIcon sx={{ fontSize: 48, mb: 1 }} />
				<Typography variant="body1">No movies found</Typography>
			</Box>
		)
	}

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
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(3, 1fr)',
						lg: 'repeat(4, 1fr)',
						xl: 'repeat(5, 1fr)'
					},
					gap: 3
				}}
			>
				{movies.map(movie => (
					<MovieCard
						key={movie._id}
						movie={movie}
						onMPAAChange={onMPAAChange}
						onStatusChange={onStatusChange}
						onDelete={onDelete}
						onEdit={onEdit}
						onPreview={onPreview}
						onPosterClick={onPosterClick}
					/>
				))}
			</Box>

			<Box
				sx={{
					backgroundColor: 'background.paper',
					borderRadius: 2,
					border: '1px solid rgba(255, 255, 255, 0.15)',
					display: 'flex',
					justifyContent: 'flex-end',
					p: 0.5
				}}
			>
				<TablePagination
					component="div"
					count={totalItems}
					page={page - 1}
					onPageChange={(event, newPage) => onPageChange(newPage + 1)}
					rowsPerPage={limit}
					onRowsPerPageChange={event => {
						onLimitChange(parseInt(event.target.value, 10))
						onPageChange(1)
					}}
					rowsPerPageOptions={[5, 10, 25, 50]}
					labelRowsPerPage="Lines on a page:"
				/>
			</Box>
		</Box>
	)
}

export default MoviesGrid
