import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// mb add in future function onClick that will set filter on films
function CardStat({ icon, title, value, color }) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: { xs: 1.5, sm: 2, md: 2.5 },
				backgroundColor: 'background.paper',
				padding: { xs: 1.5, sm: 2, md: 2.5 },
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.15)',
				transition: 'all 0.3s ease',

				'&:hover': {
					backgroundColor:
						'color-mix(in srgb, var(--cms-primary) 15%, transparent)',
					cursor: 'pointer',
					transform: 'translateY(-2px)',
					boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
					backgroundColor: alpha(color, 0.15),
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

export default CardStat
