import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				bgcolor: 'background.default'
			}}
		>
			<CircularProgress />
		</Box>
	)
}

export default Loader
