import AddIcon from '@mui/icons-material/Add'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
	Typography
} from '@mui/material'

function CountriesToolBar({
	searchTerm,
	onSearchChange,
	sortBy,
	onSortByChange,
	sortOrder,
	onSortOrderChange,
	onCreateCountry
}) {
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
					Countries Management
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ fontSize: '0.85rem' }}
				>
					Manage geographical and production origin details for content.
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
					placeholder="Search countries..."
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
						width: { xs: '100%', sm: 200 },

						'& .MuiInputBase-root': {
							height: 36,
							fontSize: '0.875rem'
						}
					}}
				/>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
					<TextField
						select
						label="Sort by"
						variant="outlined"
						size="small"
						value={sortBy || 'createdAt'}
						onChange={e => onSortByChange(e.target.value)}
						sx={{
							width: { xs: '100%', sm: 140 },
							'& .MuiInputBase-root': {
								height: 36,
								fontSize: '0.875rem'
							}
						}}
					>
						<MenuItem value="createdAt">Date added</MenuItem>
						<MenuItem value="updatedAt">Last updated</MenuItem>
					</TextField>

					<IconButton
						onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
						title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
						size="small"
						sx={{
							border: '1px solid rgba(255, 255, 255, 0.23)',
							borderRadius: 1,
							height: 36,
							width: 36,
							color: 'text.secondary',
							flexShrink: 0,
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.05)'
							}
						}}
					>
						{sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
					</IconButton>
				</Box>

				<Button
					onClick={onCreateCountry}
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
					Add New Country
				</Button>
			</Box>
		</Box>
	)
}

export default CountriesToolBar
