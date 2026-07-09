import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, IconButton } from '@mui/material'

function ImageDialog({ open, onClose, imageUrl, alt = 'Image preview' }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			slotProps={{
				paper: {
					sx: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
						overflow: 'hidden'
					}
				}
			}}
		>
			<Box
				sx={{
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<IconButton
					onClick={onClose}
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						color: '#fff',
						'&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
					}}
				>
					<CloseIcon />
				</IconButton>

				<Box
					component="img"
					src={imageUrl}
					alt={alt}
					sx={{
						maxWidth: '100%',
						maxHeight: '85vh',
						borderRadius: 2,
						boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
						objectFit: 'contain'
					}}
				/>
			</Box>
		</Dialog>
	)
}

export default ImageDialog
