import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	Button,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material'

function GenresToolBar({ searchTerm, onSearchChange, onCreateGenre }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: 'space-between',
				alignItems: { xs: 'stretch', md: 'center' },
				gap: 2,
				backgroundColor: 'background.paper',
				padding: 2.5,
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.1)',
				boxSizing: 'border-box'
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
				<Typography
					variant="h6"
					component="h1"
					sx={{
						fontWeight: 700,
						letterSpacing: '-0.01em',
						lineHeight: 1.2
					}}
				>
					Genres Management
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ fontSize: '0.85rem' }}
				>
					Organize and manage content categorization.
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					alignItems: 'center',
					gap: 1.5,
					width: { xs: '100%', md: 'auto' }
				}}
			>
				<TextField
					placeholder="Search genres..."
					size="small"
					value={searchTerm}
					onChange={e => onSearchChange(e.target.value)}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment
									position="start"
									sx={{ color: 'text.secondary', opacity: 0.7 }}
								>
									<SearchIcon fontSize="small" />
								</InputAdornment>
							)
						}
					}}
					sx={{
						width: { xs: '100%', sm: 260 },

						'& .MuiInputBase-root': {
							height: 36,
							fontSize: '0.875rem'
						}
					}}
				/>

				<Button
					onClick={onCreateGenre}
					variant="contained"
					startIcon={<AddIcon />}
					sx={{
						height: 36,
						fontSize: '0.85rem',
						fontWeight: 600,
						textTransform: 'none',
						minWidth: { xs: '100%', sm: 150 },
						px: 2,
						boxShadow: 'none',
						'&:hover': {
							boxShadow: 'none'
						}
					}}
				>
					Add New Genre
				</Button>
			</Box>
		</Box>
	)
}

export default GenresToolBar
