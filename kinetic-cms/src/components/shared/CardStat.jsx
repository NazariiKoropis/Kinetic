import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

//mb add in future fucnution OnClcik what will set filter on films
function CardStat({ icon, title, value, color }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexGrow: 1,
				gap: 2,
				backgroundColor: 'background.paper',
				padding: 2,
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.15)',
				transition: 'background-color 0.3s ease',

				'&:hover': {
					backgroundColor:
						'color-mix(in srgb, var(--cms-primary) 15%, transparent)',
					cursor: 'pointer'
				}
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: color,
					backgroundColor: alpha(color, 0.25),
					borderRadius: '50%',
					padding: 1.5,
					fontSize: '36px'
				}}
			>
				{icon}
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<Typography
					variant="h6"
					sx={{ color: 'text.secondary' }}
				>
					{title}
				</Typography>
				<Typography
					variant="body1"
					sx={{ color: 'text.primary', fontWeight: 'bold' }}
				>
					{value}
				</Typography>
			</Box>
		</Box>
	)
}

export default CardStat
