import {
	Box,
	Chip,
	IconButton,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'
import { getStatusColor } from '@utils/movie'

function MoviesTable({ movies, onStatusChange, onDelete, onEdit, onPreview }) {
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
							<TableCell>Duration</TableCell>
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
										sx={{
											height: 75,
											width: 50,
											objectFit: 'cover',
											borderRadius: 1,
											boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
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
									{movie.originalTitle && (
										<Typography
											variant="body2"
											color="text.secondary"
										>
											{movie.originalTitle}
										</Typography>
									)}
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
												key={genre}
												label={genre}
												size="small"
												variant="outlined"
											/>
										))}
									</Box>
								</TableCell>

								<TableCell>
									<Chip
										label={movie.ratingMPAA}
										size="small"
										color="default"
									/>
								</TableCell>

								<TableCell>
									<Select
										value={movie.status}
										size="small"
										onChange={e => onStatusChange(movie._id, e.target.value)}
										sx={{
											minWidth: 120,
											height: 32,

											color: `${getStatusColor(movie.status)}.main`,
											'& .MuiOutlinedInput-notchedOutline': {
												borderColor: `${getStatusColor(movie.status)}.main`
											}
										}}
									>
										<MenuItem value="released">Released</MenuItem>
										<MenuItem value="soon">Soon</MenuItem>
										<MenuItem value="hidden">Hidden</MenuItem>
									</Select>
								</TableCell>

								<TableCell align="right">
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											gap: 0.5
										}}
									>
										<IconButton
											size="small"
											onClick={() => onPreview(movie._id)}
											color="info"
										>
											<PreviewIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => onEdit(movie._id)}
											color="primary"
										>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => onDelete(movie._id)}
											color="error"
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default MoviesTable
