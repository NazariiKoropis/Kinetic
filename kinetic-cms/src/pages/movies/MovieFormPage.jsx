import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

function MovieFormPage() {
	const { id } = useParams()
	const isEditing = Boolean(id)

	return (
		<Box>
			<Typography variant="h4">
				{isEditing ? 'Edit Movie' : 'Add Movie'}
			</Typography>
		</Box>
	)
}

export default MovieFormPage
