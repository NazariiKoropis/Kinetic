import CloseIcon from '@mui/icons-material/Close'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField
} from '@mui/material'
import { useEffect, useState } from 'react'

function CountryDialog({
	open,
	handleClose,
	handleSubmit,
	mode = 'create',
	initialData = null
}) {
	const [name, setName] = useState('')
	const [code, setCode] = useState('')

	useEffect(() => {
		if (open) {
			setName(initialData?.name || '')
			setCode(initialData?.code || '')
		}
	}, [open, initialData, mode])

	const handleNameChange = e => {
		setName(e.target.value)
	}

	const handleCodeChange = e => {
		setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))
	}

	const onFormSubmit = e => {
		e.preventDefault()
		if (!name.trim() || !code.trim()) return

		handleSubmit({ name: name.trim(), code: code.trim() })
	}

	return (
		<Dialog
			open={open}
			onClose={(e, reason) => {
				if (reason === 'backdropClick') return
				handleClose()
			}}
			fullWidth
			maxWidth="xs"
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						backdropFilter: 'blur(4px)'
					}
				}
			}}
		>
			<DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, fontSize: '1.1rem' }}>
				{mode === 'create' ? 'Add New Country' : 'Update Country'}
				<IconButton
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: 'text.secondary',
						opacity: 0.7,
						'&:hover': { opacity: 1 }
					}}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</DialogTitle>

			<Box
				component="form"
				onSubmit={onFormSubmit}
			>
				<DialogContent
					dividers
					sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
				>
					<TextField
						label="Country Name"
						size="small"
						fullWidth
						required
						autoFocus
						value={name}
						onChange={handleNameChange}
						placeholder="e.g., Україна"
					/>

					<TextField
						label="Country Code"
						size="small"
						fullWidth
						required
						value={code}
						onChange={handleCodeChange}
						placeholder="e.g., UA"
						helperText="ISO 2 or 3-letter uppercase country code."
						slotProps={{
							formHelperText: { sx: { fontSize: '0.7rem', opacity: 0.7 } }
						}}
						inputProps={{
							maxLength: 3
						}}
					/>
				</DialogContent>

				<DialogActions sx={{ p: 2, gap: 1 }}>
					<Button
						onClick={handleClose}
						color="inherit"
						size="small"
						sx={{ textTransform: 'none' }}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="small"
						sx={{ textTransform: 'none', px: 3 }}
					>
						{mode === 'create' ? 'Create Country' : 'Save Changes'}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	)
}

export default CountryDialog
