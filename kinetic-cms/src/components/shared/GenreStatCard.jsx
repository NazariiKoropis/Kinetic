import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

function GenreStatCard({ icon, title, value, color, description = '' }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: 1.5,
				backgroundColor: 'background.paper',
				padding: 3,
				borderRadius: 2,
				width: '100%',
				height: '100%',
				border: '1px solid rgba(255, 255, 255, 0.1)',
				transition: 'all 0.2s ease-in-out',

				'&:hover': {
					backgroundColor: alpha(color, 0.02),
					borderColor: alpha(color, 0.3),
					boxShadow: `0 4px 20px ${alpha(color, 0.05)}`
				}
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%'
				}}
			>
				<Typography
					variant="body2"
					sx={{
						color: 'text.secondary',
						fontWeight: 500,
						letterSpacing: '-0.01em'
					}}
				>
					{title}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: color,
						opacity: 0.6,

						'& svg': {
							fontSize: '20px'
						}
					}}
				>
					{icon}
				</Box>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
				<Typography
					variant="h4"
					sx={{
						color: 'text.primary',
						fontWeight: 700,
						letterSpacing: '-0.02em'
					}}
				>
					{value}
				</Typography>

				{description && (
					<Typography
						variant="caption"
						sx={{
							color: 'text.secondary',
							display: 'inline-flex',
							alignItems: 'center',
							gap: 0.5
						}}
					>
						{description}
					</Typography>
				)}
			</Box>
		</Box>
	)
}

export default GenreStatCard
