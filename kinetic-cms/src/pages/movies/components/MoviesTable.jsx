import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'
import {
	Box,
	Chip,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography
} from '@mui/material'
import MpaaSelect from '@shared/MpaaSelect'
import StatusSelect from '@shared/StatusSelect'

function MoviesTable({
	movies,
	onMPAAChange,
	onStatusChange,
	onDelete,
	onEdit,
	onPreview,
	page = 1,
	limit = 10,
	totalItems = 0,
	onPageChange,
	onLimitChange,
	onPosterClick
}) {
	return (
		<Box
			component="section"
			sx={{
				backgroundColor: 'background.paper',
				padding: 3,
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.15)'
			}}
		>
			<TableContainer>
				<Table sx={{ minWidth: 800 }}>
					<TableHead>
						<TableRow
							sx={{
								'& .MuiTableCell-root': {
									color: 'text.secondary',
									fontWeight: 'bold',
									whiteSpace: 'nowrap'
								}
							}}
						>
							<TableCell>Poster</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Year / Duration</TableCell>
							<TableCell>Genres</TableCell>
							<TableCell>MPAA</TableCell>
							<TableCell>Status</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{movies.map(movie => (
							<TableRow
								key={movie._id}
								sx={{
									'&:last-child td, &:last-child th': { border: 0 },
									transition: '0.2s',
									'&:hover': { backgroundColor: 'action.hover' }
								}}
							>
								<TableCell>
									<Box
										component="img"
										onClick={() => onPosterClick?.(movie.poster)}
										sx={{
											height: 75,
											width: 50,
											objectFit: 'cover',
											borderRadius: 1,
											boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
											cursor: 'pointer',
											transition: 'transform 0.2s ease',
											'&:hover': {
												transform: 'scale(1.1)',
												boxShadow: '0 6px 12px rgba(0,0,0,0.5)'
											}
										}}
										src={movie.poster}
										alt={movie.title}
									/>
								</TableCell>
								<TableCell>
									<Typography
										variant="body1"
										fontWeight="500"
									>
										{movie.title}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="body2">{movie.releaseYear}</Typography>
									<Typography
										variant="caption"
										color="text.secondary"
									>
										{movie.duration} min
									</Typography>
								</TableCell>
								<TableCell>
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{movie.genres?.map(genre => (
											<Chip
												key={genre._id}
												label={genre.name}
												size="small"
												variant="outlined"
											/>
										))}
									</Box>
								</TableCell>
								<TableCell>
									<MpaaSelect
										value={movie?.ratingMPAA}
										onChange={e => onMPAAChange(movie._id, e.target.value)}
										sx={{ minWidth: 120, height: 32 }}
									/>
								</TableCell>
								<TableCell>
									<StatusSelect
										value={movie?.status}
										onChange={e => onStatusChange(movie._id, e.target.value)}
										sx={{ minWidth: 120, height: 32 }}
									/>
								</TableCell>
								<TableCell align="right">
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											gap: 0.5
										}}
									>
										<Tooltip title="Preview">
											<IconButton
												size="small"
												onClick={() => onPreview(movie._id)}
												color="info"
											>
												<PreviewIcon fontSize="small" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit">
											<IconButton
												size="small"
												onClick={() => onEdit(movie._id)}
												color="primary"
											>
												<EditIcon fontSize="small" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												size="small"
												onClick={() => onDelete(movie._id)}
												color="error"
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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
	)
}

export default MoviesTable
