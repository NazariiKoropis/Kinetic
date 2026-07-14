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
import { useEffect, useRef, useState } from 'react'

import { generateSlug } from '@utils/slugify'

function GenreDialog({
	open,
	handleClose,
	handleSubmit,
	mode = 'create',
	initialData = null
}) {
	const [name, setName] = useState('')
	const [slug, setSlug] = useState('')
	const isSlugCustom = useRef(false)

	useEffect(() => {
		if (open) {
			setName(initialData?.name || '')
			setSlug(initialData?.slug || '')
			isSlugCustom.current = mode === 'edit'
		}
	}, [open, initialData, mode])

	const handleNameChange = e => {
		const value = e.target.value
		setName(value)

		if (!isSlugCustom.current && mode === 'create') {
			setSlug(generateSlug(value))
		}
	}

	const handleSlugChange = e => {
		isSlugCustom.current = e.target.value.length > 0
		setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
	}

	const onFormSubmit = e => {
		e.preventDefault()
		if (!name.trim() || !slug.trim()) return

		handleSubmit({ name: name.trim(), slug: slug.trim() })
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
				{mode === 'create' ? 'Add New Genre' : 'Update Genre'}
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
						label="Genre Name"
						size="small"
						fullWidth
						required
						autoFocus
						value={name}
						onChange={handleNameChange}
						placeholder="e.g., Наукова фантастика"
					/>

					<TextField
						label="URL Slug"
						size="small"
						fullWidth
						required
						value={slug}
						onChange={handleSlugChange}
						placeholder="e.g., naukova-fantastyka"
						helperText="Used for clean SEO-friendly routing on the public website."
						slotProps={{
							formHelperText: { sx: { fontSize: '0.7rem', opacity: 0.7 } }
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
						{mode === 'create' ? 'Create Categories' : 'Save Changes'}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	)
}

export default GenreDialog
