import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

function MovieStatCard({ icon, title, value, color }) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: { xs: 1.5, sm: 2, md: 2.5 },
				backgroundColor: 'background.paper',
				padding: { xs: 1.5, sm: 2, md: 2.5 },
				borderRadius: 2,
				width: '100%',
				height: '100%',
				transition: 'all 0.2s ease',

				'&:hover': {
					backgroundColor: alpha(color, 0.05)
				}
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexShrink: 0,
					color: color,
					backgroundColor: alpha(color, 0.12),
					borderRadius: '50%',

					width: { xs: 44, sm: 52, md: 60 },
					height: { xs: 44, sm: 52, md: 60 },

					'& svg': {
						fontSize: { xs: '22px', sm: '26px', md: '30px' }
					}
				}}
			>
				{icon}
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					overflow: 'hidden'
				}}
			>
				<Typography
					variant="body2"
					sx={{
						color: 'text.secondary',
						fontWeight: 500,
						fontSize: { xs: '0.75rem', sm: '0.875rem' },
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}
				>
					{title}
				</Typography>

				<Typography
					variant="h5"
					sx={{
						color: 'text.primary',
						fontWeight: 'bold',
						fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
						lineHeight: 1.2
					}}
				>
					{value}
				</Typography>
			</Box>
		</Box>
	)
}

export default MovieStatCard
