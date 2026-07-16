import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'
import {
	Box,
	Card,
	CardContent,
	Chip,
	IconButton,
	Tooltip,
	Typography
} from '@mui/material'
import MpaaSelect from '@ui/MpaaSelect'
import StatusSelect from '@ui/StatusSelect'

function MovieCard({
	movie,
	onStatusChange,
	onMPAAChange,
	onDelete,
	onEdit,
	onPreview,
	onPosterClick
}) {
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				backgroundColor: 'background.paper',
				border: '1px solid rgba(255, 255, 255, 0.1)',
				borderRadius: 2,
				transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
					border: '1px solid rgba(255, 255, 255, 0.2)'
				}
			}}
		>
			<Box
				sx={{
					position: 'relative',
					overflow: 'hidden',
					pt: '133.33%'
				}}
			>
				<Box
					component="img"
					src={movie.poster}
					alt={movie.title}
					onClick={() => onPosterClick?.(movie.poster)}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						cursor: onPosterClick ? 'pointer' : 'default',
						transition: 'transform 0.3s ease',
						'&:hover': onPosterClick ? { transform: 'scale(1.05)' } : {}
					}}
				/>

				<Box
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						borderRadius: 1,
						backdropFilter: 'blur(4px)',
						'& .MuiOutlinedInput-notchedOutline': { border: 'none' }
					}}
				>
					<MpaaSelect
						value={movie?.ratingMPAA}
						onChange={e => onMPAAChange(movie._id, e.target.value)}
						sx={{
							height: 28,
							fontSize: '0.75rem',
							fontWeight: 'bold',
							color: '#fff',
							'& .MuiSelect-select': { py: 0, pl: 1, pr: '24px !important' }
						}}
					/>
				</Box>
			</Box>

			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					gap: 1.5,
					p: 2,
					'&:last-child': { pb: 2 }
				}}
			>
				<Box>
					<Typography
						variant="h6"
						component="h2"
						sx={{
							fontWeight: '600',
							lineHeight: 1.3,
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							height: '3.1rem'
						}}
					>
						{movie.title}
					</Typography>

					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ display: 'block', mt: 0.5 }}
					>
						{movie.releaseYear} • {movie.duration} min
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 0.5,
						minHeight: '24px'
					}}
				>
					{movie.genres?.slice(0, 3).map(genre => (
						<Chip
							key={genre._id}
							label={genre.name}
							size="small"
							variant="outlined"
							sx={{ fontSize: '0.7rem', height: 20 }}
						/>
					))}
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1.5,
						mt: 'auto',
						pt: 1
					}}
				>
					<StatusSelect
						value={movie?.status}
						onChange={e => onStatusChange(movie._id, e.target.value)}
						fullWidth
						sx={{ height: 32, fontSize: '0.8rem' }}
					/>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
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
				</Box>
			</CardContent>
		</Card>
	)
}

export default MovieCard
