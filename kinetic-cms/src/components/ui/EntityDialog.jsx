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
import { generateSlug } from '@utils/slugify'
import { useEffect, useRef, useState } from 'react'

const namePlaceholders = {
	Genre: 'e.g., Наукова фантастика',
	Country: 'e.g., Україна',
	Studio: 'e.g., Warner Bros.'
}

function EntityDialog({
	open,
	handleClose,
	handleSubmit,
	mode = 'create',
	initialData = null,
	entityName = 'Genre',
	hasSlug = false,
	hasCode = false
}) {
	const [name, setName] = useState('')
	const [slug, setSlug] = useState('')
	const [code, setCode] = useState('')
	const isSlugCustom = useRef(false)

	useEffect(() => {
		if (open) {
			setName(initialData?.name || '')
			if (hasSlug) {
				setSlug(initialData?.slug || '')
				isSlugCustom.current = mode === 'edit'
			}
			if (hasCode) {
				setCode(initialData?.code || '')
			}
		}
	}, [open, initialData, mode, hasSlug, hasCode])

	const handleNameChange = e => {
		const value = e.target.value
		setName(value)

		if (hasSlug && !isSlugCustom.current && mode === 'create') {
			setSlug(generateSlug(value))
		}
	}

	const handleSlugChange = e => {
		isSlugCustom.current = e.target.value.length > 0
		setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
	}

	const handleCodeChange = e => {
		setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))
	}

	const onFormSubmit = e => {
		e.preventDefault()
		if (!name.trim()) return

		const payload = { name: name.trim() }

		if (hasSlug) {
			if (!slug.trim()) return
			payload.slug = slug.trim()
		}

		if (hasCode) {
			if (!code.trim()) return
			payload.code = code.trim()
		}

		handleSubmit(payload)
	}

	const displayEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1)

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
				{mode === 'create' ? `Add New ${displayEntityName}` : `Update ${displayEntityName}`}
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
						label={`${displayEntityName} Name`}
						size="small"
						fullWidth
						required
						autoFocus
						value={name}
						onChange={handleNameChange}
						placeholder={namePlaceholders[entityName] || ''}
					/>

					{hasSlug && (
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
					)}

					{hasCode && (
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
					)}
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
						{mode === 'create' ? `Create ${displayEntityName}` : 'Save Changes'}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	)
}

export default EntityDialog
