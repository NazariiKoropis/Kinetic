import { Box, Paper, Typography } from '@mui/material'
import useAuthStore from '@store/authStore'

function Dashboard() {
	const user = useAuthStore(state => state.user)

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ fontWeight: 'bold', mb: 3 }}
			>
				Dashboard
			</Typography>
			<Paper
				sx={{
					p: 3,
					backgroundColor: 'var(--cms-bg-table)',
					border: '1px solid #2D2845'
				}}
			>
				<Typography
					variant="h6"
					sx={{ color: 'var(--cms-text-main)' }}
				>
					Вітаємо в системі, {user?.name}!
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: 'var(--cms-text-muted)', mt: 1 }}
				>
					Routes
				</Typography>
			</Paper>
		</Box>
	)
}

export default Dashboard
